import { useState } from "react"
import { useSelector } from "react-redux"
import DepositModal from "./DepositModal"
const BuyingPower = ({user}) => {
    const [open, setOpen] = useState(false)
    const [depositOpen, setDepositOpen] = useState(false)
    const toggleOpen = (e) => {
        setOpen(!open)
        setDepositOpen(false)
    }

    const deposit = (e) => {
        e.stopPropagation()
        setDepositOpen(true)
    }

    const MainBuyingPower = () => {
        return(
            <div className="flex pad25 dark-background-hover">
                <p className="flex-left grey-bottom bold">Buying Power</p>
                <p className="flex-right grey-bottom">${user.buying_power}</p>
            </div>
        )
    }
    if(!open) return(
        <div id="buying-power-closed" className="dark-background-hover cursor-pointer" onClick={toggleOpen}>
            <MainBuyingPower/>
        </div>
    )
    return(
        <>
            <div id="buying-power-open" className="dark-background cursor-pointer" onClick={toggleOpen}>
                <MainBuyingPower/>
                <div className="flex pad25">
                    <p className="flex-quarter grey-bottom">Brokerage Cash</p>
                    <p className="flex-quarter grey-bottom text-right">$0.00</p>
                    <p className="flex-right">
                    Buying Power represents the total value of assets you can purchase.
                    </p>
                </div>
                <div className="flex pad25">
                    <p className="flex-quarter grey-bottom">Buying Power</p>
                    <p className="flex-quarter grey-bottom text-right">${user.buying_power}</p>
                </div>
                <div className="flex pad25">
                    <button className="standard-button green-background" onClick={deposit}>Deposit Funds</button>
                </div>
            </div>
        {depositOpen && <DepositModal setDepositOpen={setDepositOpen} user={user}/>}
        </>
    )
}

export default BuyingPower
