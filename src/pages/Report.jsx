import { useState, useEffect } from "react"
import * as transactionService from "../services/transaction"
import * as categoryService from "../services/category"

const Report = () => {
    const [reportType, setReportType] = useState("Monthly")
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const [transactions, setTransactions] = useState([])
    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)
    const [balance, setBalance] = useState(0)
    const [hasTransactions, setHasTransactions] = useState(false)
    const [categoryView, setCategoryView] = useState("Expense")
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchTransactions = async () => {
            const data = await transactionService.index()
            setTransactions(data)
        }

        fetchTransactions()
    }, [])

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await categoryService.index()
            setCategories(data)
        }

        fetchCategories()
    }, [])

    useEffect(() => {
        if (reportType === "Monthly" && selectedMonth !== "" && selectedYear !== "") {
            let totalIncome = 0
            let totalExpense = 0
            let foundTransaction = false

            transactions.map((transaction) => {
                const transactionDate = new Date(transaction.date)

                if (
                    transactionDate.getMonth().toString() === selectedMonth &&
                    transactionDate.getFullYear().toString() === selectedYear
                ) {
                    foundTransaction = true

                    if (transaction.transactionType === "Income") {
                        totalIncome = totalIncome + transaction.amount
                    } else if (transaction.transactionType === "Expense") {
                        totalExpense = totalExpense + transaction.amount
                    }
                }
            })

            setIncome(totalIncome)
            setExpense(totalExpense)
            setBalance(totalIncome - totalExpense)
            setHasTransactions(foundTransaction)
        }
    }, [transactions, selectedMonth, selectedYear, reportType])

    useEffect(() => {
        if (reportType === "Yearly" && selectedYear !== "") {
            let totalIncome = 0
            let totalExpense = 0
            let foundTransaction = false
            
            transactions.map((transaction) => {
                const transactionDate = new Date(transaction.date)
                
                if (transactionDate.getFullYear().toString() === selectedYear) {
                    foundTransaction = true
                    
                    if (transaction.transactionType === "Income") {
                        totalIncome = totalIncome + transaction.amount
                    } else if (transaction.transactionType === "Expense") {
                        totalExpense = totalExpense + transaction.amount
                    }
                }
            })

            setIncome(totalIncome)
            setExpense(totalExpense)
            setBalance(totalIncome - totalExpense)
            setHasTransactions(foundTransaction)
        }
    }, [transactions, selectedYear, reportType])

    return (
        <div>
            <h1>Reports</h1>
            <p>Test</p>
            
            <div>
                <label>View</label>
                <button type="button" onClick={() => setReportType("Monthly")}>Monthly</button>
                <button type="button" onClick={() => setReportType("Yearly")}>Yearly</button>
            </div>
            
            {reportType === "Monthly" ? (
                <div>
                    <div className="form-field">
                        <label>Month</label>
                        
                        <select value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)}>
                            <option value="">Select Month</option>
                            <option value="0">January</option>
                            <option value="1">February</option>
                            <option value="2">March</option>
                            <option value="3">April</option>
                            <option value="4">May</option>
                            <option value="5">June</option>
                            <option value="6">July</option>
                            <option value="7">August</option>
                            <option value="8">September</option>
                            <option value="9">October</option>
                            <option value="10">November</option>
                            <option value="11">December</option>
                            </select>
                            </div>
                            
                            <div className="form-field">
                                <label>Year</label>
                                <input type="Number" value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)} placeholder="2026" />
                                </div>
                                
                                {selectedMonth !== "" && selectedYear !== "" ? (
                                    hasTransactions ? (
                                    <div>
                                        <div className="cardSec">
                                            <div className="card">
                                                <p className="card-title">Income</p>
                                                <h2>{income}</h2>
                                    </div>

                                    <div className="card">
                                        <p className="card-title">Expenses</p>
                                        <h2>{expense}</h2>
                                    </div>

                                    <div className="card">
                                        <p className="card-title">Balance</p>
                                        <h2>{balance}</h2>
                                    </div>
                                </div>

                                <div className="category-card">
                                    <button type="button" onClick={() => setCategoryView("Expense")}>Expenses</button>
                                    <button type="button" onClick={() => setCategoryView("Income")}>Income</button>

                                    <h2>{categoryView === "Expense" ? "Expenses by category" : "Income by category"}</h2>

                                    {categories.filter((category) => {
                                        return category.type === categoryView
                                    }).map((category) => {
                                        let categoryTotal = 0

                                        transactions.map((transaction) => {
                                            const transactionDate = new Date(transaction.date)

                                            if (
                                                transactionDate.getMonth().toString() === selectedMonth &&
                                                transactionDate.getFullYear().toString() === selectedYear &&
                                                transaction.transactionType === categoryView &&
                                                transaction.category === category._id
                                            ) {
                                                categoryTotal = categoryTotal + transaction.amount
                                            }
                                        })

                                        return (
                                            <div key={category._id}>
                                                <p>{category.name}</p>
                                                <p>{categoryTotal}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : (
                            <p>There are no transactions in this month</p>
                        )
                    ) : null}
                </div>
            ) : (
                <div className="form-field">
                    <label>Year</label>
                    <input type="Number" value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)} placeholder="2026" />

                    {selectedYear !== "" ? (
                        hasTransactions ? (
                            <div>
                                <div className="cardSec">
                                    <div className="card">
                                        <p className="card-title">Income</p>
                                        <h2>{income}</h2>
                                    </div>

                                    <div className="card">
                                        <p className="card-title">Expenses</p>
                                        <h2>{expense}</h2>
                                    </div>

                                    <div className="card">
                                        <p className="card-title">Balance</p>
                                        <h2>{balance}</h2>
                                    </div>
                                </div>

                                <div className="category-card">
                                    <button type="button" onClick={() => setCategoryView("Expense")}>Expenses</button>
                                    <button type="button" onClick={() => setCategoryView("Income")}>Income</button>

                                    <h2>{categoryView === "Expense" ? "Expenses by category" : "Income by category"}</h2>

                                    {categories.filter((category) => {
                                        return category.type === categoryView
                                    }).map((category) => {
                                        let categoryTotal = 0

                                        transactions.map((transaction) => {
                                            const transactionDate = new Date(transaction.date)

                                            if (
                                                transactionDate.getFullYear().toString() === selectedYear &&
                                                transaction.transactionType === categoryView &&
                                                transaction.category === category._id
                                            ) {
                                                categoryTotal = categoryTotal + transaction.amount
                                            }
                                        })

                                        return (
                                            <div key={category._id}>
                                                <p>{category.name}</p>
                                                <p>{categoryTotal}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : (
                            <p>There are no transactions in this year</p>
                        )
                    ) : null}
                </div>
            )}
        </div>
    )
}

export default Report