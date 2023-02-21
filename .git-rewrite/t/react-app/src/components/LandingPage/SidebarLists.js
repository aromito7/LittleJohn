import PortfolioItem from "./PortFolioItem"
import { useState } from "react"
import { useSelector } from "react-redux"

const SidebarLists = ({user}) => {
    const [showPortfolio, setShowPortfolio] = useState(true)
    const [showWatchlist, setShowWatchlist] = useState(true)
    //const [showWatchlist, setShowWatchlist] = useState(true)


    const portfolio = useSelector(state => state.session.portfolio)
    const watchlist = useSelector(state => state.session.watchlist)

    const toggleWatchlist = () => {
        setShowWatchlist(!showWatchlist);
    }

    const togglePortfolio = () => {
        setShowPortfolio(!showPortfolio);
    }
    if(!user) return null
    return(
        <div id="sidebar-lists-container">
            <div id="portfolio-container" className="grey-border">
                <div className="list-title cursor-pointer dark-background-hover pad10" onClick={togglePortfolio}>
                    <h1>Portfolio</h1>
                    {showPortfolio ? <i className="fa-sharp fa-solid fa-arrow-up fa-2x flex-right"/> :
                    <i className="fa-sharp fa-solid fa-arrow-down fa-2x flex-right"/>}
                </div>
                {showPortfolio &&
                <div id={`sidebar-portfolio ${showPortfolio ? '' : 'transform-hide'}`}>
                    {portfolio.map((stock, i) => {
                        return(
                            <PortfolioItem key={i} stock={stock}/>
                        )
                    })}
                </div>
                }
            </div>
            <div id="watchlist-container" className="grey-border">
                <div className="list-title cursor-pointer dark-background-hover pad10" onClick={toggleWatchlist}>
                    <h1>Watchlist</h1>
                    {showWatchlist ? <i className="fa-sharp fa-solid fa-arrow-up fa-2x flex-right"/> :
                    <i className="fa-sharp fa-solid fa-arrow-down fa-2x flex-right"/>}
                </div>
                {showWatchlist &&
                <div id="sidebar-watchlist">
                    {watchlist.map((stock, i) => {
                        return(
                            <PortfolioItem key={i} stock={stock}/>
                        )
                    })}
                </div>
                }
            </div>
        </div>
    )
}

export default SidebarLists
