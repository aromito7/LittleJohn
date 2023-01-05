//import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import Transaction from "../Transaction";
const Info = () => {
    const transactions = useSelector(state => state.session.transactions);
    if(transactions.length < 1) return(
        <div>
            <h1>No transactions... yet</h1>
        </div>
    )
    // useEffect(async() => {
    //     if(!user) return
    //     const response = await fetch(`/api/users/${user.id}/transactions`)
    //     const data = await response.json()
    //     setTransactions(data.transactions)
    // },[])

    return(
        <div id="info-container">
            <h1>Recent Transactions</h1>
            {transactions.map((transaction, i) => {
                return(
                    <Transaction transaction={transaction} key={i}/>
                )
            })}
        </div>
    )
}

export default Info
