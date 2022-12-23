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
    const stockData = useSelector(state => state.stocks[symbol])
    const dispatch = useDispatch()
    console.log("STOCK DATA")
    console.log(stockData)
    // useEffect(async() => {
    //     if(!stockData) dispatch(thunkAlphaAPI(symbol))
    // },[dispatch])

    // const keys = Object.keys(stockData)
    // console.log(stockData)
    const open = 30.9800//stockData[keys.slice(-1)[0]]["1. open"]
    const current = 31.2100//stockData[keys[0]]["4. close"]
    //console.log(user)

    const buyStock = () => {
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
