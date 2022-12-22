import PortfolioItem from "./PortFolioItem"
import { useState } from "react"
import { useSelector } from "react-redux"

const SidebarLists = () => {
    const [showPortfolio, setShowPortfolio] = useState(true)
    const [showWatchlist, setShowWatchlist] = useState(true)
    const user = useSelector(state => state.session.user)
    const portfolio = user.portfolio

    const togglePortfolio = () => {
        setShowPortfolio(!showPortfolio);
    }
    return(
        <div id="sidebar-lists-container">
            <div className="list-title">
                <h1>My Portfolio</h1>
                {showPortfolio ? <i className="fa-sharp fa-solid fa-arrow-up fa-2x flex-right" onClick={togglePortfolio}/> :
                <i className="fa-sharp fa-solid fa-arrow-up fa-2x flex-right upside-down"  onClick={togglePortfolio}/>}
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
            <div id="sidebar-watchlist">
                <h1>Watchlist</h1>
            </div>
        </div>
    )
}

export default SidebarLists
