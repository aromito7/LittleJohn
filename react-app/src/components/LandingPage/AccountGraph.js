import { useSelector } from "react-redux";
const AccountGraph = () => {
    const user = useSelector(state => state.session.user)
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
        </div>
    )
}

export default AccountGraph
