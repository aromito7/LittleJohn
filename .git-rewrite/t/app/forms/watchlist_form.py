from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User




class WatchlistForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    stock_symbol = StringField('symbol', validators=[DataRequired()])
