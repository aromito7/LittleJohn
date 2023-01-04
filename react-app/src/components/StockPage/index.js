import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { transaction, toggleWatchlist } from "../../store/session"
import DepositModal from "../DepositModal"
import StockErrors from "./StockErrors"
import StockBuyingPower from "./StockBuyingPower"
import Transaction from "../Transaction"
import './stock.css'

const Stock = () => {
    const {symbol} = useParams()
    const user = useSelector(state => state.session.user)
    const portfolioItem = user.portfolio.find(stock => stock.stock_symbol == symbol)
    const currentShares = portfolioItem ? portfolioItem.shares : 0
    const transactions = user.transactions.filter(transaction => transaction.stockSymbol == symbol)
    const [buyInType, setBuyInType] = useState("Shares")
    const [shares, setShares] = useState("0")
    const [isBuying, setIsBuying] = useState(1)

    const [showErrors, setShowErrors] = useState(false)
    const [shareError, setShareError] = useState("")
    const [depositOpen, setDepositOpen] = useState(false)
    const [reviewOrder, setReviewOrder] = useState(false)

    const [stockData, setStockData] = useState(null)    //const stockData = useSelector(state => state.stocks[symbol])
    const dispatch = useDispatch()


    useEffect(async() => {
        const response = await fetch(`/api/stocks/${symbol}`) //if(!stockData) dispatch(thunkAlphaAPI(symbol))
        const data = await response.json()
        setStockData(data)
    },[dispatch, symbol])

    // useEffect(() => {
    //     console.log(isBuying)
    // },[isBuying])

    if(!stockData || !stockData.name) return null

    const history = stockData.history.Close

    const open = stockData.open
    const current = stockData.price
    const delta = parseFloat(current) - parseFloat(open)
    const isGreen = delta >= 0
    const percent = parseFloat(delta) / parseFloat(open)
    const name = stockData.name.split(', Inc')[0].split(".com")[0]
    // console.log(user.watchlist)
    // console.log(user.watchlist.map(item => item.stockSymbol))
    // console.log(symbol)
    // console.log(user.watchlist.find(item => item.stockSymbol == symbol))
    var onWatchlist = Boolean(user.watchlist.find(item => item.stockSymbol == symbol))
    const buyStock = async() => {
        if(shares <= 0) {
            setShareError("Enter at least 0.000001 shares.")
            return
        }
        if(shares * current > user.buying_power){
            setDepositOpen(true)
            return
        }
        dispatch(transaction(user.id, symbol, current, shares * isBuying))
    }

    const toggleWatchlistItem = async() => {
        dispatch(toggleWatchlist(user.id, symbol))
        onWatchlist = !onWatchlist
    }

    const PurchaseButtons = () => {
        if(shareError) return(
            <StockErrors error={shareError}/>
        )
        return(
            <button className={`wide-button center cursor-pointer ${isGreen ? 'green-background' : 'orange-background'}`} onClick={buyStock}>
                Purchase
            </button>
        )
    }


    return(
        <div id="landing-page-container">
            <div id="graph-sidebar">
                <div>
                    <div id="account-graph-container">
                        <div>
                            <p className="font48">{name}</p>
                            <p className="font36">{`${Math.abs(current.toFixed(2))}`}</p>
                            <p className={`${current >= open ? "green-font" : "orange-font"} font20`}>{`${isGreen ? '+' : '-'}$${Math.abs(delta.toFixed(2))} (${isGreen ? '+' : '-'}%${Math.abs((percent*100).toFixed(2))}) Today`}</p>
                        </div>
                    </div>
                    <div>
                        {transactions.map((transaction, i) => {
                            return(
                                <Transaction transaction={transaction} key={i}/>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <div id="stock-sidebar" className="dark-background grey-border">
                        <select value={isBuying} onChange={e => setIsBuying(e.target.value)} id="transaction-select" className="dark-background">
                            <option value={1}>Buy {symbol}</option>
                            <option value={-1}>Sell {symbol}</option>
                        </select>
                        <div className="flex">
                            <p className="flex-left">Order Type</p>
                            <p className="flex-right">Market Order</p>
                        </div>
                        <div className="flex">
                            <p className="flex-left">Buy In</p>
                            <select className="flex-right" value={buyInType} onChange={e => setBuyInType(e.target.value)}>
                                <option>Shares</option>
                                <option>Dollars</option>
                            </select>
                        </div>
                        {buyInType == "Shares" &&
                        <>
                            <div className="flex">
                                <p className="flex-left">Shares</p>
                                <input className="flex-right no-border light-gray-background" value={shares} onChange={e => setShares(e.target.value)}></input>
                            </div>
                            <div className="flex">
                                <p className={`flex-left ${isGreen ? 'green-font' : 'orange-font'}`}>Market Price</p>
                                <p className="flex-right bold">${current}</p>
                            </div>
                            <div id="estimated-cost-div" className="flex">
                                <p className="flex-left bold">Estimated Cost</p>
                                <p className="flex-right bold">${shares.match(/^[0-9]*$/) ? (shares * current).toFixed(2) : 0}</p>
                            </div>
                        </>
                        }
                        <div className="flex">
                        <PurchaseButtons/>
                        </div>
                        <p id="buying-power-display" className="center">{isBuying > 0 ? `Buying Power: $${user.buying_power}` : `Shares: ${currentShares}`}</p>
                    </div>
                    {depositOpen && <DepositModal setDepositOpen={setDepositOpen} user={user}/>}
                    <div id="watchlist-div" className="flex">
                        <button className={`wide-button center cursor-pointer ${isGreen ? 'green-border green-font' : 'orange-border orange-font'}`} onClick={toggleWatchlistItem}>
                            {onWatchlist ? `- Remove from watchlist`:`+ Add to watchlist`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stock
