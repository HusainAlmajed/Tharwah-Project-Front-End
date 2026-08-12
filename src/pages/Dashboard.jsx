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
const [biggestInflow, setBiggestInflow] = useState(0)
const [biggestOutflow, setBiggestOutflow] = useState(0)
const [monthlyChange, setMonthlyChange] = useState(0)
const [mostUsedCategory, setMostUsedCategory] = useState('')
const [topCategories, setTopCategories] = useState([])

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
            data.map((transaction) => {
                
                if (transaction.transactionType === 'Income') {
                    income = income + transaction.amount
                } else if (transaction.transactionType === 'Expense') {
            expense = expense + transaction.amount

    }
})      

            let monthlyIncome = 0
            let monthlyExpense = 0
            let biggestIncome = 0
            let biggestExpense = 0

            currentMonthTransactions.map((transaction) => {

                if (transaction.transactionType === 'Income') {
                    monthlyIncome = monthlyIncome + transaction.amount

                    if (transaction.amount > biggestIncome) {
                        biggestIncome = transaction.amount
                    }

                } else if (transaction.transactionType === 'Expense') {
                    monthlyExpense = monthlyExpense + transaction.amount

                    if (transaction.amount > biggestExpense) {
                        biggestExpense = transaction.amount
                    }
                }
            })

            let categoryTotals = []

            currentMonthTransactions.map((transaction) => {
                const categoryName = transaction.category?.name

                if (categoryName) {
                    const category = categoryTotals.find((category) => category.name === categoryName)

                    if (category) {
                        category.amount = category.amount + transaction.amount
                    } else {
                        categoryTotals.push({
                            name: categoryName,
                            amount: transaction.amount
                        })
                    }
                }
            })

            let totalCategoryAmount = 0

            categoryTotals.map((category) => {
                totalCategoryAmount = totalCategoryAmount + category.amount
            })

            categoryTotals.map((category) => {
                category.percentage = Math.round((category.amount / totalCategoryAmount) * 100)
            })

            categoryTotals.sort((a, b) => b.amount - a.amount)

            const topThreeCategories = categoryTotals.slice(0, 3)

        setMonthlyTransactions(currentMonthTransactions)
        setBiggestInflow(biggestIncome)
        setBiggestOutflow(biggestExpense)
        setMonthlyChange(monthlyIncome - monthlyExpense)
        setTopCategories(topThreeCategories)

        if (topThreeCategories.length > 0) {
            setMostUsedCategory(topThreeCategories[0].name)
        }

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
                    <p className="card-title">Total Income</p>
                    <h2>{totalIncome} BHD</h2>
                </div>
            
                <div className="card">
                    <p className="card-title">Total Expenses</p>
                    <h2>{totalExpenses} BHD</h2>
                </div>
            
                <div className="card">
                    <p className="card-title">Balance</p>
                    <h2>{balance} BHD</h2>
                </div>
        </section>
        
        <section className="monthly-section">
            <div className="monthlyCard">
                <h3>Monthly Cash Flow</h3>
                <p>A timeline of your cash flow this month</p>
                
                <div className="monthly-content">
                <div className="monthly-transactions">
                    {monthlyTransactions.map((transaction) => (
                        <div className="monthly-transaction" key={transaction._id}>
                            <div>
                                <h4>{transaction.name}</h4>
                                <p>{transaction.transactionType} • {transaction.category?.name}</p>
                                </div>
                                <p className={transaction.transactionType === 'Income' ? 'monthly-income' : 'monthly-expense'}>
                                    {transaction.transactionType === 'Income' ? '+' : '-'} {transaction.amount} BHD
                                    </p>
                                    </div>
                                ))}
                                </div>

                <div className="monthly-glance">
                    <h3>This month at a glance</h3>

                    <div className="glance-row">
                        <p>Biggest inflow</p>
                        <p className="monthly-income">+ {biggestInflow} BHD</p>
                    </div>

                    <div className="glance-row">
                        <p>Biggest outflow</p>
                        <p className="monthly-expense">- {biggestOutflow} BHD</p>
                    </div>

                    <div className="glance-row">
                        <p>Net change</p>
                        <p className={monthlyChange >= 0 ? 'monthly-income' : 'monthly-expense'}>
                            {monthlyChange >= 0 ? '+' : ''} {monthlyChange} BHD
                        </p>
                    </div>

                    <div className="glance-row">
                        <p>Most used category</p>
                        <p>{mostUsedCategory}</p>
                    </div>

                    <h3 className="top-categories-title">Top 3 categories this month</h3>

                    <div className="top-categories">
                        {topCategories.map((category) => (
                            <div className="top-category-row" key={category.name}>
                                <div className="top-category-info">
                                    <p>{category.name}</p>
                                    <p>{category.percentage}% • {category.amount} BHD</p>
                                </div>

                                <div className="top-category-bar">
                                    <div className="top-category-fill" style={{ width: `${category.percentage}%` }}></div>
                                </div>
                                </div>
                        ))}
                        </div>
                    </div>
                </div>

                </div>
                </section>
                </div> 
    )
}

export default Dashboard