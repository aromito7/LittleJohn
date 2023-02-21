from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.models import User




class TransferForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    amount = FloatField('amount', validators=[DataRequired()])
