import { useState } from "react"
import { signUp } from "../services/auth"
import { useNavigate } from "react-router"

const SignUpForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const newUser = await signUp(formData)
            props.setUser(newUser)
            setFormData(initialState)
            navigate('/')
        } catch (err) {
            setMessage(err.message)
        }
    }

    const isFormValid = () => {
        if(formData.username && formData.email && formData.password.length > 6 && formData.password === formData.confirmPassword) {
            return true
        } else return false
    }

       return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-header">
                    <h1>Sign Up</h1>
                    <p>Create your Tharwah account</p>
                </div>

                <div className="auth-field">
                    <label>Username:</label>
                    <div className="auth-input">
                        <input type="text" name="username" onChange={handleChange} value={formData.username} placeholder="Enter your username" required />
                    </div>
                </div>

                <div className="auth-field">
                    <label>Email:</label>
                    <div className="auth-input">
                        <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Enter your email" required />
                    </div>
                </div>

                <div className="auth-field">
                    <label>Password:</label>
                    <div className="auth-input">
                        <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Enter your password" minLength={7} required />
                    </div>
                </div>

                <div className="auth-field">
                    <label>Confirm Password:</label>
                    <div className="auth-input">
                        <input type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} placeholder="Confirm your password" minLength={7} required />
                    </div>
                </div>

                <p className="auth-error">{message}</p>

                <button className="auth-submit" type="submit" disabled={!isFormValid()}>Sign Up</button>

                <p className="auth-switch">Already have an account? <span onClick={() => navigate('/sign-in')}>Sign In</span></p>
            </form>
        </div>
    )
}

export default SignUpForm

