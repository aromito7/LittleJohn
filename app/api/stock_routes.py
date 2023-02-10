from flask import Blueprint, jsonify, session, request
from app.models import db, Stock
from datetime import datetime, timedelta
import json
import yfinance as yf

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/yfinance/<symbol>', methods=['GET'])
def use_yfinance_api(symbol):

    try:
        stock = yf.Ticker("GOOG META DIS MMMMMM")
        #stock = yf.Ticker(symbol)
        # info = stock.info
        price_history = stock.history(period='1y', # valid periods: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max
                                    interval='60m', # valid intervals: 1m,2m,5m,15m,30m,60m,90m,1h,1d,5d,1wk,1mo,3mo
                                    actions=False)
    except:
        return {'error' : 'stock not found'}

    # data = yf.download("AMZN AAPL GOOG", start="2017-01-01", end="2017-04-30")

    # info = stock.info



    return {
            'history' : dir(price_history.Open),
            # 'name': stock.info['shortName'],
            # 'zzz' : dir(stock.basic_info),
            # 'info' : dir(info),
            # 'basic' : {key: stock.info[key] for key in list((stock.info))},
            # 'inst holders' : (stock.get_institutional_holders().to_json()),
            # 'holders' : (stock.get_major_holders().to_json()),
            # 'stats' : stock.stats(),
            # 'info values' : list(stock.info.values()),
            # 'info keys' : list(stock.info.keys()),

            # 'history' : price_history.to_json(),
            # 'ticker' : stock.ticker,
            # 'eps' : round(stock.stats()['defaultKeyStatistics']['trailingEps'], 2),
            # 'about' : stock.info['longBusinessSummary'],
            # 'employees' : stock.info['fullTimeEmployees'],
            # 'city' : stock.info['city'],
            # 'state' : stock.info['state'],
            # 'sector' : stock.info['sector'],
            # 'industry' : stock.info['industry'],
            # 'website' : stock.info['website'],
            # 'shares' : stock.fast_info['shares'],
            # 'year_high' : round(stock.fast_info['year_high'], 2),
            # 'year_low' : round(stock.fast_info['year_low'], 2),
            # 'day_high' : round(stock.fast_info['day_high'], 2),
            # 'day_low' : round(stock.fast_info['day_low'], 2),
            # 'market_cap' : stock.fast_info['market_cap'],
            # 'volume' : stock.fast_info['last_volume'],
            # 'average_volume' : stock.fast_info['three_month_average_volume'],
            # 'news': json.dumps(stock.get_news()),
            # 'price' : round(stock.basic_info['last_price'], 2),
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
    try:
        stock = yf.Ticker(symbol)
        info = stock.info
        price_history = stock.history(period='1y', # valid periods: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max
                                    interval='60m', # valid intervals: 1m,2m,5m,15m,30m,60m,90m,1h,1d,5d,1wk,1mo,3mo
                                    actions=False)
    except:
        return {'error' : 'stock not found'}

    if not stock.info:
        return {'error' : 'stock not found'}
    # for key in ['shortName', 'currentPrice', 'open']:
    #     if key not in info.keys():
    #         return {'error' : key + ' not found in stock info'}

    name = info['shortName']
    price = info['currentPrice']
    history = price_history.to_json()
    open_price = stock.basic_info['open']
    eps = stock.stats()['defaultKeyStatistics']['trailingEps']
    about = stock.info['longBusinessSummary']
    employees = stock.info['fullTimeEmployees'] if 'fullTimeEmployees' in stock.info.keys() else 0
    city = stock.info['city'] if 'city' in stock.info.keys() else ''
    state = stock.info['state'] if 'state' in stock.info.keys() else ''
    sector = stock.info['sector'] if 'sector' in stock.info.keys() else ''
    industry = stock.info['industry'] if sector in stock.info.keys() else ''
    website = stock.info['website'] if sector in stock.info.keys() else ''
    shares = stock.fast_info['shares']
    year_high = round(stock.fast_info['year_high'], 2)
    year_low = round(stock.fast_info['year_low'], 2)
    day_high = round(stock.fast_info['day_high'], 2)
    day_low = round(stock.fast_info['day_low'], 2)
    market_cap = stock.fast_info['market_cap']
    volume = stock.fast_info['last_volume']
    average_volume = stock.fast_info['three_month_average_volume']
    news = json.dumps(stock.get_news())
    price = round(stock.basic_info['last_price'], 2)

    new_stock = Stock(
        symbol = symbol,
        name = name,
        price = price,
        history = history,
        open = open_price,
        eps = round(eps, 2) if eps else None,
        about = about,
        employees = employees,
        city = city,
        state = state,
        sector = sector,
        industry = industry,
        website = website,
        shares = shares,
        year_high = year_high,
        year_low = year_low,
        day_high = day_high,
        day_low = day_low,
        market_cap = market_cap,
        volume = volume,
        average_volume = average_volume,
        news = news,
        )

    print(new_stock)

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
