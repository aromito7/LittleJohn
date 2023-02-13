import { useState } from "react"

const SlidingPanes = ({isDepositOpen, setIsDepositOpen}) => {
    const [currentPane, setCurrentPane] = useState(0)

    const depositPane = {
        title: "Fund Your Account",
        body: "Your bank account is ready! Fund your Robinhood account to begin trading.",
        link: {
                name: "Add Funds",
                onClick: e => setIsDepositOpen(true),
                src: null
            },
        image: null,

    }

    const [panes, setPanes] = useState([depositPane])


    // panes.push({
    //     title: "Learn & Earn",
    //     body: "Learn and earn $1 of AVAX",
    //     link: null,
    //     image: null
    // })

    const Pane = () =>{
        return(
            <div>
                <p>Hello, sliding pane</p>
            </div>
        )
    }

    if(panes.length == 0) return null

    return(
        <div id="sliding-panes-container" className="flex">
            <div id="individual-pane-container" className="flex">
                {
                    <div className="individual-pane flex">
                        {panes[currentPane].image &&
                            <div>
                                Image goes here
                            </div>
                        }
                        <div id="pane-text" className="full-width">
                            <div className="flex full-width">
                                <p className="flex-left grey-font">{panes[currentPane].title}</p>
                                <p className="flex-end cursor-pointer" onClick={e => setPanes([])}>X</p>
                            </div>
                            <p>{panes[currentPane].body}</p>
                            <p className="green-font flex-bottom cursor-pointer" onClick={panes[currentPane].link.onClick}>{panes[currentPane].link.name}</p>
                        </div>
                    </div>

                    // panes.map((pane,i) => {

                    //     return(
                    //         <div key={i} className="individual-pane flex">
                    //             {pane.image &&
                    //                 <div>
                    //                     Image goes here
                    //                 </div>
                    //             }
                    //             <div className="full-width">
                    //                 <div className="flex full-width">
                    //                     <p className="flex-left">{pane.title}</p>
                    //                     <p className="flex-right">X</p>
                    //                 </div>
                    //                 <p>{pane.body}</p>
                    //             </div>
                    //         </div>
                    //     )
                    // })
                }
            </div>
        </div>
    )
}

export default SlidingPanes
