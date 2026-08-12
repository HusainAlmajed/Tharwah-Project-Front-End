import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route } from "react-router"
import { useState } from "react"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import TransactionForm from "./pages/TransactionForm"
import CategoryForm from "./pages/CategoryForm"
import * as transactionServices from "./services/transaction"
import * as categoryServices from "./services/category"
import TransactionList from "./pages/TransactionList"
import TransactionDetails from "./pages/TransactionDetails"
import Report from "./pages/Report"
import CategoryDetails from "./pages/CategoryDetails"
import NotFound from "./pages/NotFound"

const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [user, setUser] = useState(getUserFromToken())
  
  return (
    <div className="app-layout">
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
        <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
        <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
        <Route path="/transactions/new" element={<TransactionForm transactionServices={transactionServices} categoryServices={categoryServices} />} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="/transactions/:transactionId" element={<TransactionDetails transactionServices={transactionServices} />} />
        <Route path="/categories/new" element={<CategoryForm categoryServices={categoryServices} />} />
        <Route path="/transactions/:transactionId/edit" element={<TransactionForm transactionServices={transactionServices} categoryServices={categoryServices} />} />
        <Route path="/categories/:categoryId/edit" element={<CategoryForm categoryServices={categoryServices} />} />
        <Route path="/categories/:categoryId" element={<CategoryDetails />} />
        <Route path="/report" element={<Report />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
    </div>
  )
}

export default App