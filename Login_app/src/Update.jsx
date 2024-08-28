import axios from 'axios'
import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

const Update = () => {
    const {id} = useParams()
    const [name, setName ]= useState("")
    const [email, setEmail ]= useState("")
    const [password, setPassword]= useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put(`http://127.0.0.1:3000/users/${id}`, {name, email, password}).then((result) => {
            navigate("/users")        
        }).catch(err => console.log(err))

    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/user${id}`).then((result) => {
            const {name, email, password} = result.data
            setName(name)
            setEmail(email)
            setPassword(password)
        }).catch(err => console.log(err))
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-100 w-sm-75 w-md-50 w-lg-25">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input 
                        type="text" 
                        placeholder="Enter Name" 
                        name="name" 
                        className="form-control rounded-0" 
                        value={name} 
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
                        value={email} 
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
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">Update</button>
            </form>
        </div>
    </div>
    
    )
}

export default Update