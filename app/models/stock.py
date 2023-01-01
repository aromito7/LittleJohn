from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Stock(db.Model):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    history = db.Column(db.String, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow())
    #user = db.relationship('User', back_populates='transfer')

    transaction = db.relationship('Transaction', back_populates='stock')
    portfolio = db.relationship('Portfolio', back_populates='stock')
    watchlist = db.relationship('Watchlist', back_populates='stock')

    def to_dict(self):
        return {
            'id': self.id,
            'symbol': self.symbol,
            'name' : self.name,
            'price' : self.price,
            'history' : self.history,

            #'user' : self.user.to_dict()
        }
