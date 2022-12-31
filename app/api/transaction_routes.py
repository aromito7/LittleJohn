from flask import Blueprint, jsonify, session, request
from app.models import Transaction, User, db
from app.forms import TransactionForm

transaction_routes = Blueprint('transaction', __name__)

@transaction_routes.route('/users/<int:id>', methods=['POST'])
def create_transaction(id):
    """
    Creates a new stock transaction in the database
    """
    form = TransactionForm()
    form['user_id'].data = id
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        symbol = form.data['stock_symbol']
        price = form.data['price']
        shares = form.data['shares']
        for stock in user.portfolio:
            if stock.stock_symbol == symbol:
                current_shares = stock.shares
                portfolio_item = stock

        if shares + current_shares < 0:
            return { 'errors': 'Cannot sell more shares than you own'}

        if shares + current_shares == 0:
            db.session.delete(portfolio_item)

        portfolio_item.shares += shares

        transaction = Transaction(
            user_id = id,
            stock_symbol = symbol,
            price = price,
            shares = shares,
        )
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()

    return { 'errors': (form.errors)}, 401
