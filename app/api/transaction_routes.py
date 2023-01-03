from flask import Blueprint, jsonify, session, request
from app.models import Transaction, User, db, Portfolio, Stock
from app.forms import TransactionForm

transaction_routes = Blueprint('transaction', __name__)

@transaction_routes.route('/users/<int:id>', methods=['POST'])
def create_transaction(id):
    """
    Creates a new stock transaction in the database
    """
    form = TransactionForm()
    user = User.query.get(id)
    symbol = form.data['symbol']
    price = form.data['price']
    shares = form.data['shares']
    total_cost = price * shares
    form['user_id'].data = id
    form['csrf_token'].data = request.cookies['csrf_token']
    stock = Stock.query.filter(Stock.symbol == symbol).first()
    stock_id = stock.id
    form['stock_id'].data = stock_id
    print("HELLO, TRANSACTION ROUTES")
    print(symbol, price, shares, stock.id)
    if form.validate_on_submit():
        current_shares = 0

        portfolio_item = Portfolio.query.filter(Portfolio.user_id == id, Portfolio.stock_symbol == symbol).first()

        if total_cost > user.buying_power:
            return { 'errors': 'Not enough buying power for this purchase'}

        if not portfolio_item:
            portfolio_item = Portfolio(
                user_id = user.id,
                stock_id = stock.id,
                stock_symbol = symbol,
                average_price = price,
                shares = 0
            )
            db.session.add(portfolio_item)

        current_shares = portfolio_item.shares


        if shares + current_shares < 0:
            return { 'errors': 'Cannot sell more shares than you own'}

        if shares + current_shares == 0:
            db.session.delete(portfolio_item)

        portfolio_item.shares += shares
        user.buying_power -= total_cost
        transaction = Transaction(
            user_id = id,
            stock_id = stock_id,
            stock_symbol = symbol,
            price = price,
            shares = shares,
        )

        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()

    return { 'errors': (form.errors)}
