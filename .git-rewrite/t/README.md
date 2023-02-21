<h1 align="center">LittleJohn</h1>

<p align="center">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
    <img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
    <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white">
    <img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">
</p>
<hr>

<p align="center">
    <img align="center" width="400" src="https://cdn.dribbble.com/users/2491475/screenshots/9836447/media/c7740bb95ddd3e55250e84b1495e56bb.jpg"/>
    Robin Hood and "Little" John - Ben Reyolds
</p>
<p align="center">"Little John is a companion of Robin Hood who serves as his chief lieutenant and second-in-command of the Merry Men." - Wikipedia</p>

<hr>
<h1 align="center">
    Feature Overview
</h1>
<p>This is the repo for my RobinHood clone where you can create a new user, log in, transfer play money into your account, search for stocks based on name/ticker symbol, buy/sell stocks, and add stocks to your watchlist.</p>

<p>Planned features for the future:</p>
<ul>
    <li>Stock/Account Graphs</li>
    <li>Real-Time Stock Updates</li>
    <li>Limit Orders</li>
    <li>Stock Options</li>
</ul>

<h1 align="center">LittleJohn Documentation</h1>

Font Family:  Avenir, Goggle Fonts "Sen", "Sans-Serif"

Buttons:
Disabled: rgb(180, 189, 194)
Active: rgb(0, 200, 5)
On Hover: rgb(0, 180, 5)


# Database Diagram:

![Database Diagram](/images/db_schema.png)

# Wireframes:

## Sign up page:
![wirefram_signup](/images/wireframe1.png)

## Log in page:
![wirefram_login](/images/wireframe2.png)

## Landing page:
![landing_page](/images/wireframe3.png)

## Stock Buy/Sell page:
![stock_page](/images/wireframe4.png)

## Transfer page:
![transfer_page](/images/wireframe5.png)


# MVP Features:
1. New account creation, log in, log out, and guest/demo login
- Users can sign up, log in, log out, or log in as a demo user.
- Users must be logged in to search for and view stock info .
- Users must be logged in to transfer, trade, or add stocks to watchlist.
- Logged out users will be returned to log in/sign up page.

2. Porfolio:
- Logged in users can add/remove stocks from their portfolio.
- Logged in users can view their full portfolio and value.

3. Watchlist:
- Logged in users can add/remove stocks from their watchlist.
- Logged in users can hide/view watchlist on the right side of the landing page.

4. Transfers:
- Logged in users can deposit/withdraw funds to their account.
- Logged in users can view their transfer history


## Bonus Features:
5. Search:
- Logged in users can search for current + historical stock information.

6. Limit Order:
- Logged in users can place a limit order to buy/sell stocks.
- This order only executes if stock price passes a threshold within a time period.

7. Stock Option:
- Logged in users can buy a stock option.
- Logged in users can sell a stock option if they own the required shares.


# Portfolio Stories
## Create Portfolio Item:
- As a logged in user, I want to be able to purchase a stock that I do not own.
    - When I'm on the "/stocks/:stock" page:
        - I can purchase shares of the stock.
            - So that I can add a new stock to my portfolio

## Read Portfolio Item:
- As a logged in user, I want to view all the stocks I own on my landing page.
    - When I'm on the "/" page:
        - I want to view all stocks in my portfolio.
            -So that I can view my assets.

## Update Portfolio Item:
- As a logged in user, I want to be able to change how many shares of a stock I own.
    - When I'm on the "/stocks/:stock" page:
        -I can buy/sell shares of the stock.
            - So that I can edit my portfolio

## Delete Portfolio Item:
- As a logged in user, I want to be able to exit my position on a stock.
    - When I'm on the "/stocks/:stock" page:
        -I can sell all my remaining shares of the stock.
            - So that I can remove the item from my portfolio.

# Watchlist Stories
## Create Watchlist Item
- As a logged in user, I want to be able to add a stock to my watchlist.
    - When I'm on the "/stocks/:stock" page:
        - I can click to add stock to my watchlist.
            - So that I can constantly see updates on my homepage.

## Read Watchlist Item
- As a logged in user, I want to be able to see my watchlist stocks.
    - When I'm on my landing page "/":
        - I can hide/view all stocks on my watchlist.
            - So I can follow their prices.

## Delete Watchlist Item
- As a logged in user, I want to be remove stocks from my watchlist.
    - When I'm on my landing page "/":
        - I can click to remove any stock from my watchlist.
            - So I can keep only essential stocks on my landing page.
