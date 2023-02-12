from flask import Blueprint, jsonify, session, request
from app.models import db, Stock
from datetime import datetime, timedelta
import json
import yfinance as yf

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/yfinance/<symbol>', methods=['GET'])
def use_yfinance_api(symbol):
    output = {}
    try:
        stock = yf.Ticker(symbol)
        info = stock.fast_info
        #stock = yf.Ticker(symbol)
        # info = stock.info
        price_history = stock.history(period='1y', # valid periods: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max
                                    interval='60m', # valid intervals: 1m,2m,5m,15m,30m,60m,90m,1h,1d,5d,1wk,1mo,3mo
                                    actions=False)



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
    except:
        return {'error' : 'stock not found'}

    #output['dir'] = dir(info)
    output['shares'] = info['shares']
    output['year_high'] = round(info['year_high'], 2)
    output['year_low'] = round(info['year_low'], 2)
    output['day_high'] = round(info['day_high'], 2)
    output['day_low'] = round(info['day_low'], 2)
    output['market_cap'] = info['market_cap']
    output['volume'] = info['last_volume']
    output['average_volume'] = info['three_month_average_volume']
    output['news'] = json.dumps(stock.get_news())
    output['price'] = round(info['last_price'], 2)
    output['open_price'] = info['open']

    output['history'] = price_history.to_json()
    output['ticker'] = symbol

    output['eps'] = None
    output['name'] = None
    output['about'] = None
    output['employees'] = None
    output['city'] = None
    output['state'] = None
    output['sector'] = None
    output['industry'] = None
    output['website'] = None
    #output['yfinance-version'] =  yf.__version__

    # data yf.download("AMZN AAPL GOOG", start="2017-01-01", end="2017-04-30")


    try:
        info = stock.info
        output['eps'] = round(stock.info['eps'], 2) if stock.info['eps'] else None,
        output['name'] = stock.info['name']
        output['about'] = stock.info['longBusinessSummary']
        output['employees'] = stock.info['fullTimeEmployees']
        output['city'] = stock.info['city']
        output['state'] = stock.info['state']
        output['sector'] = stock.info['sector']
        output['industry'] = stock.info['industry']
        output['website'] = stock.info['website']


    except:
        return output

    return output

    # return {
    #         'dir' : dir(stock),

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

            # 'yfinance-version': yf.__version__}

@stock_routes.route('/<symbol>', methods=['GET'])
def get_stock_info(symbol):
    """
    Creates a new stock transaction in the database
    if one doesn't already exist by pulling from yahoo finance api
    """
    stock = Stock.query.filter(Stock.symbol == symbol).first()
    print("Querying Database")
    if stock:
        print(stock.to_dict())
        return stock.to_dict()

    print("HELLO YFINANCE API!")
    print("HELLO YFINANCE API!")
    print("HELLO YFINANCE API!")

    try:
        stock = use_yfinance_api(symbol)
    except:
        error = {'error' : 'stock not found'}
        print(error)
        return error

    new_stock = Stock(
        symbol = symbol,
        name = stock['name'],
        price = stock['price'],
        history = stock['history'],
        open = stock['open_price'],
        eps = stock['eps'],
        about = stock['about'],
        employees = stock['employees'],
        city = stock['city'],
        state = stock['state'],
        sector = stock['sector'],
        industry = stock['industry'],
        website = stock['website'],
        shares = stock['shares'],
        year_high = stock['year_high'],
        year_low = stock['year_low'],
        day_high = stock['day_high'],
        day_low = stock['day_low'],
        market_cap = stock['market_cap'],
        volume = stock['volume'],
        average_volume = stock['average_volume'],
        news = stock['news'],
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
