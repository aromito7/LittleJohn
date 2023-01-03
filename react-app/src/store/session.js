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

const stockTransaction = (symbol, price, shares) => ({
  type: STOCK_TRANSACTION,
  payload: {symbol, price, shares}
})

const toggleWatchlistItem = (userId, symbol) => ({
  type: TOGGLE_WATCHLIST,
  payload: {userId, symbol}
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

export const toggleWatchlist = (userId, symbol) => async(dispatch) => {
  const response = await fetch(`/api/watchlists/users/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      stock_symbol: symbol
    }),
  });

  if(response.ok){
    const data = response.json();
  }
}

export const transaction = (userId, symbol, price, shares) => async (dispatch) => {
  const url = `/api/transactions/users/${userId}`
  console.log(url, symbol, price, shares)
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



export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
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
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case DEPOSIT_AMOUNT:
      const newBuyingPower = newUser.buying_power + parseInt(action.payload)
      if (newBuyingPower >= 0){
        newUser.buying_power = newBuyingPower
      }
      return newState
    case STOCK_TRANSACTION:
      const {symbol, shares, price} = action.payload
      const stock = newUser.portfolio.find(stock => stock.symbol == symbol)

      if(stock){
        const currentShares = stock.shares
        const newShares = currentShares + shares
        if(newShares > 0){
          stock.shares = newShares
        }else if(newShares == 0){
          newUser.portfolio = newUser.portfolio(stock => stock.symbol != symbol)
        }
      }

      return newUser;
    default:
      return state;
  }
}
