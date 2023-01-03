from flask import Blueprint, jsonify, session, request
from app.models import db, Stock
from datetime import datetime, timedelta
import json
import yfinance as yf

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/yfinance/<symbol>', methods=['GET'])
def use_yfinance_api(symbol):
    stock = yf.Ticker(symbol)

    return {'stock': stock.info}

@stock_routes.route('/<symbol>', methods=['GET'])
def get_stock_info(symbol):
    """
    Creates a new stock transaction in the database
    if one doesn't already exist by pulling from yahoo finance api
    """
    stock = Stock.query.filter(Stock.symbol == symbol).first()
    if stock:
        return stock.to_dict()

    print("HELLO YFINANCE API!")
    print("HELLO YFINANCE API!")
    print("HELLO YFINANCE API!")

    end = datetime.now()#.strftime("%Y-%m-%d")
    start = end - timedelta(days=90)
    end = end + timedelta(days=1)
    start, end = start.strftime("%Y-%m-%d"), end.strftime("%Y-%m-%d")

    stock = yf.Ticker(symbol)
    history_string = stock.history(start=start, end=end, interval="1d").to_json()
    name = stock.info['shortName']
    price = stock.info['bid']
    open = stock.info['open']

    new_stock = Stock(
        symbol = symbol,
        name = name,
        price = price,
        open = open,
        history = history_string
        )

    db.session.add(new_stock)
    db.session.commit()

    return new_stock.to_dict()
