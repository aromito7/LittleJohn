import AccountGraph from "./AccountGraph"
import SidebarLists from "./SidebarLists"
import BuyingPower from "./BuyingPower"
import Info from "./Info"
import Menu from "../menu.js"
import './LandingPage.css'


const LandingPage = () => {


    return(
        <div id="landing-page-container">
            <div id="graph-sidebar">
                <div>
                    <AccountGraph/>
                    <BuyingPower/>
                    <Info/>
                </div>
                <div>
                    <SidebarLists/>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
