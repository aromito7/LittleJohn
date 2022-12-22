import PortfolioItem from "./PortFolioItem"
import { useState } from "react"
import { useSelector } from "react-redux"

const SidebarLists = () => {
    const [showPortfolio, setShowPortfolio] = useState(true)
    const [showWatchlist, setShowWatchlist] = useState(true)
    const user = useSelector(state => state.session.user)
    if(!user) return null
    const portfolio = user.portfolio
    const togglePortfolio = () => {
        setShowPortfolio(!showPortfolio);
    }
    return(
        <div id="sidebar-lists-container">
            <div className="list-title cursor-pointer" onClick={togglePortfolio}>
                <h1>My Portfolio</h1>
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
            <div id="sidebar-watchlist">
                <h1>Watchlist</h1>
            </div>
        </div>
    )
}

export default SidebarLists
