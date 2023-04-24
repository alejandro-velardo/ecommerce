import React, { useContext, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'
import GlobalContext from "../context/GlobalContext"
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

import Error from './Error'

const API_URL = "http://localhost:3050/api/"

export const Profile = () => {

    const { user, token, setUser, setToken, error, setError } = useContext(GlobalContext)
    const navigate = useNavigate()

    const getclientInfo = (idClient) => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
        };


        fetch(`${API_URL}clients/${idClient}`, requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.ok == true) {     
                    setUser((prevUser) => ({
                        ...prevUser,
                        email: response.data.email,
                        name: response.data.name,
                        adress: response.data.adress,
                        town: response.data.town,
                        postal_code: response.data.postal_code,
                        errors: {
                            ...prevUser,
                            email: [],
                            password: []
                        },
                    })
                    )
                } else {
                    setError(response.error)
                    setToken("")
                    localStorage.removeItem('authToken')
                    navigate("/error")
                }
            }
            )
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        const tk = localStorage.getItem('authToken')
        if (tk) {
            setToken(tk)
        }
    }, [])

    useEffect(() => {
        if (token) {
            const decoded = jwt_decode(token)
            localStorage.setItem('authToken', token)
            getclientInfo(user.idClient)
        } else {
            setUser(
                (prevUser) => ({
                    ...prevUser,
                    email: ''
                }))
        }
    }, [token])

    if (!token) {
        setError("You need to log in to access your profile")
        return <Error />
    }

    if (!user.name) {
        return <h3 className='mt-4'>Loading...</h3>;
    }


    return (
        <div className='profile'>
            <h1>Profile</h1>
            <div className='profile-card'>
                <Card border="dark" style={{ width: '24rem' }}>
                    <Card.Header >Personal Information</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div className='personal-info'>
                                <div className='personal-info-line'>
                                    <span>Name:</span>
                                    <span>{user.name}</span>
                                </div>
                                <div className='personal-info-line'>
                                    <span>Email:</span>
                                    <span>{user.email}</span>
                                </div>
                                <div className='personal-info-buttons'>
                                    <Button variant="outline-dark" className='profile-button'>Change Password</Button>
                                    <Button variant="outline-dark" className='profile-button'>Edit Information</Button>
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Header className="profile-header">Shipping Info</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {
                                (user.adress || user.town || user.postal_code)
                                    ? (
                                        <div className='shipping-info'>
                                            <div className='shipping-info-line'>
                                                <span>Town:</span>
                                                <span>{user.town ? (user.town) : ("Not informed")}</span>
                                            </div>
                                            <div className='shipping-info-line'>
                                                <span>Adress:</span>
                                                <span>{user.adress ? (user.adress) : ("Not informed")}</span>
                                            </div>
                                            <div className='shipping-info-line'>
                                                <span>Postal Code:</span>
                                                <span>{user.postal_code ? (user.postal_code) : ("Not informed")}</span>
                                            </div>
                                            <div className='shipping-info-buttons'>
                                                <Button variant="outline-dark" className='profile-button'>Edit Information</Button>
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <div className='shipping-info-none'>
                                            <div>
                                                <span>No shipping Info</span>
                                            </div>
                                            <div className='shipping-info-line-none'>
                                                <Button variant="outline-dark" className='profile-button'>Add Shipping Info</Button>
                                            </div>
                                        </div>
                                    )
                            }
                        </Card.Text>
                    </Card.Body>

                </Card>
            </div>
        </div>
    )
}


export default Profile