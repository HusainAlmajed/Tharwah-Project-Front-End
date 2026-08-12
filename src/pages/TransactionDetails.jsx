import { useEffect , useState } from "react"
import * as transactionService from "../services/transaction"
import { useParams , useNavigate } from "react-router"

const TransactionDetails = () => {
const navigate = useNavigate()

const [transaction , setTransaction] = useState({})
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
const { transactionId } = useParams()

useEffect(() => {
    document.title = "Transaction Details"
    const fetchData = async () => {
        const data = await transactionService.show(transactionId)
        setTransaction(data)
    }
    fetchData()
}, [transactionId])

const handleDeleteTransaction = async () => {
    await transactionService.deleteTransaction(transactionId)
    navigate('/transactions')
}

    return (
        <div className="transaction-details-card">
        <div>
            <div className="details-actions">
        <button onClick={() => navigate(`/transactions/${transactionId}/edit`)}>
        Edit
        </button>

        <button className="delete-button" onClick={() => setShowDeleteConfirm(true)}>
        Delete
        </button>
        </div>
        {/* Confirmation message */}
        {showDeleteConfirm && (
            <div className="delete-confirm">
                <p>Are you sure you want to delete this transaction?</p>
                <div className="delete-confirm-actions">
                    <button type="button" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                    <button type="button" className="delete-button" onClick={handleDeleteTransaction}>Delete</button>
                    </div>
            </div>
        )}
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