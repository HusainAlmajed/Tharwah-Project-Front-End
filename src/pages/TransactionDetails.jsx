import { useEffect , useState } from "react"
import * as transactionService from "../services/transaction"
// import { Link } from "react-router"

const TransactionDetails = () => {

const [transactions , setTransaction] = useState([])

useEffect(() => {
    const fetchData = async () => {
        const data = await transactionService.index()
        setTransaction(data)
    }
    fetchData()
}, [])

    return (
        <>
        <h1>{transaction} Details</h1>
        {transactions.map((transaction) => (
            <p>{transaction.name}</p>
        ))}
        </>
    )
}

export default TransactionDetails