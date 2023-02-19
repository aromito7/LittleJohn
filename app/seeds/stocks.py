from app.models import db, Stock, environment, SCHEMA
from datetime import datetime
import json

# Adds a demo portfolio, you can add other portfolios here if you want
def seed_stocks():

    demos = []


    for demo in demos:
        db.session.add(demo)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the portfolios table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM stocks")

    db.session.commit()
