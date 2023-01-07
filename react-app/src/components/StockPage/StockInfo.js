const StockInfo = ({stock}) => {
    console.log(stock)
    const history = Object.values(stock.history.Close)
    const low = Object.values(stock.history.Low).slice(-1)[0]
    const high = Object.values(stock.history.High).slice(-1)[0]
    const {open, price} = stock
    console.log(open, price, low, high)
    return(
        <div id='stock-info' className="flex dark-background grey-border">
            <div className="flex-quarter">
                <p className={`${price >= open ? 'green-font': 'orange-font'}`}>Current</p>
                <p  className={`${price >= open ? 'green-font': 'orange-font'}`}>{price.toFixed(2)}</p>
            </div>
            <div className="flex-quarter">
                <p>Open</p>
                <p>{open.toFixed(2)}</p>
            </div>
            <div className="flex-quarter">
                <p className="green-font">High</p>
                <p className="green-font">{high.toFixed(2)}</p>
            </div>
            <div className="flex-quarter">
                <p className="orange-font">Low</p>
                <p className="orange-font">{low.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default StockInfo
