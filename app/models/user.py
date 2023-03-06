from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    account_value = db.Column(db.Float, default=0)
    buying_power = db.Column(db.Float, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    transaction = db.relationship('Transaction', back_populates='user', cascade="all, delete")
    portfolio = db.relationship('Portfolio', back_populates='user', cascade="all, delete")
    transfer = db.relationship('Transfer', back_populates='user', cascade="all, delete")
    watchlist = db.relationship('Watchlist', back_populates='user', cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        account_data = {}
        stocks = [stock.to_dict() for stock in self.portfolio]

        if len(stocks) == 0:
            account_data = None
        else:
            first = stocks[0]
            first_close = first['stock']['history']['Close']
            for key in first_close:
                account_data[key] = first_close[key] * first['shares']
            for stock in stocks[1:]:
                current_close = stock['stock']['history']['Close']
                for key in current_close:
                    account_data[key] += current_close[key] * stock['shares']


        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'account_value': self.account_value,
            'buying_power': self.buying_power,
            'member_since': self.created_at,

            'account_data' : account_data,

            'transactions': [transaction.to_dict() for transaction in self.transaction],
            'portfolio': stocks,
            'transfers': [transfer.to_dict() for transfer in self.transfer],
            'watchlist': [item.to_dict() for item in self.watchlist]
        }
