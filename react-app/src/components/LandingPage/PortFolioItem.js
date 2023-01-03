import { useHistory } from "react-router-dom"
const PortfolioItem = ({stock}) => {
    const history = useHistory()
    const goToStock = (symbol) => {
        history.push(`/stocks/${symbol}`)
    }
    return(
        <div className="portfolio-item-container cursor-pointer" onClick={e => goToStock(stock.stock.symbol)}>
            <p>{stock.stock.symbol}</p>
            <p>graph</p>
            <p>{stock.stock.price}</p>
        </div>
    )
}

export default PortfolioItem
