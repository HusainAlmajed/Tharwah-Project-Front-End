import { useNavigate } from "react-router"
import { useState } from "react"
import { signIn } from "../services/auth"

const SignInForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        loginType: 'username',
        login: '',
        password: '',
    }
    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setMessage('')
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            let loginData
            if (formData.loginType === 'email') {
                loginData = {
                    email: formData.login,
                    password: formData.password
                }
            } else {
                loginData = {
                    username: formData.login,
                    password: formData.password
                }
            }

            const signedInUser = await signIn(loginData)
            props.setUser(signedInUser)
            setFormData(initialState)
            navigate('/')
        } catch(err) {
            setMessage(err.message)
        }
    }

    let loginLabel = 'Username:'
    let loginInputType = 'text'

    if (formData.loginType === 'email') {
        loginLabel = 'Email:'
        loginInputType = 'email'
    }

    return(
        <section className="card">
            <header>
            <h1>Sign In</h1>
            <p className="error">{message}</p>
            </header>

            <form onSubmit={handleSubmit}>
                Sign in with:
                <select name="loginType" value={formData.loginType} onChange={handleChange}>
                    <option value="username">Username</option>
                    <option value="email">Email</option>
                </select>

                {loginLabel}
                <input type={loginInputType} name="login" value={formData.login} required onChange={handleChange} />

                Password:
                <input type="password" name="password" value={formData.password} required onChange={handleChange} />
                <div className="actions">
                    <button type="submit">Sign In</button>
                    <button type="button" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </section>
    )
}

export default SignInForm