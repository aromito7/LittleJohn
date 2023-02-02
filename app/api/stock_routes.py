from flask import Blueprint, jsonify, session, request
from app.models import db, Stock
from datetime import datetime, timedelta
import json
import yfinance as yf

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/yfinance/<symbol>', methods=['GET'])
def use_yfinance_api(symbol):

    stock = yf.Ticker(symbol)
    info = stock.info
    price_history = stock.history(period='1y', # valid periods: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max
                                   interval='60m', # valid intervals: 1m,2m,5m,15m,30m,60m,90m,1h,1d,5d,1wk,1mo,3mo
                                   actions=False)
    print(yf.__version__)

    return {'name': stock.info['shortName'],
            # 'zzz' : dir(stock.basic_info),
            #'basic' : {key: stock.info[key] for key in list((stock.info))},
            # 'inst holders' : (stock.get_institutional_holders().to_json()),
            # 'holders' : (stock.get_major_holders().to_json()),
            #'stats' : stock.stats(),
            # 'info values' : list(stock.info.values()),
            # 'info keys' : list(stock.info.keys()),

            'history' : price_history.to_json(),
            'ticker' : stock.ticker,
            'eps' : round(stock.stats()['defaultKeyStatistics']['trailingEps'], 2),
            'about' : stock.info['longBusinessSummary'],
            'employees' : stock.info['fullTimeEmployees'],
            'city' : stock.info['city'],
            'state' : stock.info['state'],
            'sector' : stock.info['sector'],
            'industry' : stock.info['industry'],
            'website' : stock.info['website'],
            'shares' : stock.fast_info['shares'],
            'year_high' : round(stock.fast_info['year_high'], 2),
            'year_low' : round(stock.fast_info['year_low'], 2),
            'day_high' : round(stock.fast_info['day_high'], 2),
            'day_low' : round(stock.fast_info['day_low'], 2),
            'market_cap' : stock.fast_info['market_cap'],
            'volume' : stock.fast_info['last_volume'],
            'average_volume' : stock.fast_info['three_month_average_volume'],
            'news': json.dumps(stock.get_news()),
            'price' : round(stock.basic_info['last_price'], 2),
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

    # end = datetime.now()#.strftime("%Y-%m-%d")
    # start = end - timedelta(days=90)
    # end = end + timedelta(days=1)
    # start, end = start.strftime("%Y-%m-%d"), end.strftime("%Y-%m-%d")

    stock = yf.Ticker(symbol)
    info = stock.info
    price_history = stock.history(period='1y', # valid periods: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max
                                   interval='60m', # valid intervals: 1m,2m,5m,15m,30m,60m,90m,1h,1d,5d,1wk,1mo,3mo
                                   actions=False)


    if not info:
        return {'error' : 'stock not found'}

    for key in ['shortName', 'currentPrice', 'open']:
        if key not in info.keys():
            return {'error' : key + ' not found in stock info'}

    name = info['shortName']
    price = info['currentPrice']

    new_stock = Stock(
        symbol = symbol,
        name = name,
        price = price,
        history = price_history
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
