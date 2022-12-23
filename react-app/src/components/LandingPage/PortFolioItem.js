const PortfolioItem = ({stock}) => {

    return(
        <div className="portfolio-item-container">
            <p>{stock.stock_symbol}</p>
            <p>Hello, Graph!</p>
            <p>{stock.average_price}</p>
        </div>
    )
}

export default PortfolioItem
