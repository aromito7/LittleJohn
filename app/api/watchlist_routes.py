from flask import Blueprint, jsonify, session, request
from app.models import Watchlist, User, db

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('/users/<int:id>', methods=['POST'])
def add_to_watchlist(id):
    """
    Creates a new stock transaction in the database
    """
    user = User.query.get(id)
    
    symbol = form.data['symbol']
    if False:
        watchlist = Watchlist(
            user_id = id,
            symbol = symbol,
        )
        db.session.add(watchlist)
        db.session.commit()
        return watchlist.to_dict()

    return { 'errors': validation_errors_to_error_messages(form.errors)}, 401
