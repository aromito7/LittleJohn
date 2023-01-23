import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 300, pv: 2200, amt: 2000}];


const StockInfo = ({stock}) => {
    const history = Object.values(stock.history.Close).slice(-3)
    const times = Object.keys(stock.history.Close).slice(-3)
    const low = Object.values(stock.history.Low).slice(-1)[0]
    const high = Object.values(stock.history.High).slice(-1)[0]
    const {open, price} = stock
    console.log(times)
    console.log(times.map(time => new Date(Number(time))))
    const RenderLineChart = () => (
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      );
    return(
        <div id='stock-info' className="flex dark-background grey-border">
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
