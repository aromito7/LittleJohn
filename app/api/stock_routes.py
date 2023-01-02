from flask import Blueprint, jsonify, session, request
from app.models import db, Stock
from datetime import datetime, timedelta
import json
import yfinance as yf

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/<symbol>', methods=['GET'])
def get_stock_info(symbol):
    """
    Creates a new stock transaction in the database
    if one doesn't already exist by pulling from yahoo finance api
    """
    stock = Stock.query.filter(Stock.symbol == symbol).first()
    if stock:
        return stock.to_dict()
    return { "message" : "something went wrong"}
    end = datetime.now()#.strftime("%Y-%m-%d")
    start = end - timedelta(days=90)
    end = end + timedelta(days=1)
    start, end = start.strftime("%Y-%m-%d"), end.strftime("%Y-%m-%d")

    stock = yf.Ticker(symbol)
    history = stock.history(start=start, end=end, interval="1d")
    return {"stock": stock.info,
        "start": start,
        "end" : end,
        "history": json.loads(history.to_json()),
        "history_string": history.to_json(),}
