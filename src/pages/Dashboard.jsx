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

    useEffect(() => {
        const fetchTransaction = async () => {
            const data =  await transactionService.index()
            setTransactions(data)
            console.log("data" , data)
            // console.log("data" , data)
            // setTotal(data.amount)

            let income = 0
            let expense = 0

            data.map((transaction) => {
                if (transaction.transactionType === 'Income') {
                    income = income + transaction.amount
                }else if (transaction.transactionType === 'Expense') {
                    expense = expense + transaction.amount
                }
            })
        setTotalIncome(income)
        setTotalExpenses(expense)
        setBalance(income - expense)
        console.log(income)
        console.log(totalIncome)
        }
        fetchTransaction()
    }, [])

    return (
        <div className="dashboard">
            <button onClick={() => navigate('transactions/new')}>+ Add Transaction</button>
        <section className="cardSec">
            Income
                <div className="card">
                        <p>${totalIncome}</p>
                </div>
            Expenses
                <div className="card">
                        <p>${totalExpenses}</p>
                </div>
            Balance
                <div className="card">
                        <p>${balance}</p>
                </div>
        </section>

        <section>
            Monthly Cash Flow
            <div className="monthlyCard">
            </div>
        </section>
        </div>
        
    )
}

export default Dashboard