from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Stock(db.Model):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)

    #user = db.relationship('User', back_populates='transfer')


    def to_dict(self):
        return {
            'id': self.id,

            #'user' : self.user.to_dict()
        }
