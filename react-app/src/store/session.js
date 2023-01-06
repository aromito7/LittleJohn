import { setSearchOptions } from "./stock";

// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const DEPOSIT_AMOUNT = 'session/DEPOSIT_AMOUNT';
const STOCK_TRANSACTION = 'session/STOCK_TRANSACTION';
const TOGGLE_WATCHLIST = 'session/TOGGLE_WATCHLIST';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const depositAmount = (amount) => ({
  type: DEPOSIT_AMOUNT,
  payload: amount
})

const stockTransaction = (symbol, price, shares, name, stock) => ({
  type: STOCK_TRANSACTION,
  payload: {symbol, price, shares, name, stock}
})

const toggleWatchlistItem = (userId, symbol, stock) => ({
  type: TOGGLE_WATCHLIST,
  payload: {userId, symbol, stock}
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
    dispatch(setSearchOptions())
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    dispatch(setSearchOptions())
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const toggleWatchlist = (userId, stock) => async(dispatch) => {
  const response = await fetch(`/api/watchlists/users/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      stock_symbol: stock.symbol
    }),
  });

  if(response.ok){
    const data = response.json();
    dispatch(toggleWatchlistItem(userId, stock.stockSymbol, stock))
  }
}

export const transaction = (userId, symbol, price, shares, name, stock) => async(dispatch) => {
  const url = `/api/transactions/users/${userId}`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      symbol,
      price,
      shares
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Hello, thunk")
    console.log(symbol, price, shares, name, stock)
    dispatch(stockTransaction(symbol, price, shares, name, stock))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const deposit = (userId, amount) => async (dispatch) =>{
  const url = `/api/transfers/users/${userId}`
  //console.log(url, amount)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount
    }),
  });

  if(response.ok){
    const data = await response.json();
    dispatch(depositAmount(amount))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}



export const signUp = (firstName, lastName, email, password) => async (dispatch) => {
  console.log(firstName, lastName, email, password)
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    dispatch(setSearchOptions())
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function reducer(state = initialState, action) {
  const newUser = {...state.user}
  const newState = {...state, user: newUser}
  switch (action.type) {
    case SET_USER:
      return { user: action.payload,
                watchlist: action.payload.watchlist,
                portfolio: action.payload.portfolio,
                transactions: action.payload.transactions,
              }
    case REMOVE_USER:
      return {user: null,
              watchlist: [],
              portfolio: [],
              transactions: [],
            }
    case DEPOSIT_AMOUNT:
      const newBuyingPower = newUser.buying_power + parseInt(action.payload)
      if (newBuyingPower >= 0){
        newUser.buying_power = newBuyingPower
      }
      return newState
    case STOCK_TRANSACTION:
      var {symbol, price, shares, name, stock} = action.payload
      console.log("Stock:")
      console.log(stock.open, stock.name)
      var portfolio = [...state.portfolio]
      var transactions = [...state.transactions]
      const newTransaction = {
        createdAt: new Date().toString(),
        price,
        shares,
        stockSymbol: symbol,
        stock: {
          history: stock.history,
          name: stock.name,
          open: stock.open,
          price: stock.price,
          symbol: stock.symbol
        }
      }

      transactions.push(newTransaction)
      var item = portfolio.find(item => item.symbol == symbol)
      if(item){
        const currentShares = item.shares
        const newShares = currentShares + shares
        if(newShares > 0){
          item.shares = newShares
        }else if(newShares == 0){
          portfolio = portfolio.filter(item => item.symbol != symbol)
        }
      }else{
        const newPortfolioItem = {
            stock_symbol: symbol,
            average_price: price,
            shares,
            name,
            stock: item,
        }
        portfolio.push(newPortfolioItem)
      }
      newState.transactions = transactions
      newState.portfolio = portfolio
      console.log("Transactions")
      console.log(transactions)
      console.log("Portfolio")
      console.log(portfolio)
      return newState;
    case TOGGLE_WATCHLIST:
      var {userId, stock} = action.payload
      const watchlist = state.watchlist

      var newWatchlist = watchlist.filter(watchlistItem => (watchlistItem.stockSymbol != stock.symbol) || (watchlistItem.userId != userId))
      if(newWatchlist.length == watchlist.length){
        watchlist.push({
          userId,
          stockSymbol: stock.symbol,
          stock,
          stockId: stock.id
        })
        newWatchlist = [...watchlist]
      }
      console.log(newWatchlist)
      newState.watchlist = newWatchlist

      return newState
    default:
      return state;
  }
}
