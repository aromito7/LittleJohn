import { useHistory } from "react-router-dom"
const PortfolioItem = ({stock}) => {
    const history = useHistory()
    if(!stock.stock) return null
    const open = parseFloat(stock.stock.open)
    const price = parseFloat(stock.stock.price)
    const delta = ((price - open) * 100/open).toFixed(2)
    const percentDelta = `${delta >= 0 ? '+' : ''}${delta}%`
    const goToStock = (symbol) => {
        history.push(`/stocks/${symbol}`)
    }
    return(
        <div className="portfolio-item-container cursor-pointer dark-background-hover pad10" onClick={e => goToStock(stock.stock.symbol)}>
            <div>
                <p>{stock.stock.symbol}</p>
            </div>
            {stock.shares && stock.shares > 0 &&
                    <p>Shares: {stock.shares}</p>
            }
            <div>
                <p className={delta >= 0 ? "green-font" : "orange-font"}>${price.toFixed(2)}</p>
                <p className={delta >= 0 ? "green-font" : "orange-font"}>{percentDelta}</p>
            </div>
        </div>
    )
}

export default PortfolioItem
