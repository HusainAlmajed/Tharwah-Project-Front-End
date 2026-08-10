import { useEffect, useState } from "react"
import { index } from '../services/user'
import { useNavigate } from "react-router"

const Dashboard = (props) => {

const navigate = useNavigate()

    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData =  await index()
            setAllUsers(usersData)
        }
        fetchUsers()
    }, [])

    return (
        <div className="dashboard">
            <button onClick={() => navigate('transactions/new')}>+ Add Transaction</button>
        <section className="cardSec">
            Income
                <div className="card">
                        <p>500$</p>
                </div>
            Expenses
                <div className="card">
                        <p>300$</p>
                </div>
            Balance
                <div className="card">
                        <p>200$</p>
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