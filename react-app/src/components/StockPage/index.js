import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { thunkAlphaAPI } from "../../store/stock.js"
import Menu from '../menu.js'
import './stock.css'

const Stock = () => {
    const {symbol} = useParams()
    const user = useSelector(state => state.session.user)
    const [buyInType, setBuyInType] = useState("Shares")
    const [shares, setShares] = useState("0")
    const [error, setError] = useState("")
    const [stockData, setStockData] = useState(null)    //const stockData = useSelector(state => state.stocks[symbol])
    const dispatch = useDispatch()


    useEffect(async() => {
        if(true) return
        const response = await fetch(`/api/stocks/${symbol}`) //if(!stockData) dispatch(thunkAlphaAPI(symbol))
        const data = await response.json()
        setStockData(data)
    },[dispatch])

    if(!stockData) return null
    const history = stockData.history.Close
    console.log("STOCK HISTORY")
    console.log(Object.values(history))
    console.log("STOCK DATA")
    console.log(stockData)
    const keys = Object.keys(stockData)
    const open = 30.9800//stockData[keys.slice(-1)[0]]["1. open"]
    const current = Object.values(history).slice(-1)[0]//31.2100//stockData[keys[0]]["4. close"]
    //console.log(user)

    const buyStock = () => {
        if(shares <= 0) setError("Enter at least 0.000001 shares.")
        const userStocks = user.portfolio.map(stock => stock.stock_symbol)


        //If user doesn't own a stock then we do a create
        if(!userStocks.includes(symbol)){

        }
    }

    return(
        <div id="landing-page-container">
            <Menu/>
            <div id="graph-sidebar">
                <div>
                    <div id="account-graph-container">
                        <div>
                            <p>{symbol}</p>
                            <p>{current}</p>
                        </div>
                    </div>
                    <p>Stock History</p>
                </div>
                <div>
                    <div id="stock-sidebar" className="dark-background grey-border">
                        <p>Buy {symbol}</p>
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
                                <p className="flex-right bold">${shares.match(/^[0-9]*$/) ? shares * current : 0}</p>
                            </div>
                        </>
                        }
                        <div className="flex">
                            <div id="purchase-button" className="center cursor-pointer" onClick={buyStock}>
                                Purchase
                            </div>
                        </div>
                        <p className="center">{`Buying Power: $${user.buying_power}`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stock
