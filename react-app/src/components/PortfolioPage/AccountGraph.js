import { useSelector } from "react-redux";
import Graph from "../Graph"
const AccountGraph = () => {
    const user = useSelector(state => state.session.user)
    const PortfolioGraph = () =>{

        // const values = user.portfolio[0].stock.history.Close.map(values => {
        //     console.log(values)
        //     return values
        // })
        const values = {}
        for(let i = 0; i < user.portfolio.length; i++){
            const item = user.portfolio[i]
            const history = item.stock.history.Close
            for(let k = 0; k < Object.keys(history).length; k++){
                const key = Object.keys(history)[k]
                if(i == 0){
                    values[key] = history[key] * item.shares
                }else{
                    values[Object.keys(values)[i]] += history[key]
                }
            }
        }

        console.log(values)
        return "Hello, Graph"
    }
    //const accountValue = user.portfolio.reduce((acc, stock) => acc + stock.shares * stock.stock.price ,0)
    return(
        <div id="account-graph-container">
            <h1>${(user.portfolio.reduce((acc, stock) => acc + stock.shares * stock.stock.price ,0) + user.buying_power).toFixed(2)}</h1>
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
