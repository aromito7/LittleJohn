import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { transaction } from "../../store/session"
import Transaction from "../Transaction"
import './stock.css'

const Stock = () => {
    const {symbol} = useParams()
    const user = useSelector(state => state.session.user)
    const portfolioItem = user.portfolio.find(stock => stock.stock_symbol == symbol)
    const currentShares = portfolioItem ? portfolioItem.shares : 0
    const transactions = user.transactions.filter(transaction => transaction.stockSymbol == symbol)
    console.log(transactions)
    const [buyInType, setBuyInType] = useState("Shares")
    const [shares, setShares] = useState("0")
    const [error, setError] = useState("")
    const [isBuying, setIsBuying] = useState(1)
    const [stockData, setStockData] = useState(null)    //const stockData = useSelector(state => state.stocks[symbol])
    const dispatch = useDispatch()


    useEffect(async() => {
        if(false) return
        const response = await fetch(`/api/stocks/${symbol}`) //if(!stockData) dispatch(thunkAlphaAPI(symbol))
        const data = await response.json()
        setStockData(data)
    },[dispatch])

    // useEffect(() => {
    //     console.log(isBuying)
    // },[isBuying])

    if(!stockData || !stockData.name) return null
    // console.log("STOCK DATA")
    // console.log(stockData)
    const history = stockData.history.Close

    const open = stockData.open
    const current = stockData.price
    const delta = parseFloat(current) - parseFloat(open)
    const isGreen = delta >= 0
    const percent = parseFloat(delta) / parseFloat(open)
    const name = stockData.name.split(', Inc')[0].split(".com")[0]
    //console.log(user)
    //console.log(`Open: ${open}; Current: ${current}`)
    const buyStock = async() => {
        if(shares <= 0) setError("Enter at least 0.000001 shares.")
        dispatch(transaction(user.id, symbol, current, shares * isBuying))
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
                                <p className="flex-left green-font">Market Price</p>
                                <p className="flex-right bold">${current}</p>
                            </div>
                            <div className="flex">
                                <p className="flex-left bold">Estimated Cost</p>
                                <p className="flex-right bold">${shares.match(/^[0-9]*$/) ? (shares * current).toFixed(2) : 0}</p>
                            </div>
                        </>
                        }
                        <div className="flex">
                            <div id="purchase-button" className="center cursor-pointer" onClick={buyStock}>
                                Purchase
                            </div>
                        </div>
                        <p className="center">{isBuying > 0 ? `Buying Power: $${user.buying_power}` : `Shares: ${currentShares}`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stock
