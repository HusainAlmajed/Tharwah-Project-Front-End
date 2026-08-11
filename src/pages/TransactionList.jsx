import { useState , useEffect } from "react"
import * as transactionService from "../services/transaction"
import { Link } from "react-router"
const TransactionList = () => {

const [transactions , setTransaction] = useState([])
const [loading , setLoading] = useState(true)
useEffect(() => {
    const fetchdData = async () => {
        const data = await transactionService.index()
        setTransaction(data)
        setLoading(false) // so whenever we have the data, loading animation will stop
    }
    fetchdData()
}, [])

if (loading) return <main><div className="loader"></div></main>

    return (
    <div className="transaction-list">
    <h1>Transactions</h1>
    {transactions.map((transaction) => (
        <div className="transaction" key={transaction._id}>
            <Link to={`/transactions/${transaction._id}`}><h3>{transaction.name}</h3></Link>
        </div>
    ))}
    </div>
    )
}

export default TransactionList