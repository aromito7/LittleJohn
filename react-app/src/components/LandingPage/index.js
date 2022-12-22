import AccountGraph from "./AccountGraph"
import SidebarLists from "./SidebarLists"
import Menu from "./menu"
import './LandingPage.css'


const LandingPage = () => {


    return(
        <div id="landing-page-container">
            <Menu/>
            <div id="graph-sidebar">
                <AccountGraph/>
                <SidebarLists/>
            </div>
        </div>
    )
}

export default LandingPage
