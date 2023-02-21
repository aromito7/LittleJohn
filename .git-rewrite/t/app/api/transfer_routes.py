from flask import Blueprint, jsonify, session, request
from app.models import Transfer, User, db
from app.forms import TransferForm

transfer_routes = Blueprint('transfer', __name__)

@transfer_routes.route('/users/<int:id>', methods=['POST'])
def create_transaction(id):
    """
    Creates a new stock transaction in the database
    """
    form = TransferForm()
    form['user_id'].data = id
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.get(id)
        amount = form.data['amount']

        if user.buying_power + amount < 0:
            return { 'errors': f'cannot withdraw more than {user.buying_power}'}

        user.buying_power += amount
        transfer = Transfer(
            user_id = id,
            amount = amount,
        )
        db.session.add(transfer)
        db.session.commit()
        return transfer.to_dict()

    return { 'errors': (form.errors)}, 401
