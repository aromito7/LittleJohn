import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { toggleWatchlist } from "../../store/session"

import DepositModal from "../DepositModal"

const StockSidebar = ({stockData, user}) => {
    const dispatch = useDispatch()
    const symbol = stockData.symbol
    const portfolio = useSelector(state => state.session.portfolio)
    const portfolioItem = portfolio.find(stock => stock.stock_symbol === symbol)
    const watchlist = useSelector(state => state.session.watchlist)
    const [buyingPower, setBuyingPower] = useState(user.buying_power)
    const [currentShares, setCurrentShares] = useState(portfolioItem ? portfolioItem.shares : 0)
    const [buyInType, setBuyInType] = useState("Shares")
    const [shares, setShares] = useState("0")
    const [isBuying, setIsBuying] = useState(1)
    const [showErrors, setShowErrors] = useState(false)
    const [shareError, setShareError] = useState("")
    const [depositOpen, setDepositOpen] = useState(false)
    const [insuficientFunds, setInsuficientFunds] = useState(false)

    const open = stockData.open
    const current = stockData.price
    const delta = parseFloat(current) - parseFloat(open)
    const isGreen = delta >= 0
    //const percent = parseFloat(delta) / parseFloat(open)
    //const name = stockData.name ? stockData.name.split(', Inc')[0].split(".com")[0] : stockData.symbol

    const buyStock = async() => {
        if(showErrors){
            setShowErrors(false)
            setDepositOpen(false)
            setInsuficientFunds(false)
            setShareError('')
            return
        }
        if(shares <= 0) {
            setShareError("Enter a positive number of shares")
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
        const newShares = (parseFloat(currentShares) + isBuying*parseFloat(shares))

        setCurrentShares((newShares < .01 ? 0 : newShares).toString())
        setBuyingPower(buyingPower - (isBuying * shares) * current)
        //const response = dispatch(transaction(user.id, symbol, current, shares * isBuying, stockData.name, stockData))
        setShares('0')
    }

    const PurchaseDismiss = () => {
        return(
            <button className={`wide-button center cursor-pointer margin-verticle20 ${isGreen ? 'green-background' : 'orange-background'}`} onClick={buyStock}>
                {shareError ? "Dismiss" : isBuying > 0 ? "Purchase" : "Sell"}
            </button>
        )
    }


    const toggleWatchlistItem = async() => {
        dispatch(toggleWatchlist(user.id, stockData))
        //onWatchlist = !onWatchlist
    }

    return(
        <div id="stock-sidebar" className="grey-border">
            <div id="buy-or-sell" className="flex">
                <div onClick={e => setIsBuying(1)} className={`cursor-pointer green-font-hover ${isBuying === 1 ? 'green-font' : ''}`}>Buy {symbol}</div>
                {currentShares > 0 &&
                    <div onClick={e => setIsBuying(-1)} className={`cursor-pointer green-font-hover ${isBuying === -1 ? 'green-font' : ''}`}>Sell {symbol}</div>
                }
            </div>
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
            {buyInType === "Shares" &&
            <>
                <div className="flex">
                    <p className="flex-left">Shares</p>
                    <input className="flex-right light-gray-background" value={shares} onChange={e => setShares(e.target.value)}></input>
                </div>
                <div className="flex">
                    <p className={`flex-left ${isGreen ? 'green-font' : 'orange-font'}`}>Market Price</p>
                    <p className="flex-right bold">${current}</p>
                </div>
                <div id="estimated-cost-div" className="flex">
                    <p className="flex-left bold">Estimated Cost</p>
                    <p className="flex-right bold">${shares.match(/^[0-9]*\.?[0-9]*$/) ? (shares * current).toFixed(2) : 0}</p>
                </div>
            </>
            }
            {buyInType === "Dollars" &&
                <div>

                </div>

            }

            <div className="flex-vertical">
                {shareError &&
                    <p id="stock-purchase-errors">{shareError}</p>
                }
                {depositOpen && <DepositModal setDepositOpen={setDepositOpen} user={user}/>}
                {insuficientFunds &&
                <button className={`wide-button center ${isGreen ? 'green-background' : 'orange-background'}`} onClick={e => setDepositOpen(true)}>Make Deposit</button>
                }
                <PurchaseDismiss/>
            </div>
            <p id="buying-power-display" className="center">{isBuying > 0 ? `Buying Power: $${buyingPower.toFixed(2)}` : `Shares: ${currentShares}`}</p>
            <div id="watchlist-div" className="flex">
                <button className={`wide-button center cursor-pointer ${isGreen ? 'green-border green-font' : 'orange-border orange-font'}`} onClick={toggleWatchlistItem}>
                    {Boolean(watchlist.find(item => item.stockSymbol === symbol)) ? `- Remove from watchlist`:`+ Add to watchlist`}
                </button>
            </div>
        </div>
    )
}

export default StockSidebar
