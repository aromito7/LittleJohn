from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.models import Stock


def symbol_exists(form, field):
    #checking if stock symbol exists
    symbol = field.data
    stock = Stock.query.filter(Stock.symbol == symbol).first()
    if stock:
        raise ValidationError('Stock with same symbol already exists')

class StockForm(FlaskForm):
    stock_symbol = StringField('symbol', validators=[DataRequired(), symbol_exists])
    name = StringField('name', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    open = FloatField('price', validators=[DataRequired()])
    history = StringField('history', validators=[DataRequired()])
