from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Transaction, Portfolio

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/transactions')
@login_required
def user_transactions(id):
    """
    Query for all transactions by a current user
    """

    user_transactions = Transaction.query.filter(Transaction.user_id == id).all()
    return {"transactions": [t.to_dict() for t in user_transactions]}

@user_routes.route('/<int:id>/portfolio')
@login_required
def user_portfolio(id):
    """
    Query for all portfolio items by a current user
    """
    user_portfolio = Portfolio.query.filter(Portfolio.user_id == id).all()
    return {"transactions": [p.to_dict() for p in user_portfolio]}
