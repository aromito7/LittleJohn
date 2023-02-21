from app.models import db, User, environment, SCHEMA
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io',
        first_name="Demo",
        last_name="User",
        account_value=3321,
        buying_power=100000,
        password='password')
    alex = User(
        email='alex@aa.io',
        first_name="Alexander",
        last_name="Romito",
        account_value=0,
        buying_power=100000,
        password='password')

    bob = User(
        email='bob@aa.io',
        first_name="Bob",
        last_name="Romito",
        account_value=0,
        buying_power=100000,
        password='password')

    db.session.add(demo)
    db.session.add(alex)
    db.session.add(bob)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
