from flask import Blueprint, jsonify, session, request
from app.models import db, Stock
from datetime import datetime, timedelta
import json
import yfinance as yf

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/yfinance/<symbol>', methods=['GET'])
def use_yfinance_api(symbol):

    stock = yf.Ticker(symbol)
    print(yf.__version__)
    return {'stock': stock.history().to_json(),
            'yfinance-version': yf.__version__}

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
    info = stock.get_info()
    history_string = stock.history(start=start, end=end, interval="1d").to_json()
    if not info:
        return {'error' : 'stock not found'}

    for key in ['shortName', 'currentPrice', 'open']:
        if key not in info.keys():
            return {'error' : key + ' not found in stock info'}
    name = info['shortName']
    price = info['currentPrice']
    open = info['open']

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



@stock_routes.route('/search-options', methods=['GET'])
def get_search_options():
    with open('./app/api/files/stock_info.csv') as f:
        contents = f.readlines()

    contents = contents[1:]
    for i, content in enumerate(contents):
        contents[i] = content.split(',')[:2]

    return {"searchOptions" : [c for c in contents if c[0].isalpha()]}
