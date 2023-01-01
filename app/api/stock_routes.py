from flask import Blueprint, jsonify, session, request
from app.models import db
from datetime import datetime, timedelta
import json
import yfinance as yf

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/<symbol>', methods=['GET'])
def get_stock_info(symbol):
    """
    Creates a new stock transaction in the database
    """

    end = datetime.now()#.strftime("%Y-%m-%d")
    start = end - timedelta(days=2)
    end = end + timedelta(days=1)
    start, end = start.strftime("%Y-%m-%d"), end.strftime("%Y-%m-%d")

    stock = yf.Ticker(symbol)
    history = stock.history(start=start, end=end, interval="5m")
    return {"history": history.to_json()}
    return {"stock": stock.info,
        "start": start,
        "end" : end,
        "history": json.loads(history.to_json()),
        "history_string": history.to_json(),}
