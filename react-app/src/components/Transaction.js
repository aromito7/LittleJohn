import { Link } from "react-router-dom"

const Transaction = ({transaction}) => {
    return(
        <div className="transaction grey-border" key={transaction.id}>
            <div className="transaction-left">
                <div className="green-background transaction-symbol cursor-pointer">
                    <Link className="green-background" to={`/stocks/${transaction.stockSymbol}`}>
                        {transaction.stockSymbol}
                    </Link>
                </div>
            </div>
            <div className="transaction-right">
                <div className="transaction-right-top">
                    <p className="flex-left">{transaction.stock.name.split('.com')[0]}</p>
                    <p className="flex-right">{transaction.createdAt.split(" GMT")[0]}</p>
                </div>
                <div className="transaction-right-bot">
                    <p>{`You ${transaction.shares > 0 ? 'bought' : 'sold'} ${Math.abs(transaction.shares)} shares at $${transaction.price}`}</p>
                </div>
            </div>
        </div>
    )
}


export default Transaction
