import { useState, useEffect } from "react"
import { deposit } from "../store/session"
import { useSelector, useDispatch } from "react-redux"

const DepositModal = ({user, props}) => {
    const [amount, setAmount] = useState(0)
    const [from, setFrom] = useState("Interest Checking")
    const [to, setTo] = useState("LittleJohn")
    const [error, setError] = useState("")
    const [errors, setErrors] = useState([])
    const [showDismiss, setShowDismiss] = useState(false)
    const {showDepositModal, closeModals, setIsDepositOpen} = props

    const dispatch = useDispatch()

    const depositAmount = async (e) => {

        if(amount <= 0){
            setShowDismiss(true)
            setError("Enter a positive amount")
            return
        }
        if(from == "LittleJohn" && (user.buying_power < amount)){
            setShowDismiss(true)
            setError("Insufficient funds")
            return
        }
        const data = await dispatch(deposit(user.id, to == "LittleJohn" ? amount : -amount));
        if (data) {
            setErrors(data);
        }else{
            closeModals()
        }
    }

    const toggle = (e) => {
        setTo(from)
        setFrom(to)
    }

    useEffect(() => {
        if(amount <= 0) errors.push("Amount must be positive")
        if(amount > user.buying_power && to == "Interest Checking") errors.push("Cannot withdraw more than your buying power")
    }, [amount])

    return(
        <div className="modal pad25 white-background black-border" id="deposit-modal">
            <div className="flex">
                <p className="flex-left bold font20">Transfer Money</p>
                <p id="x-close" className="cursor-pointer" onClick={e => setIsDepositOpen(false)}>X</p>
            </div>
            <div id="transfer-modal-grid">
                <p>Amount</p>
                <input className="grey-border flex-end" value={amount} onChange={e => setAmount(e.target.value)}></input>
                <p>From</p>
                <select className="grey-border" value={from} onChange={toggle}>
                    <option>Interest Checking</option>
                    <option>LittleJohn</option>
                </select>
                <p>To</p>
                <select className="grey-border" value={to} onChange={toggle}>
                    <option>LittleJohn</option>
                    <option>Interest Checking</option>
                </select>
            </div>
            <div className="flex-verticle">
            <p className="pad10 font20">Current buying power: ${user.buying_power.toFixed(2)}</p>
                {showDismiss ?
                    <>
                        <p className="pad10 red-font font20">{error}</p>
                        <button className="standard-button green-background center" onClick={e => setShowDismiss(false)}>Dismiss</button>
                    </>
                    : <button className="standard-button green-background center" onClick={depositAmount}>Confirm Transfer</button>
                }
            </div>
        </div>
    )
}

export default DepositModal
