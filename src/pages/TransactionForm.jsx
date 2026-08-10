import { useState } from "react"
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

const handleChange = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    // so we can display the change in the form
    setTransactionData({...transactionData , [event.target.name]: event.target.value})
}

const handleAddTransaction = async (transactionData) => {
    const newTransaction = await props.transactionServices.create(transactionData)
    setTransactionData([newTransaction , ...setTransactionData])
    // navigate('/transactions')
}

const handleSubmit = (event) => {
    event.preventDefault()
    handleAddTransaction(transactionData)
}

const [transactionData , setTransactionData] = useState(initialState)

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
  Description
            <input type="String" name="description" onChange={handleChange} value={transactionData.description}/>

            Amount
            <input type="Number" name="amount" required onChange={handleChange}/>

            Date
            <input type="Date" name="date" required onChange={handleChange}/>

            category
            <input name="category" onChange={handleChange}/>
            <button type="submit">Add Transaction</button>
        </div>
        
        </form>
        </div>
    )
}

export default TransactionForm