import { useState } from "react"

const SlidingPanes = ({isDepositOpen, setIsDepositOpen}) => {
    const [currentPane, setCurrentPane] = useState(0)
    const panes = []

    const openDeposit = e => {
        console.log("Open Sessame")
        setIsDepositOpen(true)
    }

    panes.push({
        title: "Fund Your Account",
        body: "Your bank account is ready! Fund your Robinhood account to begin trading.",
        link: {
                name: "Add Funds",
                onClick: openDeposit,
                src: null
            },
        image: null,

    })


    panes.push({
        title: "Learn & Earn",
        body: "Learn and earn $1 of AVAX",
        link: null,
        image: null
    })

    const Pane = () =>{
        return(
            <div>
                <p>Hello, sliding pane</p>
            </div>
        )
    }


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
                                <p className="flex-right">X</p>
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
