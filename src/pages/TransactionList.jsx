import { useState , useEffect } from "react"
import * as transactionService from "../services/transaction"
import { Link } from "react-router"

const TransactionList = () => {

const [transactions , setTransaction] = useState([])
const [loading , setLoading] = useState(true) 
const [search , setSearch] = useState('')
const [typeFilter , setTypeFilter] = useState('All') // so the default type will be both 'income' and 'expense'
const [monthFilter , setMonthFilter] = useState(new Date().toISOString().slice(0 , 7))

useEffect(() => {
    const fetchdData = async () => {
        const data = await transactionService.index()
        setTransaction(data)
        setLoading(false) // so whenever we have the data, loading animation will stop
    }
    fetchdData()
}, [])

//For filtering the transactions
const filterdTransactions = transactions.filter((transaction) => {
    const searchInput = transaction.name.toLowerCase().includes(search.toLowerCase())

    const typeInput = typeFilter === 'All' || transaction.transactionType === typeFilter

    return searchInput && typeInput
})

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
                <input type="text" value={search} onChange={(event) => {setSearch(event.target.value)}} />
            </div>

            <div>
                <label>Type</label>
                {/* So the inputed value can be used for the filltering */}
                <select value={typeFilter} onChange={(event) => {setTypeFilter(event.target.value)}}> 
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
                <p>Name</p>
                <p>Type</p>
                <p>Category</p>
                <p>Date</p>
                <p>Amount</p>
            </div>
{/* to loop through the filterd transactions */}
   {filterdTransactions.map((transaction) => (
    <Link className="transaction-row" to={`/transactions/${transaction._id}`} key={transaction._id}>
        <p>{transaction.name}</p>
        <p>{transaction.transactionType}</p>
        <p>{transaction.category?.name}</p>
        <p>{new Date(transaction.date).toLocaleDateString()}</p>
        <p>{transaction.amount} BHD</p>
    </Link>
))}
    </div>
    </div>
    )
}

export default TransactionList