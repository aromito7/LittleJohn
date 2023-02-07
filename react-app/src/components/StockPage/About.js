import { useState } from "react"
const About = ({stock}) =>{
    const [showAboutAll, setShowAboutAll] = useState(false)
    return(
        <div id="about-component">
            <div id="about-component-header" className="font28">
                About
            </div>
            <div id="about-component-description" className="font20">
                <span>
                    {showAboutAll || stock.about.length <= 240 ?
                        stock.about :
                        stock.about.slice(0,240)
                    }
                </span>
                {showAboutAll && stock.about.length > 240 &&
                    <>
                        <span> </span>
                        <span className="green-font cursor-pointer" onClick={e => setShowAboutAll(false)}>Show less</span>
                    </>
                }
                {!showAboutAll && stock.about.length > 240 &&
                    <>
                        <span>... </span>
                        <span className="green-font cursor-pointer" onClick={e => setShowAboutAll(true)}>Show more</span>
                    </>
                }
            </div>
            <div className="flex">
                <div className="flex-left">
                    <p>Employees</p>
                    <p>{stock.employees ? stock.employees.toLocaleString("en-US") : "---"}</p>
                </div>
                <div className="flex-right-half">
                    <p>Headquarters</p>
                    <p>{stock.city && stock.state ? `${stock.city}, ${stock.state}` : "---"}</p>
                </div>
            </div>
        </div>
    )
}


export default About
