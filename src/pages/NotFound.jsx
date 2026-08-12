import { useNavigate } from "react-router"
import { useEffect } from "react"

const NotFound = () => {

    useEffect(() => {
        document.title = "Not Found"
    }, [])

    const navigate = useNavigate()

    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
    )
}

export default NotFound