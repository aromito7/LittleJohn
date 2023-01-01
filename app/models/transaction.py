from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    stock_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('stocks.id')),nullable=False)
    stock_symbol = db.Column(db.String(20), nullable=False)
    shares = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)

    order_type = db.Column(db.String, default="Market")
    is_open = db.Column(db.Boolean, default=False)
    close_datetime = db.Column(db.DateTime, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='transaction')
    stock = db.relationship('Stock', back_populates='transaction')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'stockSymbol': self.stock_symbol,
            'price': self.price,
            'shares': self.shares,
            'createdAt': self.created_at,

            'stock' : self.stock.to_dict(),
            #'user' : self.user.to_dict()
        }
