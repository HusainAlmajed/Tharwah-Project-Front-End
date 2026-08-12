import { useEffect, useState } from "react"
import { index } from '../services/user'
import { useNavigate } from "react-router"
import * as transactionService from "../services/transaction"

const Dashboard = (props) => {

const navigate = useNavigate()

const[transactions , setTransactions] = useState([])
const [totalIncome , setTotalIncome] = useState(0)
const [totalExpenses , setTotalExpenses] = useState(0)
const [balance , setBalance] = useState(0)
const [monthlyTransactions, setMonthlyTransactions] = useState([])

    useEffect(() => {
        const fetchTransaction = async () => {
            const data =  await transactionService.index()
            setTransactions(data)
            console.log("data" , data)

            let income = 0
            let expense = 0
            
            const currentDate = new Date()
            const currentMonth = currentDate.getMonth()
            const currentYear = currentDate.getFullYear()
            
            // to fillter the transactions using current date
            const currentMonthTransactions = data.filter((transaction) => {
                const date = new Date(transaction.date)
                return (
                    date.getMonth() === currentMonth && date.getFullYear() === currentYear
                )
            })

            // to calculate the totals of the current month only
            currentMonthTransactions.map((transaction) => {
                
                if (transaction.transactionType === 'Income') {
                    income = income + transaction.amount
                } else if (transaction.transactionType === 'Expense') {
            expense = expense + transaction.amount

    }
})      
        setMonthlyTransactions(currentMonthTransactions)
        setTotalIncome(income)
        setTotalExpenses(expense)
        setBalance(income - expense)
        }
        fetchTransaction()
    }, [])

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashbaord</h1>

                <button onClick={() => navigate('transactions/new')}>+ Add Transaction</button>
            </div>

        <section className="cardSec">
                <div className="card">
                    <p className="card-title">Income</p>
                    <h2>{totalIncome.toFixed(3)} BHD</h2>
                </div>
            
                <div className="card">
                    <p className="card-title">Expenses</p>
                    <h2>{totalExpenses.toFixed(3)} BHD</h2>
                </div>
            
                <div className="card">
                    <p className="card-title">Balance</p>
                    <h2>{balance.toFixed(3)} BHD</h2>
                </div>
        </section>

        <section className="monthly-section">
            <div className="monthlyCard">
                <h3>Monthly Cash Flow</h3>
            </div>
        </section>
        </div>
        
    )
}

export default Dashboard