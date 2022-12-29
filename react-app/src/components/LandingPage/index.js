import AccountGraph from "./AccountGraph"
import SidebarLists from "./SidebarLists"
import Info from "./Info"
import Menu from "../menu.js"
import './LandingPage.css'


const LandingPage = () => {


    return(
        <div id="landing-page-container">
            <div id="graph-sidebar">
                <div>
                    <AccountGraph/>
                    <div id="buying-power">
                        <p>Buying Power</p>
                        <p>$100,000</p>
                    </div>
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
