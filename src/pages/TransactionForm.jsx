import { useState } from "react"

const TransactionForm = () => {

const initialState = {
    name: '',
    trnasactionType: '',
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
    setTransactionData({...transactionData , [even.target.name]: event.target.value})
}

const [transactionData , setTransactionData] = useState(initialState)

    return (
        <div className="transactionForm">
        <h1>Add transaction</h1>

        <form>
            <label>Transaction type</label>
            <div className="typeButton">
                <button type="button">Income</button>
                <button type="button">Expense</button>
            </div>
        <div>
  Description
            <input type="String" name="description" onChange={handleChange}/>

            Amount
            <input type="Number" name="amount" required onChange={handleChange}/>

            Date
            <input type="Date" name="date" required onChange={handleChange}/>

            category
            <input onChange={handleChange}/>
            <button type="submit">Add Transaction</button>
        </div>
        
        </form>
        </div>
    )
}

export default TransactionForm