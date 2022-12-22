import AccountGraph from "./AccountGraph"
import SidebarLists from "./SidebarLists"
import Info from "./Info"
import Menu from "./menu"
import './LandingPage.css'


const LandingPage = () => {


    return(
        <div id="landing-page-container">
            <Menu/>
            <div id="graph-sidebar">
                <div>
                    <AccountGraph/>
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
