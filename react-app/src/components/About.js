import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Menu from "./MenuBar/menu"
const About = ({props}) => {
    const user = useSelector(state => state.session.user)
    return(
        <>
            {user &&
                <Menu props={props}/>
            }
            <div id="about-page-container">
                <div className="flex">
                    <div className="flex-left">
                        <h1 className="green-font">About Little John:</h1>
                        <h2>Made by: Alexander J Romito</h2>
                    </div>
                    <div className="flex-right">
                        <a href="https://github.com/aromito7/LittleJohn">
                            <i className="fa-brands fa-github fa-6x cursor-pointer"/>
                        </a>
                    </div>
                </div>
                <p>This endeavor has been the most fun I've ever had programming.  While I'm proud of what I accomplished in two weeks, I still have much more to work on in the future.  I want the stock information to constantly update, add a graph to the stock + account pages, and allow users to place limit orders that only trigger transactions if the stock price goes above/below a threshold without a given timespan.</p>
                <div id="about-home-button-container" className="flex">
                    <Link to="/">
                            <button className='wide-button center green-background font-black'>Go Home</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default About
