from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Transfer(db.Model):
    __tablename__ = 'transfers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    amount = db.Column(db.Float, nullable=False)

    user = db.relationship('User', back_populates='transfer')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'amount': self.amount,

            #'user' : self.user.to_dict()
        }
