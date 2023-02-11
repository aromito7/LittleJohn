import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useState } from 'react';
//const data = [{name: 'Page A', uv: 400}, {name: 'Page B', uv: 300}];


const Graph = ({graphData}) => {
    //console.log(stock)
    const {history, open, price} = graphData
    const [currentHistory, setCurrentHistory] = useState("1D")
    const keys = Object.keys(history.Close)

    const graphTimeOptions = ["1D",  "1W", "1M", "3M"]

    let times
    switch(currentHistory){
        case "1D":
            times = (Object.keys(history.Close).slice(-8))
            break
        case "1W":
            times = (Object.keys(history.Close).slice(-40))
            break
        case "1M":
            times = (Object.keys(history.Close).slice(-160))
            break
        case "3M":
            times = (Object.keys(history.Close).slice(-480))//.filter((v,i) => i%8 == 0))
            break
    }

    const data = times.map(time => {
        return{
            time: new Date(Number(time)).toString().split(" ").slice(0,4).join(" "),
            price: history.Close[time].toFixed(2)
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
                {
                    graphTimeOptions.map(time => {
                        return(
                            <p className={`cursor-pointer ${currentHistory == time ? "green-font green-bottom" : "green-font-hover"}`} onClick={e => setCurrentHistory(time)}>{time}</p>
                        )
                    })
                }
                {/* <p className={`cursor-pointer ${currentHistory == "1D" ? "green-font green-bottom" : "green-font-hover"}`} onClick={e => setCurrentHistory("1D")}>1D</p>
                <p className={`cursor-pointer ${currentHistory == "1W" ? "green-font green-bottom" : "green-font-hover"}`} onClick={e => setCurrentHistory("1W")}>1W</p>
                <p className={`cursor-pointer ${currentHistory == "1M" ? "green-font green-bottom" : "green-font-hover"}`} onClick={e => setCurrentHistory("1M")}>1M</p>
                <p className={`cursor-pointer ${currentHistory == "3M" ? "green-font green-bottom" : "green-font-hover"}`} onClick={e => setCurrentHistory("3M")}>3M</p> */}
            </div>
        </div>
    )
}

export default Graph
