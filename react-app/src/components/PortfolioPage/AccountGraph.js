import { useSelector } from "react-redux";
import Graph from "../Graph"
const AccountGraph = ({user}) => {

    // console.log(user.portfolio[0])
    // console.log(user.portfolio.reduce((acc, stock) => acc + stock.shares * stock.stock.price ,0))
    console.log("Account graph user:")
    console.log(user)

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
        console.log(user.account_data)
        const graphData = {
            history : {
                Close : user.account_data
            }
        }
        return <Graph graphData={graphData}/>

    }
    //const accountValue = user.portfolio.reduce((acc, stock) => acc + stock.shares * stock.stock.price ,0)
    return(
        <div id="account-graph-container">
            <h1>${(user.portfolio.reduce((acc, stock) => acc + stock.shares * stock.stock.price ,0) + user.buying_power).toLocaleString("en-US")}</h1>
            <div className="flex">
                <p className="green-font">$0.00 (0.00%)</p>
                <p>Today</p>
            </div>
            <div className="flex">
                <p className="green-font">$0.00 (0.00%)</p>
                <p>After-Hours</p>
            </div>
            {user.portfolio.length > 0 &&
                <PortfolioGraph/>
            }
        </div>
    )
}

export default AccountGraph
