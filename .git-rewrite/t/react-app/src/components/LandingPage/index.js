import AccountGraph from "./AccountGraph"
import SidebarLists from "./SidebarLists"
import BuyingPower from "./BuyingPower"
import Info from "./Info"
import Menu from "../menu.js"
import './LandingPage.css'
import { useSelector } from "react-redux"

const LandingPage = () => {
    const user = useSelector(state => state.session.user)

    return(
        <div id="landing-page-container">
            <div id="graph-sidebar">
                <div>
                    <AccountGraph user={user}/>
                    <BuyingPower user={user}/>
                    <Info user={user}/>
                </div>
                <div>
                    <SidebarLists user={user}/>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
