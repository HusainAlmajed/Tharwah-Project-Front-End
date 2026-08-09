import { useState } from "react"

const TransactionForm = () => {

const initialState = {
    name: '',
    trnasactionType: ''
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

            Description
            <input type="String" name="description" />

            Amount
            <input type="Number" name="amount" required />

            Date
            <input type="Date" name="date" required />

            category
            <input />

        </form>
        </div>
    )
}

export default TransactionForm