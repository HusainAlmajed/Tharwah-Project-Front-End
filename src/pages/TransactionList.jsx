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

const handleDeleteTransaction = async (transactionId) => {
    await transactionService.deleteTransaction(transactionId)

    const filteredTransactions = transactions.filter((transaction) => {
        return transaction._id !== transactionId
    })

    setTransaction(filteredTransactions)
}

if (loading) return <main><div className="loader"></div></main>

    return (
    <div className="transaction-list">
        <div className="transaction-header">
             <h1>Transactions</h1>
            <Link to={"/transactions/new"}>+ Add transaction</Link>
        </div>
        
        <div className="transaction-filters">
            <div>
                <label>Search</label>
                <input type="text" />
            </div>

            <div>
                <label>Type</label>
                <select>
                    <option>All</option>
                    <option>Income</option>
                    <option>Expense</option>
                </select>
            </div>

            <div>
                <label>Month</label>
                <input type="month"/>
            </div>
        </div>

        <div className="transaction-table">

            <div className="transaction-row transaction-table-header">
                <p>Description</p>
                <p>Type</p>
                <p>Category</p>
                <p>Amount</p>
            </div>

   {transactions.map((transaction) => (
    <Link className="transaction-row" to={`/transactions/${transaction._id}`} key={transaction._id}>
        <p>{transaction.description}</p>
        <p>{transaction.transactionType}</p>
        <p>{transaction.category?.name}</p>
        <p>${transaction.amount}</p>
    </Link>
))}
            {/* <button onClick={() => handleDeleteTransaction(transaction._id)}>Delete</button> */}
            {/* <Link to={`/transactions/${transaction._id}/edit`}>Edit</Link> */}
    </div>
    </div>
    )
}

export default TransactionList