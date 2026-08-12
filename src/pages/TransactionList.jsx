import { useState , useEffect } from "react"
import * as transactionService from "../services/transaction"
import { Link } from "react-router"

const TransactionList = () => {

const [transactions , setTransaction] = useState([])
const [loading , setLoading] = useState(true) 
const [search , setSearch] = useState('')
const [typeFilter , setTypeFilter] = useState('All') 
const [monthFilter , setMonthFilter] = useState(new Date().toISOString().slice(0 , 7))

useEffect(() => {
    document.title = "Transactions List"
    const fetchedData = async () => {
        const data = await transactionService.index()
        setTransaction(data)
        setLoading(false) 
    }
    fetchedData()
}, [])

const filteredTransactions = transactions.filter((transaction) => {
    const searchInput = transaction.name.toLowerCase().includes(search.toLowerCase())

    const typeInput = typeFilter === 'All' || transaction.transactionType === typeFilter


    const date = new Date(transaction.date)
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2 , '0')}` 
    const dateInput = month === monthFilter

    return searchInput && typeInput && dateInput
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
                <select value={typeFilter} onChange={(event) => {setTypeFilter(event.target.value)}}> 
                    <option>All</option>
                    <option>Income</option>
                    <option>Expense</option>
                </select>
            </div>

            <div>
                <label>Month</label>
                <input type="month" value={monthFilter} onChange={(event) => setMonthFilter(event.target.value)}/>
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
   {filteredTransactions.map((transaction) => (
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