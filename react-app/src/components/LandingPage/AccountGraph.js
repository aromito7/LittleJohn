
const AccountGraph = ({user}) => {
    const accountValue = user.portfolio.reduce((acc, stock) => acc + stock.shares * stock.stock.price ,0)
    console.log(accountValue)
    return(
        <div id="account-graph-container">
            <h1>${(accountValue + user.buying_power).toFixed(2)}</h1>
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
