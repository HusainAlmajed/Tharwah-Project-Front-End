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
        <div className="transaction-details-card">
        {/* <h1>Details</h1> */}
        <div>
            <div className="transaction-summary-card">
                <div className="transaction-summary-info">
                <h2>{transaction.name}</h2>
                <h3>{transaction.transactionType}</h3>
                <h3>{new Date(transaction.date).toLocaleDateString()}</h3>
                </div>
                    <h3 className="amount">BHD {transaction.amount}</h3>
            </div>

            <div className="transaction-info-card">
                <div className="transaction-detail">
                    <h3>Type</h3>
                    <p>{transaction.transactionType}</p>
                </div>

                <div className="transaction-detail">
                    <h3>Name</h3>
                    <p>{transaction.category?.name}</p>
                </div>

                <div className="transaction-detail">
                    <h3>Date</h3>
                    <p>{new Date(transaction.date).toLocaleDateString()}</p>
                </div>

                <div className="transaction-detail">
                    <h3>Description</h3>
                    <p>{transaction.description}</p>
                </div>

            </div>
        </div>
        </div>
    )
}

export default TransactionDetails