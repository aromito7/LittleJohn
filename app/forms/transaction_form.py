from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.models import User




class TransactionForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    stock_id = IntegerField('stock_id', validators=[DataRequired()])
    symbol = StringField('symbol', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    shares = FloatField('shares', validators=[DataRequired()])
