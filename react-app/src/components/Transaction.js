const Transaction = ({transaction}) => {
    return(
        <div className="transaction" key={transaction.id}>
            <div className="transaction-left">
                <div>
                    {transaction.stockSymbol}
                </div>
            </div>
            <div className="transaction-right">
                <div className="transaction-right-top">
                    <p className="flex-left">{transaction.stock.name.split('.com')[0]}</p>
                    <p className="flex-right">{transaction.createdAt}</p>
                </div>
                <div className="transaction-right-bot">
                    <p>{`You ${transaction.shares > 0 ? 'bought' : 'sold'} ${Math.abs(transaction.shares)} shares at $${transaction.price}`}</p>
                </div>
            </div>
        </div>
    )
}


export default Transaction
