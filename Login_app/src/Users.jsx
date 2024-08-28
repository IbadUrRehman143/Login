import { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])
    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:3000/users/${id}`).then(() => {
            window.location.reload()
        }).catch((err) => console.log(err))  
    }
  useEffect(() => {
    axios.get("http://127.0.0.1:3000/").then((result) => {
        console.log(result.data)
        setUsers(result.data)
    }).catch(err => console.log(err))
  }, [])
    return (
    <div className='d-flex justify-content-center align-items-center bg-primary-subtle vh-100'>
       <div className='bg-white p-3 rounded w-50'>
            <h1 className='text-center text-uppercase fw-bold '>Users</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link className='btn btn-info text-decoration-none' to={`/update/${user._id}`}>update</Link>
                                    <button className='btn btn-info m-3' onClick={() => handleDelete(user._id)}>delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
       </div>
    </div>
  )
}

export default Users