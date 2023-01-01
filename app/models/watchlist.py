from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    stock_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('stocks.id')),nullable=False)
    stock_symbol = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates='watchlist')
    stock = db.relationship('Stock', back_populates='watchlist')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'stockId': self.stock_id,
            'stockSymbol': self.stock_symbol,

            'stock' : self.stock.to_dict()
            #'user' : self.user.to_dict()
        }
