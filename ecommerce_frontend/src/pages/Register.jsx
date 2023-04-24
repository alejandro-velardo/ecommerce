import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import GlobalContext from "../context/GlobalContext"


export const Register = () => {

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    errors: {
      name: [],
      email: [],
      password: [],
      repeatPassword: []
    }
  })

  const { token, setToken, user, setUser } = useContext(GlobalContext)
  const navigate  = useNavigate()

  const validate = (field, value) => {

    let errors = [...newUser.errors[field]];

    switch (field) {
      case "name":
        if (!value) {
          errors.push("Enter name")
        }
        break
      case "email":
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          errors.push("Invalid email address");
        }
        break
      case "password":
        if (value.length < 8) {
          errors.push("Password must be at least 8 characters long");
        }
        break
      case "repeatPassword":
        if (newUser.password !== newUser.repeatPassword) {
          errors.push("Passwords do not match");
        }
        break
      default:
        break
    }

    setNewUser((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [field]: errors,
      },
    }))
  }


  const handleChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setNewUser((prevState) => ({
      ...prevState,
      errors: {
        ...prevState,
        name: [],
        email: [],
        password: [],
        repeatPassword: []
      },
    }))
  };

  const handleSubmit = (event) => {

    event.preventDefault()

    validate("name", newUser.name)
    validate("email", newUser.email)
    validate("password", newUser.password)
    validate("repeatPassword", newUser.repeatPassword)


    if (!newUser.errors.email.lentgh > 0 && !newUser.errors.password.lentgh > 0) {
      const options = {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          password:  newUser.password,
          repeatPassword: newUser.repeatPassword
        })
      }

      fetch("http://localhost:3050/api/clients/register", options)
        .then(res => res.json())
        .then(res => navigate("/login"))
        .catch(error => console.error(error))
    }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <div className='auth-form'>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              autoComplete="on"
              type="password"
              name="repeatPassword"
              onChange={handleChange}
              placeholder="Repeat password"
            />
          </Form.Group>

          <div className='auth-button'>
            <Button onClick={(e) => handleSubmit(e)} variant="outline-dark" type="submit">
              Submit
            </Button>
          </div>
        </Form>
        {newUser.errors.name
          ? (newUser.errors.name.map((error, index) => (
            <div className="form-error" key={index}>{error}</div>
          )))
          : (' ')
        }
        {newUser.errors.username
          ? (newUser.errors.username.map((error, index) => (
            <div className="form-error" key={index}>{error}</div>
          )))
          : (' ')
        }
        {newUser.errors.email
          ? (newUser.errors.email.map((error, index) => (
            <div className="form-error" key={index}>{error}</div>
          )))
          : (' ')
        }
        {newUser.errors.password
          ? (newUser.errors.password.map((error, index) => (
            <div className="form-error" key={index}>{error}</div>
          )))
          : (' ')
        }
        {newUser.errors.repeatPassword
          ? (newUser.errors.repeatPassword.map((error, index) => (
            <div className="form-error" key={index}>{error}</div>
          )))
          : (' ')
        }
        <span>
          Do you have an account? <Link to="/login">Log In</Link>
        </span>
      </div>
    </div>
  )
}

export default Register