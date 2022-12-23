from flask import Blueprint, jsonify, session, request
from app.models import Transaction, db
from app.forms import TransactionForm

transaction_routes = Blueprint('transaction', __name__)

@transaction_routes('/users/<int:id>', methods=['POST'])
def create_transaction(id):
    """
    Creates a new stock transaction in the database
    """
    form = TransactionForm()
    form['user_id'].data = id
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        transaction = Transaction(
            user_id = id,
            stock_symbol = form.data['stock_symbol'],
            price = form.data['price'],
            shares = form.data['shares'],
        )
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()

    return { 'errors': validation_errors_to_error_messages(form.errors)}, 401
