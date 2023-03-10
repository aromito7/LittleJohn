from app.models import db, Transaction, environment, SCHEMA
from datetime import datetime

# Adds a demo transaction, you can add other transactions here if you want
def seed_transactions():
    demos = [Transaction(
        user_id = 1,
        stock_id = 1,
        stock_symbol = 'TNA',
        shares = 100,
        price = 33.21,
        is_open = False),
        Transaction(
            user_id = 1,
            stock_id = 2,
            stock_symbol = 'GME',
            shares = 150,
            price = 18.66,
            is_open = False)
        ]

    for demo in demos:
        db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the transactions table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM transactions")

    db.session.commit()
