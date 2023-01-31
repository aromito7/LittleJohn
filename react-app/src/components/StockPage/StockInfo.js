import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useState } from 'react';
//const data = [{name: 'Page A', uv: 400}, {name: 'Page B', uv: 300}];


const StockInfo = ({stock}) => {
    console.log(stock)
    const [currentHistory, setCurrentHistory] = useState("1D")
    let times
    switch(currentHistory){
        case "1D":
            times = (Object.keys(stock.history.Close).slice(-1))
            break
        case "1W":
            times = (Object.keys(stock.history.Close).slice(-5))
            break
        case "1M":
            times = (Object.keys(stock.history.Close).slice(-20))
            break
        case "3M":
            times = (Object.keys(stock.history.Close).slice(-60))
            break
    }
    const low = Object.values(stock.history.Low).slice(-1)[0]
    const high = Object.values(stock.history.High).slice(-1)[0]
    const {open, price} = stock
    const data = times.map(time => {
        return{
            time: new Date(Number(time)).toString().split(" ").slice(0,4).join(" "),
            price: stock.history.Close[time].toFixed(2)
        }
    })

    const CustomTooltip = ({ active, payload, label, time, price}) => {
        if (active && payload && payload.length) return (
        <div className="custom-tooltip">
            <p className='date'>{payload[0].payload.time}</p>
            <p className="label">{`$${payload[0].value}`}</p>
        </div>
        );
        return null
        }

    const RenderLineChart = () => {
        return(
            <LineChart width={1000} height={500} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone linear" dot={false} dataKey="price" stroke={`${price > open ? "#00B405" : "#FF5000"}`} />
            <YAxis domain={['dataMin', 'dataMax']} display="none"/>
            <Tooltip position={{ x: 'auto', y: -50 }} content={<CustomTooltip data={data}/>}/>
            </LineChart>
        )};
    return(
        <div id='stock-info' className="flex-horizontal grey-border">
            <RenderLineChart/>
            <div id='stock-chart-lengths' className='flex'>
                <p className={`cursor-pointer ${currentHistory == "1D" ? "green-font green-bottom" : "green-font-hover"}`} onClick={e => setCurrentHistory("1D")}>1D</p>
                <p className={`cursor-pointer ${currentHistory == "1W" ? "green-font green-bottom" : "green-font-hover"}`} onClick={e => setCurrentHistory("1W")}>1W</p>
                <p className={`cursor-pointer ${currentHistory == "1M" ? "green-font green-bottom" : "green-font-hover"}`} onClick={e => setCurrentHistory("1M")}>1M</p>
                <p className={`cursor-pointer ${currentHistory == "3M" ? "green-font green-bottom" : "green-font-hover"}`} onClick={e => setCurrentHistory("3M")}>3M</p>
            </div>
        </div>
    )
}

export default StockInfo
