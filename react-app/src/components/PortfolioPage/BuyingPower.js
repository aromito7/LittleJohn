import { useState } from "react"
import { useSelector } from "react-redux"
import DepositModal from "../DepositModal"
const BuyingPower = ({user, props}) => {
    const [open, setOpen] = useState(false)
    const {showDepositModal, setShowDepositModal} = props
    const [isDepositOpen, setIsDepositOpen] = useState(false)
    props.setIsDepositOpen = setIsDepositOpen

    const toggleOpen = (e) => {
        setOpen(!open)
    }

    const deposit = (e) => {
        console.log(`ShowDepositModal: ${showDepositModal}`)
        //setShowDepositModal(true)
        setIsDepositOpen(true)
    }

    const MainBuyingPower = () => {
        return(
            <div className="flex pad25" onClick={toggleOpen}>
                <p className="flex-left grey-bottom bold">Buying Power</p>
                <p className="flex-right grey-bottom">${user.buying_power.toLocaleString("en-US")}</p>
            </div>
        )
    }

    const OpenBuyingPower = () => {
        return (
            <div id="buying-power-open" className=" cursor-pointer">
            <MainBuyingPower/>
            <div className="flex pad25 ">
                <p className="flex-quarter grey-bottom">Brokerage Cash</p>
                <p className="flex-quarter grey-bottom text-right">$0.00</p>
                <p className="flex-right">
                Buying Power represents the total value of assets you can purchase.
                </p>
            </div>
            <div className="flex pad25 ">
                <p className="flex-quarter grey-bottom">Buying Power</p>
                <p className="flex-quarter grey-bottom text-right">${user.buying_power.toFixed(2)}</p>
            </div>
            <div className="flex pad25 ">
                <button className="standard-button green-background font-black" onClick={deposit}>Deposit Funds</button>
            </div>
        </div>
        )
    }

    if(!open) return(
        <div id="buying-power-closed" className="light-background-hover cursor-pointer">
            <MainBuyingPower/>
        </div>
    )

    if(isDepositOpen){
        return(
            <>
                <OpenBuyingPower/>
                <DepositModal props={props} user={user}/>
            </>
        )
    }
    return(
        <OpenBuyingPower/>
    )
}

export default BuyingPower
