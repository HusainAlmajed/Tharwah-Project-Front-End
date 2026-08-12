import { useNavigate } from "react-router"
import { useState , useEffect } from "react"
import { signIn } from "../services/auth"

const SignInForm = (props) => {

    useEffect(() => {
        document.title = "Sign In"
    }, [])

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
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-header">
                    <h1>Sign In</h1>
                    <p>Welcome back to Tharwah</p>
                </div>

                <div className="auth-toggle">
                    <button type="button" className={formData.loginType === 'username' ? 'active' : ''} onClick={() => setFormData({...formData, loginType: 'username'})}>Username</button>
                    <button type="button" className={formData.loginType === 'email' ? 'active' : ''} onClick={() => setFormData({...formData, loginType: 'email'})}>Email</button>
                </div>

                <div className="auth-field">
                    <label>{loginLabel}</label>
                    <div className="auth-input">
                        <input type={loginInputType} name="login" value={formData.login} required onChange={handleChange} placeholder={formData.loginType === 'email' ? 'Enter your email' : 'Enter your username'} />
                    </div>
                </div>

                <div className="auth-field">
                    <label>Password:</label>
                    <div className="auth-input">
                        <input type="password" name="password" value={formData.password} required onChange={handleChange} placeholder="Enter your password" />
                    </div>
                </div>

                <p className="auth-error">{message}</p>

                <button className="auth-submit" type="submit">Sign In</button>

                <p className="auth-switch">Don't have an account? <span onClick={() => navigate('/sign-up')}>Sign Up</span></p>
            </form>
        </div>
    )
}

export default SignInForm