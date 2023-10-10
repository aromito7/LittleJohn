import { useSelector } from "react-redux";
import Graph from "../Graph"
const AccountGraph = ({user}) => {

    // console.log(user.portfolio[0])
    // console.log(user.portfolio.reduce((acc, stock) => acc + stock.shares * stock.stock.price ,0))
    // console.log("Account graph user:")
    // console.log(user)
    const account_open = user.account_open.toFixed(2)
    const account_current = user.account_current.toFixed(2)
    const delta = (account_current - account_open)
    const percent = account_open > 0 ? (100 * delta / account_open).toFixed(2) : 0


    // console.log(account_open, account_current, delta, percent)
    const PortfolioGraph = () =>{

        // const values = user.portfolio[0].stock.history.Close.map(values => {
        //     console.log(values)
        //     return values
        // })


        //console.log(user.portfolio.reduce((acc, stock) => acc + stock.open * stock.stock.price ,0))

        // const values = {}
        // for(let i = 0; i < user.portfolio.length; i++){
        //     const item = user.portfolio[i]
        //     const history = item.stock.history.Close
        //     for(let k = 0; k < Object.keys(history).length; k++){
        //         const key = Object.keys(history)[k]
        //         if(i == 0){
        //             values[key] = history[key] * item.shares
        //         }else{
        //             values[Object.keys(values)[i]] += history[key]
        //         }
        //     }
        // }
        var graphData = {}

        if(user.portfolio.length > 0){
            graphData = {
                history : {
                    Close : user.account_data
                }
            }
        }else{
            const time = new Date().getTime()
            const hour = time - time % 3600000
            // console.log(time)
            // console.log(hour)

            const arr = Array(480).fill().map((x, i) => hour - (i * 3600000))
            const fakeData = arr.reduce((obj, val) => {
                obj[val] = 0
                return obj
            }, {})


            // console.log(fakeData)

            graphData = {
                history : {
                    Close : fakeData
                }
            }
        }

        // console.log("Displaying Graph")
        // console.log(graphData)
        return <Graph graphData={graphData}/>

    }
    //const accountValue = user.portfolio.reduce((acc, stock) => acc + stock.shares * stock.stock.price ,0)
    return(
        <div id="account-graph-container">
            <h1>${(user.portfolio.reduce((acc, stock) => acc + stock.shares * stock.stock.price ,0) + user.buying_power).toLocaleString("en-US")}</h1>
            <div className="flex">
                {delta >= 0 ?
                    <p className="green-font">+{delta.toLocaleString()}$ (+{percent}%)</p>
                    :
                    <p className="orange-font">{delta.toLocaleString()}$ ({percent}%)</p>
                }
                <p>Today</p>
            </div>
            {/* <div className="flex">
                <p className="green-font">$0.00 (0.00%)</p>
                <p>After-Hours</p>
            </div> */}
            <PortfolioGraph/>
        </div>
    )
}

export default AccountGraph
