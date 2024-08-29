import React, { useState } from 'react'
import {Link}  from "react-router-dom"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [name, setName ]= useState()
    const [email, setEmail ]= useState()
    const [password, setPassword]= useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:3000/signup', {name, email, password})
        .then(result => {
            console.log(result.data)
            navigate("/users")        
        })
        .catch(err=> console.log(err))
    }

  return (
    <>

<div className='bg-secondary'>
    <div className="container d-flex justify-content-center align-items-center  vh-100">
        <div className="bg-white p-3 rounded w-50 ">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input 
                        type="text" 
                        placeholder="Enter Name" 
                        name="name" 
                        className="form-control rounded-0" 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter Email" 
                        autoComplete="off" 
                        className="form-control rounded-0" 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter Password" 
                        className="form-control rounded-0" 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
            </form>
            <p>Already Have An Account?</p>
            <Link 
                to="/login" 
                className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            >
                Login
            </Link>
        </div>
    </div>
</div>




    </>
  )
}

export default Signup