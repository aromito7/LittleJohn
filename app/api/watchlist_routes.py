from flask import Blueprint, jsonify, session, request
from app.models import Watchlist, User, Stock, db
from app.forms import WatchlistForm

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('/users/<int:id>', methods=['POST'])
def toggle_watchlist(id):
    """
    Creates a new stock transaction in the database
    """
    user = User.query.get(id)

    form = WatchlistForm()
    form['user_id'].data = id
    form['csrf_token'].data = request.cookies['csrf_token']
    symbol = form.data['stock_symbol']
    stock = Stock.query.filter(Stock.symbol == symbol).first()
    watchlist = Watchlist.query.filter(Watchlist.user_id == id, Watchlist.stock_symbol == symbol).first()

    if form.validate_on_submit():
        if not watchlist:
            watchlist = Watchlist(
                user_id = id,
                stock_id = stock.id,
                stock_symbol = symbol,
            )
            db.session.add(watchlist)
            db.session.commit()
            return watchlist.to_dict()
        else:
            db.session.delete(watchlist)
            db.session.commit()
            return {'message' : "deleted from watchlist",
                    'user_id' : id,
                    'stock_symbol': symbol}

    return { 'errors': (form.errors)}, 401
