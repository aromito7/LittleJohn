import { useHistory } from "react-router-dom"
const Transaction = ({transaction}) => {
    const history = useHistory()
    return(
        <div className="transaction grey-border" key={transaction.id}>
            <div className="transaction-left">
                <div className="green-background transaction-symbol cursor-pointer black-border-hover" onClick={ e => history.push(`/stocks/${transaction.stockSymbol}`)}>
                    <p className="green-background font36">
                        {transaction.stockSymbol}
                    </p>
                </div>
            </div>
            <div className="transaction-right">
                <div className="transaction-right-top">
                    <p className="flex-left">{transaction.stock.name ? transaction.stock.name.split('.com')[0] : transaction.stock.symbol}</p>
                    <p className="flex-right">{transaction.createdAt.split(" GMT")[0]}</p>
                </div>
                <div className="transaction-right-bot">
                    <p>{`You ${transaction.shares > 0 ? 'bought' : 'sold'} ${Math.abs(transaction.shares)} shares at $${transaction.price.toFixed(2)}`}</p>
                </div>
            </div>
        </div>
    )
}


export default Transaction
