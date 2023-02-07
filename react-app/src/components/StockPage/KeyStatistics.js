
const KeyStatistics = ({stock}) =>{
    if(!stock) return

    const formatStatistics = number => {
        if(number >= 10**9){
            return `${(number/(10**9)).toFixed(2)}B`
        }
        else if(number >= 10**6){
            return `${(number/(10**6)).toFixed(2)}M`
        }
        return number.toLocaleString("en-US")
    }

    const formatCurrency = money => {
        return money.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
    }

    return(
        <div id="key-statistics-component">
            <div id="about-component-header" className="font28">
                Key Statistics
            </div>
            <div id="about-component-description">
                <div className="flex">
                    <div className="flex-quarter">
                        <p className="bold">Market Cap</p>
                        <p>{stock.market_cap ? formatStatistics(stock.market_cap) : "---"}</p>
                    </div>
                    <div className="flex-quarter">
                        <p className="bold">Price-Earnings ratio</p>
                        <p>{stock.price && stock.eps ? (stock.price/stock.eps).toLocaleString("en-US") : "---"}</p>
                    </div>
                    <div className="flex-quarter">
                        <p className="bold">Dividend Yield</p>
                        <p>---</p>
                    </div>
                    <div className="flex-quarter">
                        <p className="bold">Average Volume</p>
                        <p>{formatStatistics(stock.volume)}</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-quarter">
                        <p className="bold">High today</p>
                        <p>{formatCurrency(stock.day_high)}</p>
                    </div>
                    <div className="flex-quarter">
                        <p className="bold">Low today</p>
                        <p>{formatCurrency(stock.day_low)}</p>
                    </div>
                    <div className="flex-quarter">
                        <p className="bold">Open price</p>
                        <p>{formatCurrency(stock.open)}</p>
                    </div>
                    <div className="flex-quarter">
                        <p className="bold">Volume</p>
                        <p>{formatStatistics(stock.volume)}</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-quarter">
                        <p className="bold">52 Week high</p>
                        <p>{formatCurrency(stock.year_high)}</p>
                    </div>
                    <div className="flex-quarter">
                        <p className="bold">52 Week low</p>
                        <p>{formatCurrency(stock.year_low)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KeyStatistics
