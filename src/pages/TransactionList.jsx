import { useState , useEffect } from "react"
import * as transactionService from "../services/transaction"
const TransactionList = () => {

const [transactions , setTransaction] = useState([])

useEffect(() => {
    const fetchdData = async () => {
        const data = await transactionService.index()
        setTransaction(data)
    }
    fetchdData()
}, [])

    return (
    <div className="transaction-list">
    <h1>Transactions</h1>
    {transactions.map((transaction) => (
        <div className="transaction" key={transaction._id}>
            <h2>{transaction.name}</h2>
        </div>
    ))}
    </div>
    )
}

export default TransactionList