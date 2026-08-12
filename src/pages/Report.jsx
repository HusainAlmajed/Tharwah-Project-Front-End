import { useState, useEffect } from "react"
import * as transactionService from "../services/transaction"
import * as categoryService from "../services/category"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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
    const [chartData, setChartData] = useState([])

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

    useEffect(() => {
        if (reportType === "Monthly" && selectedMonth !== "" && selectedYear !== "") {
            const data = [
                { name: "1-7", Income: 0, Expenses: 0 },
                { name: "8-14", Income: 0, Expenses: 0 },
                { name: "15-21", Income: 0, Expenses: 0 },
                { name: "22-28", Income: 0, Expenses: 0 },
                { name: "29-31", Income: 0, Expenses: 0 }
            ]

            transactions.map((transaction) => {
                const transactionDate = new Date(transaction.date)

                if (
                    transactionDate.getMonth().toString() === selectedMonth &&
                    transactionDate.getFullYear().toString() === selectedYear
                ) {
                    const day = transactionDate.getDate()
                    let week = 0

                    if (day >= 8 && day <= 14) {
                        week = 1
                    } else if (day >= 15 && day <= 21) {
                        week = 2
                    } else if (day >= 22 && day <= 28) {
                        week = 3
                    } else if (day >= 29) {
                        week = 4
                    }

                    if (transaction.transactionType === "Income") {
                        data[week].Income = data[week].Income + transaction.amount
                    } else if (transaction.transactionType === "Expense") {
                        data[week].Expenses = data[week].Expenses + transaction.amount
                    }
                }
            })

            setChartData(data)
        } else if (reportType === "Yearly" && selectedYear !== "") {
            const data = [
                { name: "Jan", Income: 0, Expenses: 0 },
                { name: "Feb", Income: 0, Expenses: 0 },
                { name: "Mar", Income: 0, Expenses: 0 },
                { name: "Apr", Income: 0, Expenses: 0 },
                { name: "May", Income: 0, Expenses: 0 },
                { name: "Jun", Income: 0, Expenses: 0 },
                { name: "Jul", Income: 0, Expenses: 0 },
                { name: "Aug", Income: 0, Expenses: 0 },
                { name: "Sep", Income: 0, Expenses: 0 },
                { name: "Oct", Income: 0, Expenses: 0 },
                { name: "Nov", Income: 0, Expenses: 0 },
                { name: "Dec", Income: 0, Expenses: 0 }
            ]

            transactions.map((transaction) => {
                const transactionDate = new Date(transaction.date)

                if (transactionDate.getFullYear().toString() === selectedYear) {
                    const month = transactionDate.getMonth()

                    if (transaction.transactionType === "Income") {
                        data[month].Income = data[month].Income + transaction.amount
                    } else if (transaction.transactionType === "Expense") {
                        data[month].Expenses = data[month].Expenses + transaction.amount
                    }
                }
            })

            setChartData(data)
        } else {
            setChartData([])
        }
    }, [transactions, selectedMonth, selectedYear, reportType])

    const periodSelected = reportType === "Monthly" ? selectedMonth !== "" && selectedYear !== "" : selectedYear !== ""
    const categoryTypeTotal = categoryView === "Expense" ? expense : income

    return (
        <div className="report">
            <div className="report-top">
                <div className="report-header">
                    <h1>Reports</h1>
                    <p>Overview of your financial performance</p>
                </div>

                <div className="report-filters">
                    <div className="report-filter">
                        <label>View</label>
                        <div className="report-toggle">
                            <button className={reportType === "Monthly" ? "active" : ""} type="button" onClick={() => setReportType("Monthly")}>Monthly</button>
                            <button className={reportType === "Yearly" ? "active" : ""} type="button" onClick={() => setReportType("Yearly")}>Yearly</button>
                        </div>
                    </div>

                    {reportType === "Monthly" ? (
                        <div className="report-period-controls">
                            <div className="report-filter">
                                <label>Month</label>
                                <select className="report-select" value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)}>
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

                            <div className="report-filter">
                                <label>Year</label>
                                <input className="report-input" type="Number" value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)} placeholder="2026" />
                            </div>
                        </div>
                    ) : (
                        <div className="report-period-controls">
                            <div className="report-filter">
                                <label>Year</label>
                                <input className="report-input" type="Number" value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)} placeholder="2026" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {periodSelected ? (
                hasTransactions ? (
                    <div>
                        <div className="report-summary">
                            <div className="report-summary-card income-summary">
                                <div className="summary-card-top">
                                    <p>Income</p>
                                    <span className="summary-icon income-icon">↗</span>
                                </div>
                                <h2>{income} BHD</h2>
                            </div>

                            <div className="report-summary-card expense-summary">
                                <div className="summary-card-top">
                                    <p>Expenses</p>
                                    <span className="summary-icon expense-icon">↓</span>
                                </div>
                                <h2>{expense} BHD</h2>
                            </div>

                            <div className="report-summary-card balance-summary">
                                <div className="summary-card-top">
                                    <p>Balance</p>
                                    <span className="summary-icon balance-icon">▣</span>
                                </div>
                                <h2>{balance} BHD</h2>
                            </div>
                        </div>

                        <div className="report-grid">
                            <div className="report-chart-card">
                                <h2>Income vs Expenses</h2>

                                <div className="chart-legend">
                                    <span><span className="legend-line income-legend"></span>Income</span>
                                    <span><span className="legend-line expense-legend"></span>Expenses</span>
                                </div>

                                <div className="chart-wrap">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#5aad75" stopOpacity={0.30} />
                                                    <stop offset="95%" stopColor="#5aad75" stopOpacity={0} />
                                                </linearGradient>

                                                <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#f16c64" stopOpacity={0.25} />
                                                    <stop offset="95%" stopColor="#f16c64" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>

                                            <CartesianGrid vertical={false} stroke="#edf1ee" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                            <YAxis axisLine={false} tickLine={false} width={45} />
                                            <Tooltip />

                                            <Area type="monotone" dataKey="Income" stroke="#5aad75" strokeWidth={3} fill="url(#incomeFill)" />
                                            <Area type="monotone" dataKey="Expenses" stroke="#f16c64" strokeWidth={3} fill="url(#expenseFill)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="report-category-card">
                                <div className="category-card-top">
                                    <h2>{categoryView === "Expense" ? "Expenses by category" : "Income by category"}</h2>

                                    <div className="category-toggle">
                                        <button className={categoryView === "Expense" ? "active" : ""} type="button" onClick={() => setCategoryView("Expense")}>Expenses</button>
                                        <button className={categoryView === "Income" ? "active" : ""} type="button" onClick={() => setCategoryView("Income")}>Income</button>
                                    </div>
                                </div>

                                {categories.filter((category) => {
                                    return category.type === categoryView
                                }).map((category) => {
                                    let categoryTotal = 0

                                    transactions.map((transaction) => {
                                        const transactionDate = new Date(transaction.date)

                                        if (
                                            transaction.transactionType === categoryView &&
                                            transaction.category === category._id
                                        ) {
                                            if (
                                                reportType === "Monthly" &&
                                                transactionDate.getMonth().toString() === selectedMonth &&
                                                transactionDate.getFullYear().toString() === selectedYear
                                            ) {
                                                categoryTotal = categoryTotal + transaction.amount
                                            } else if (
                                                reportType === "Yearly" &&
                                                transactionDate.getFullYear().toString() === selectedYear
                                            ) {
                                                categoryTotal = categoryTotal + transaction.amount
                                            }
                                        }
                                    })

                                    if (categoryTotal > 0) {
                                        let categoryPercentage = 0

                                        if (categoryTypeTotal > 0) {
                                            categoryPercentage = Math.round((categoryTotal / categoryTypeTotal) * 100)
                                        }

                                        return (
                                            <div key={category._id} className="report-category-row">
                                                <div className="category-name">
                                                    <span className="category-icon">{category.name.slice(0, 1)}</span>
                                                    <p>{category.name}</p>
                                                </div>

                                                <div className="category-progress">
                                                    <div className="category-progress-fill" style={{ width: `${categoryPercentage}%` }}></div>
                                                </div>

                                                <p className="category-percent">{categoryPercentage}%</p>
                                                <p className="category-amount">{categoryTotal} BHD</p>
                                            </div>
                                        )
                                    }

                                    return null
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="no-transactions">
                        {reportType === "Monthly" ? "There are no transactions in this month" : "There are no transactions in this year"}
                    </p>
                )
            ) : null}
        </div>
    )
}

export default Report