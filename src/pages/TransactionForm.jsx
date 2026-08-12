import { useState , useEffect } from "react"
import { useNavigate, useParams } from "react-router"
const TransactionForm = (props) => {

const navigate = useNavigate()
const { transactionId } = useParams()

const initialState = {
    name: '',
    transactionType: '',
    amount: '',
    date: '',
    description: '',
    category: '',
    owner: '',
}

const [transactionData , setTransactionData] = useState(initialState)
const [categories , setCategories] = useState([])

useEffect(() => {
    document.title = "Transaction Form"
    const fetchCategories = async () => {
        const categoriesData = await props.categoryServices.index()
        setCategories(categoriesData)
    }
    fetchCategories()
}, [])

useEffect(() => {
    const fetchTransaction = async () => {
        if (transactionId) {
            const transaction = await props.transactionServices.show(transactionId)
            let categoryId = transaction.category
            
            if (transaction.category._id) {
                categoryId = transaction.category._id
            }
            
            setTransactionData({...transaction, 
                date: transaction.date.slice(0, 10), 
                category: categoryId})
        }
    }
    fetchTransaction()
}, [transactionId])

const handleChange = (event) => {
    setTransactionData({...transactionData , [event.target.name]: event.target.value})
}

const handleAddTransaction = async (transactionData) => {
    const newTransaction = await props.transactionServices.create(transactionData)
    navigate('/transactions')
    setTransactionData(initialState)
}

const handleUpdateTransaction = async (transactionData) => {
    const updatedTransaction = await props.transactionServices.update(transactionId, transactionData)
    navigate('/transactions')
}

const handleSubmit = (event) => {
    event.preventDefault()
    if (transactionId) {
        handleUpdateTransaction(transactionData)
    } else {
        handleAddTransaction(transactionData)
    }
}

    return (
        <div className="transactionForm">
        <h1>{transactionId ? 'Edit transaction' : 'Add transaction'}</h1>

        <form onSubmit={handleSubmit} className="transaction-form">
            <label>Transaction type</label>

            <div className="type-button">
                <button type="button" value={'Income'} name="transactionType" onClick={handleChange}>Income</button>
                <button type="button" value={'Expense'} name="transactionType" onClick={handleChange}>Expense</button>
            </div>
                
            {/* </div> */}
        <div className="transaction-form-grid">
            <div className="form-field">
            Name
            <input type="String" name="name" onChange={handleChange} value={transactionData.name} />
            </div>

            <div className="form-field">
            Amount
            <input type="Number" name="amount" required onChange={handleChange} value={transactionData.amount}/>
            </div>

            <div className="form-field">
            Date
            <input type="Date" name="date" required onChange={handleChange} value={transactionData.date}/>
            </div>

            <div className="form-field">
            Category
            <select name="category" onChange={handleChange} value={transactionData.category}>
                <option value="">Select Category</option>
                {categories.filter((category) => {
                    return category.type === transactionData.transactionType
                }).map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))} 
            </select>
            </div>

            <div className="form-field description">
            Description
            <input type="String" name="description" onChange={handleChange} value={transactionData.description}/>
            </div>
            
            <div className="form-actions">
            <button type="submit">
                {transactionId ? 'Update Transaction' : 'Add Transaction'}
            </button>
            </div>
        </div>
        </form>
        </div>
    )
}

export default TransactionForm