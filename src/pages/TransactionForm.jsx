import { useState , useEffect } from "react"
import { useNavigate } from "react-router"
const TransactionForm = (props) => {

const navigate = useNavigate()

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

// To get all the categories 
useEffect(() => {
    const fetchCategories = async () => {
        const categoriesData = await props.categoryServices.index()
        setCategories(categoriesData)
        console.log(categoriesData)
    }
    fetchCategories()
}, [])

const handleChange = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    // so we can display the change in the form
    setTransactionData({...transactionData , [event.target.name]: event.target.value})
}

const handleAddTransaction = async (transactionData) => {
    const newTransaction = await props.transactionServices.create(transactionData)
    console.log(newTransaction)
    // setTransactionData([newTransaction , ...setTransactionData])
    // navigate('/transactions')
    setTransactionData(initialState)
}

const handleSubmit = (event) => {
    event.preventDefault()
    handleAddTransaction(transactionData)
}

    return (
        <div className="transactionForm">
        <h1>Add transaction</h1>

        <form onSubmit={handleSubmit}>
            <label>Transaction type</label>
            {/* <div className="typeButton"> */}
                <button type="button" value={'Income'} name="transactionType" onClick={handleChange}>Income</button>
                <button type="button" value={'Expense'} name="transactionType" onClick={handleChange}>Expense</button>
            {/* </div> */}
        <div>
            Name
            <input type="String" name="name" onChange={handleChange} value={transactionData.name} />

            Description
            <input type="String" name="description" onChange={handleChange} value={transactionData.description}/>

            Amount
            <input type="Number" name="amount" required onChange={handleChange} value={transactionData.amount}/>

            Date
            <input type="Date" name="date" required onChange={handleChange} value={transactionData.date}/>

            {/* <input name="category" onChange={handleChange}/> */}
            {/* FOR LATER: I want to display the categories related to the choosen transaction type */}
            <select name="category" onChange={handleChange} value={transactionData.category}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
            <button type="submit">Add Transaction</button>
        </div>
        
        </form>
        </div>
    )
}

export default TransactionForm