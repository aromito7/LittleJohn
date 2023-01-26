import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
//const data = [{name: 'Page A', uv: 400}, {name: 'Page B', uv: 300}];


const StockInfo = ({stock}) => {
    const history = Object.values(stock.history.Close).slice(-3)
    const times = Object.keys(stock.history.Close).slice(-30)//.map(key => [key, stock.history.Close[key]])
    const low = Object.values(stock.history.Low).slice(-1)[0]
    const high = Object.values(stock.history.High).slice(-1)[0]
    const {open, price} = stock
    const data = times.map(time => {
        return{
            time: new Date(Number(time)).toString().split(" ").slice(0,4).join(" "),
            price: stock.history.Close[time].toFixed(2)
        }
    })
    console.log(data)
    const RenderLineChart = () => (
        <LineChart width={1000} height={500} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="price" stroke={`${price > open ? "#00B405" : "#FF5000"}`} />
          <YAxis domain={['dataMin', 'dataMax']} display="none"/>
          <Tooltip position={{ x: 'auto', y: -100 }}/>
        </LineChart>
      );
    return(
        <div id='stock-info' className="flex grey-border">
            <RenderLineChart/>
            {/* <div className="flex-quarter">
                <p className={`${price >= open ? 'green-font': 'orange-font'}`}>Current</p>
                <p  className={`${price >= open ? 'green-font': 'orange-font'}`}>{price.toFixed(2)}</p>
            </div>
            <div className="flex-quarter">
                <p>Open</p>
                <p>{open.toFixed(2)}</p>
            </div>
            <div className="flex-quarter">
                <p className="green-font">High</p>
                <p className="green-font">{high.toFixed(2)}</p>
            </div>
            <div className="flex-quarter">
                <p className="orange-font">Low</p>
                <p className="orange-font">{low.toFixed(2)}</p>
            </div> */}
        </div>
    )
}

export default StockInfo
