
const AccountGraph = ({user}) => {
    console.log(user)
    return(
        <div id="account-graph-container">
            <h1>${(user.account_value + user.buying_power).toFixed(2)}</h1>
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
