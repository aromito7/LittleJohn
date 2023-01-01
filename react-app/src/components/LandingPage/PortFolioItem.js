import { useHistory } from "react-router-dom"
const PortfolioItem = ({stock}) => {
    const history = useHistory()
    const goToStock = (symbol) => {
        history.push(`/stocks/${symbol}`)
    }
    return(
        <div className="portfolio-item-container cursor-pointer" onClick={e => goToStock(stock.stock_symbol)}>
            <p>{stock.stock_symbol}</p>
            <p>Hello, Graph!</p>
            <p>{stock.average_price}</p>
        </div>
    )
}

export default PortfolioItem
