from app.models import db, Portfolio, environment, SCHEMA
from datetime import datetime

# Adds a demo portfolio, you can add other portfolios here if you want
def seed_portfolios():
    demos = [Portfolio(
        user_id = 1,
        stock_id = 1,
        stock_symbol = 'TNA',
        shares = 100,
        average_price = 33.21),
        Portfolio(
        user_id = 1,
        stock_id = 2,
        stock_symbol = "GME",
        shares = 150,
        average_price = 18.66)]

    for demo in demos:
        db.session.add(demo)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the portfolios table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_portfolios():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolios RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM portfolios")

    db.session.commit()
