import AccountGraph from "./AccountGraph"
import SidebarLists from "./SidebarLists"
import BuyingPower from "./BuyingPower"
import SlidingPanes from "./SlidingPanes"
import DepositModal from "../DepositModal"
import DailyMovers from "../DailyMovers"
import Info from "./Info"
import './PortfolioPage.css'
import { useSelector } from "react-redux"
import { useState } from "react"

const PortfolioPage = ({closeModals}) => {
    const user = useSelector(state => state.session.user)
    const [isDepositOpen, setIsDepositOpen] = useState(false)
    return(
        <div id="portfolio-page-container" onClick={closeModals}>
            <div id="graph-sidebar">
                <div>
                    <AccountGraph user={user}/>
                    <BuyingPower user={user} setIsDepositOpen={setIsDepositOpen} isDepositOpen={isDepositOpen}/>
                    <DepositModal user={user} isDepositOpen={isDepositOpen} setIsDepositOpen={setIsDepositOpen}/>
                    <SlidingPanes setIsDepositOpen={setIsDepositOpen} isDepositOpen={isDepositOpen}/>
                    <DailyMovers />
                    <Info user={user}/>
                </div>
                <div>
                    <SidebarLists user={user}/>
                </div>
            </div>
        </div>
    )
}

export default PortfolioPage
