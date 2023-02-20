from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    stock_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('stocks.id')), nullable=False)
    stock_symbol = db.Column(db.String(20), nullable=False)
    average_price = db.Column(db.Float, nullable=False)
    shares = db.Column(db.Float, nullable=False)

    user = db.relationship('User', back_populates='portfolio')
    stock = db.relationship('Stock', back_populates='portfolio')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'stock_symbol': self.stock_symbol,
            'average_price': self.average_price,
            'shares': self.shares,
            'stock': self.stock.to_dict()
            #'user': self.user.to_dict()
        }
