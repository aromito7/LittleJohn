import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useState } from 'react';
const MiniGraph = ({graphData}) =>{
    console.log(graphData)
    const {history, open, price} = graphData
    const keys = Object.keys(history.Close)


    const times = (Object.keys(history.Close).slice(-10))


    const data = times.map(time => {
        return{
            time: new Date(Number(time)).toString().split(" ").slice(0,4).join(" "),
            price: history.Close[time].toFixed(2)
        }
    })

    return(
        <LineChart width={100} height={50} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone linear" dot={false} dataKey="price" stroke={`${price > open ? "#00B405" : "#FF5000"}`} />
        <YAxis domain={['dataMin', 'dataMax']} display="none"/>
        </LineChart>
    )
}

export default MiniGraph
