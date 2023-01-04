import PortfolioItem from "./PortFolioItem"
import { useState } from "react"
import { useSelector } from "react-redux"

const SidebarLists = ({user}) => {
    const [showPortfolio, setShowPortfolio] = useState(true)
    const [showWatchlist, setShowWatchlist] = useState(true)
    //const [showWatchlist, setShowWatchlist] = useState(true)


    if(!user) return null
    const portfolio = user.portfolio
    const watchlist = user.watchlist

    const toggleWatchlist = () => {
        setShowWatchlist(!showWatchlist);
    }

    const togglePortfolio = () => {
        setShowPortfolio(!showPortfolio);
    }
    return(
        <div id="sidebar-lists-container">
            <div className="list-title cursor-pointer" onClick={togglePortfolio}>
                <h1>Portfolio</h1>
                {showPortfolio ? <i className="fa-sharp fa-solid fa-arrow-up fa-2x flex-right"/> :
                <i className="fa-sharp fa-solid fa-arrow-up fa-2x flex-right upside-down"/>}
            </div>
            {showPortfolio &&
            <div id="sidebar-portfolio">
                {portfolio.map((stock, i) => {
                    return(
                        <PortfolioItem key={i} stock={stock}/>
                    )
                })}
            </div>
            }
            <div className="list-title curosor pointer" onClick={toggleWatchlist}>
                <h1>Watchlist</h1>
                {showWatchlist ? <i className="fa-sharp fa-solid fa-arrow-up fa-2x flex-right"/> :
                <i className="fa-sharp fa-solid fa-arrow-up fa-2x flex-right upside-down"/>}
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
    )
}

export default SidebarLists
