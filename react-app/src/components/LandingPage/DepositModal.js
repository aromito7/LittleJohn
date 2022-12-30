import { useState } from "react"
const DepositModal = ({setDepositOpen}) => {
    const [amount, setAmount] = useState(0)
    const [to, setTo] = useState("Interest Checking")
    const [from, setFrom] = useState("LittleJohn")

    const toggle = (e) => {
        setTo(from)
        setFrom(to)
    }
    return(
        <div className="modal dark-background pad25 black-border">
            <div className="flex">
                <p className="flex-left bold font16">Transfer Money</p>
                <p className="flex-right cursor-pointer" onClick={e => setDepositOpen(false)}>X</p>
            </div>
            <div id="transfer-modal-grid">
                <p>Amount</p>
                <input className="grey-border"></input>
                <p>From</p>
                <select className="grey-border" value={to} onChange={toggle}>
                    <option>Interest Checking</option>
                    <option>LittleJohn</option>
                </select>
                <p>To</p>
                <select className="grey-border" value={from} onChange={toggle}>
                    <option>LittleJohn</option>
                    <option>Interest Checking</option>
                </select>
            </div>
            <button className="standard-button green-background">Confirm Transfer</button>
        </div>
    )
}

export default DepositModal
