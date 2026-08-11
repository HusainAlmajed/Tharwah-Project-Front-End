import { useEffect , useState } from "react"
import * as transactionService from "../services/transaction"
import { useParams } from "react-router"
// import { Link } from "react-router"

const TransactionDetails = () => {

const [transaction , setTransaction] = useState({})

const { transactionId } = useParams()

useEffect(() => {
    const fetchData = async () => {
        const data = await transactionService.show(transactionId)
        setTransaction(data)
        console.log(data)
        console.log('name is ' + data.name)
    }
    fetchData()
}, [transactionId])

    return (
        <div className="transaction-list">
        <h1>Details</h1>
        <div>
            <div>
                <h2>{transaction.name}</h2>
                <h3>{transaction.transactionType}</h3>
                <h3>{new Date(transaction.date).toLocaleDateString()}</h3>
                <h3>BHD{transaction.amount}</h3>
            </div>

            <div>
                <h3>{transaction.transactionType}</h3>
                <h3>{transaction.category?.name}</h3>
                <h3>{new Date(transaction.date).toLocaleDateString()}</h3>
                <h3>{transaction.description}</h3>
            </div>
      

        </div>
        </div>
    )
}

export default TransactionDetails