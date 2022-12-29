import { useState } from "react"
const BuyingPower = () => {
    const [open, setOpen] = useState(false)

    const toggleOpen = (e) => {
        setOpen(!open)
    }

    const MainBuyingPower = () => {
        return(
            <div className="flex pad25">
                <p className="flex-left grey-bottom bold">Buying Power</p>
                <p className="flex-right grey-bottom">{open? "" : "$100,000"}</p>
            </div>
        )
    }
    if(!open) return(
        <div id="buying-power-closed" className="dark-background-hover cursor-pointer" onClick={toggleOpen}>
            <MainBuyingPower/>
        </div>
    )
    return(
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
                <p className="flex-quarter grey-bottom text-right">$0.00</p>
            </div>
            <div className="flex pad25">
                <div id="deposit-funds" className="flex-left green-background hover">
                    Deposit Funds
                </div>
            </div>
        </div>
    )
}

export default BuyingPower
