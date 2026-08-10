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
    <>
    <h1>Transactions</h1>
    {transactions.map((transaction) => (
        <div>
        <li>
            <h2>{transaction.name}</h2>
        </li>
        </div>
    ))}
    </>
    )
}

export default TransactionList