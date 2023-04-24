import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import GlobalContext from "../context/GlobalContext"

export const Login = () => {

    const { token, setToken, user, setUser } = useContext(GlobalContext)
    const navigate  = useNavigate()

    const validate = (field, value) => {

        let errors = [...user.errors[field]];

        switch (field) {
            case "password":
                if (!value) {
                    errors.push("Enter password")
                }
                break
            case "email":
                if (!value) {
                    errors.push("Enter email address")
                }
                break;
            default:
                break
        }
        setUser((prevState) => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [field]: errors,
            },
        }))
    }


    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setUser((prevState) => ({
            ...prevState,
            errors: {
                ...prevState,
                email: [],
                password: []
            },
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        validate("email", user.email)
        validate("password", user.password)

        if (!user.errors.email.lentgh > 0 && !user.errors.password.lentgh > 0) {
            const options = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            }

            fetch("http://localhost:3050/api/clients/login", options)
                .then(res => res.json())
                .then(res => setToken(res.token))
                .then(res => setUser({}))
                .then(res => navigate("/"))
                .catch(error => console.error(error))
        }
    }


    return (
        <div className='auth'>
            <h1>Login</h1>
            <div className='auth-form'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            autoComplete="on"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Password" />
                    </Form.Group>
                    <div className='auth-button'>
                        <Button onClick={(e) => handleSubmit(e)} variant="outline-dark" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
                
                {user.errors.email
                    ? (user.errors.email.map((error, index) => (
                        <div className="form-error" key={index}>{error}</div>
                    )))
                    : (' ')
                }
                {user.errors.password
                    ? (user.errors.password.map((error, index) => (
                        <div className="form-error" key={index}>{error}</div>
                    )))
                    : (' ')
                }
                <span>
                    Don't you have an account? <Link to="/register">Register</Link>
                </span>
            </div>
        </div>
    )
}

export default Login