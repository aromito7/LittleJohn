import './dailymovers.css'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
const DailyMovers = () => {
    const history = useHistory()
    const [movers, setMovers] = useState([])

    useEffect(async () => {
        const res = await fetch("/api/stocks/daily-movers")
        const data = await res.json()
        const temp = data.dailyMovers.forEach(mover => {
            mover['percentChange'] = Math.abs((mover.price - mover.open)/mover.open)
            return mover
        });
        setMovers(data.dailyMovers.sort((a, b) => Math.abs(b.percentChange) - Math.abs(a.percentChange)))
    },[])

    const MoverPane = ({mover}) => {
        console.log(mover)
        return(
            <div className="mover-pane grey-border grey-background-hover cursor-pointer flex-vertical" onClick={e => history.push(`/stocks/${mover.symbol}`)}>
                <p>{mover.name ? mover.name : mover.symbol}</p>
                <p className={`${mover.price > mover.open ? 'green-font' : 'orange-font'} font24`}>${mover.price}</p>
                <p className={`${mover.price > mover.open ? 'green-font' : 'orange-font'}`}>{`${mover.price > mover.open ? '+' : '-'}${(mover.percentChange*100).toFixed(2)}%`}</p>
            </div>
        )
    }

    if(movers.length == 0) return null


    return(
        <div id="daily-movers-container">
            <p className="font24">Daily Movers</p>
            <p className="grey-font">Stocks making the biggest moves today.</p>
            <div id="daily-movers-panes-container" className="flex">
                {
                    movers.map(mover => {
                        return(
                            <MoverPane key={mover.symbol} mover={mover}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DailyMovers
