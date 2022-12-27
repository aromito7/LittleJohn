from flask import Blueprint, jsonify, session, request
from app.models import db
import yfinance as yf

stock_routes = Blueprint('stocks', __name__)

@stock_routes('/<symbol>', methods=['GET'])
def get_stock_info(symbol):
    """
    Creates a new stock transaction in the database
    """

    stock = yf.Ticker(symbol)


    return {"stock": stock.info}
