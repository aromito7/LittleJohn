import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { transaction, toggleWatchlist } from "../../store/session"
import DepositModal from "../DepositModal"
import Transaction from "../Transaction"
import LoadingPage from "../LoadingPage"
import StockSidebar from "./StockSidebar"
import ErrorPage from "../ErrorPage"
import Graph from "../Graph"
import About from "./About"
import KeyStatistics from "./KeyStatistics"
import StockNews from "./StockNews"
import './stock.css'

const Stock = () => {
    const {symbol} = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const portfolio = useSelector(state => state.session.portfolio)
    const portfolioItem = portfolio.find(stock => stock.stock_symbol == symbol)
    const transactions = useSelector(state => state.session.transactions).filter(transaction => transaction.stockSymbol == symbol)
    const [buyingPower, setBuyingPower] = useState(user.buying_power)
    const [currentShares, setCurrentShares] = useState(portfolioItem ? portfolioItem.shares : 0)
    const [shares, setShares] = useState("0")
    const [isBuying, setIsBuying] = useState(1)
    const [showErrors, setShowErrors] = useState(false)
    const [shareError, setShareError] = useState("")
    const [depositOpen, setDepositOpen] = useState(false)
    const [insuficientFunds, setInsuficientFunds] = useState(false)
    const [stockData, setStockData] = useState(null)    //const stockData = useSelector(state => state.stocks[symbol])



    window.addEventListener('locationchange', function () {
        setStockData(null)
    });


    useEffect(async() => {
        const response = await fetch(`/api/stocks/${symbol}`) //if(!stockData) dispatch(thunkAlphaAPI(symbol))
        const data = await response.json()
        setStockData(data)
    },[dispatch, symbol])

    useEffect(() => {
        setShowErrors(false)
        setDepositOpen(false)
        setInsuficientFunds(false)
        setShareError(false)
    },[shares])

    //This is for when stock data hasn't loaded
    if(!stockData) return <LoadingPage/>

    //This is for when no stock data was returned from the backend
    if(!stockData.symbol) {
        return <ErrorPage/>
    }

    console.log(stockData)

    const open = stockData.open
    const current = stockData.price
    const delta = parseFloat(current) - parseFloat(open)
    const isGreen = delta >= 0
    const percent = parseFloat(delta) / parseFloat(open)
    const name = stockData.name ? stockData.name.split(', Inc')[0].split(".com")[0] : stockData.symbol

    const buyStock = async() => {
        if(showErrors){
            setShowErrors(false)
            setDepositOpen(false)
            setInsuficientFunds(false)
            setShareError('')
            return
        }
        if(shares <= 0) {
            setShareError("Enter at least 1 share(s).")
            setShowErrors(true)
            return
        }
        else if(shares % 1 != 0){
            setShareError("Enter a whole number of shares")
            setShowErrors(true)
            return
        }
        if(isBuying < 0 && shares > portfolioItem.shares){
            setShareError("Insuficient shares.")
            setShowErrors(true)
            return
        }
        if(isBuying > 0 && shares * current > user.buying_power){
            setShowErrors(true)
            setInsuficientFunds(true)
            setShareError("Not enough buying power")
            return
        }
        setCurrentShares((parseInt(currentShares) + isBuying*parseInt(shares)).toString())
        setBuyingPower(buyingPower - (isBuying * shares) * current)
        const response = dispatch(transaction(user.id, symbol, current, shares * isBuying, stockData.name, stockData))
        setShares('0')
    }


    return(
        <div id="portfolio-page-container">
            <div id="graph-sidebar">
                <div>
                    <div id="account-graph-container">
                        <div>
                            <p className="font48">{name}</p>
                            <p className="font36">{`$${Math.abs(current.toFixed(2))}`}</p>
                            <p className={`${current >= open ? "green-font" : "orange-font"} font20`}>{`${isGreen ? '+' : '-'}$${Math.abs(delta.toFixed(2))} (${isGreen ? '+' : '-'}${Math.abs((percent*100).toFixed(2))}%) Today`}</p>
                        </div>
                        <Graph graphData={stockData}/>
                    </div>
                    {stockData.about &&
                        <About stock={stockData}/>
                    }
                    <KeyStatistics stock={stockData}/>
                    <StockNews stock={stockData}/>
                    <div>
                        {transactions.reverse().map((transaction, i) => {
                            return(
                                <Transaction transaction={transaction} key={i}/>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <StockSidebar stockData={stockData} user={user}/>
                </div>
            </div>
        </div>
    )
}

export default Stock
