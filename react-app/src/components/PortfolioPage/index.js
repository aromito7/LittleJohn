import AccountGraph from "./AccountGraph"
import SidebarLists from "./SidebarLists"
import BuyingPower from "./BuyingPower"
import Info from "./Info"
import './PortfolioPage.css'
import { useSelector } from "react-redux"

const PortfolioPage = ({props}) => {
    const user = useSelector(state => state.session.user)
    const {closeModals} = props
    return(
        <div id="portfolio-page-container" onClick={closeModals}>
            <div id="graph-sidebar">
                <div>
                    <AccountGraph user={user}/>
                    <BuyingPower props={props} user={user}/>
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
