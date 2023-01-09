const Transaction = ({transaction}) => {
    return(
        <div className="transaction grey-border" key={transaction.id}>
            <div className="transaction-left">
                <div className="green-background transaction-symbol">
                    {transaction.stockSymbol}
                </div>
            </div>
            <div className="transaction-right">
                <div className="transaction-right-top">
                    <p className="flex-left">{transaction.stock.name.split('.com')[0]}</p>
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
