from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime
import json

class Stock(db.Model):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    open = db.Column(db.Float, nullable=False)
    history = db.Column(db.String, nullable=False)

    is_up = db.Column(db.Boolean, nullable=False)
    delta = db.Column(db.Float, nullable=False)

    about = db.Column(db.String)
    average_volume = db.Column(db.Float)
    city = db.Column(db.String)
    day_high = db.Column(db.Float)
    day_low = db.Column(db.Float)
    employees = db.Column(db.Integer)
    eps = db.Column(db.Float)
    industry = db.Column(db.String)
    market_cap = db.Column(db.Float)
    news = db.Column(db.String)
    sector = db.Column(db.String)
    shares = db.Column(db.Integer)
    state = db.Column(db.String)
    volume = db.Column(db.Integer)
    website = db.Column(db.String)
    year_high = db.Column(db.Float)
    year_low = db.Column(db.Float)


    updated_at = db.Column(db.DateTime, default=datetime.utcnow())
    #user = db.relationship('User', back_populates='transfer')

    transaction = db.relationship('Transaction', back_populates='stock')
    portfolio = db.relationship('Portfolio', back_populates='stock')
    watchlist = db.relationship('Watchlist', back_populates='stock')

    def to_daily_movers_dict(self):
        return{
            'symbol': self.symbol,
            'name': self.name,
            'price' : self.price,
            'open' : self.open,
            'is_up' : self.is_up,
            'delta' : self.delta
        }

    def to_dict(self):

        return {
            'id': self.id,
            'symbol': self.symbol,
            'name' : self.name,
            'price' : self.price,
            'open' : self.open,
            'history' : json.loads(self.history),
            'isUp' : self.is_up,
            'delta' : self.delta,

            'about' : self.about,
            'average_volume' : self.average_volume,
            'city' : self.city,
            'day_high' : self.day_high,
            'day_low' : self.day_low,
            'employees' : self.employees,
            'eps' : self.eps,
            'industry' : self.industry,
            'market_cap' : self.market_cap,
            'news' : json.loads(self.news),
            'sector' : self.sector,
            'shares' : self.shares,
            'state' : self.state,
            'volume' : self.volume,
            'website' : self.website,
            'year_high' : self.year_high,
            'year_low' : self.year_low,

            'updated_at' : self.updated_at,
            #'user' : self.user.to_dict()
        }
