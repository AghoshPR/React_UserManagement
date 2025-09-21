import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdminHomePage = () => {

    const [users,setUsers]=useState([])
    const [error,setError]=useState(null)

    useEffect(()=>{

        const fetchUsers = async()=>{
            const token = localStorage.getItem('adminToken')

            try{
                const res = await axios.get('http://127.0.0.1:8000/api/myadmin/users/',{
                    headers:{Authorization:`Bearer ${token}`}
                })
                setUsers(res.data)
            }catch(err){
                setError("failed to fetch user")
            }

        }

        fetchUsers()

    },[])

  return (
    <>
        <h1>AdminHomePage</h1>

         {error && <p>{error}</p>}

         <ul>
            {users.map((user)=>(
                <li key={user.id}>{user.username},{user.email}</li>
            ))}
         </ul>
    
    </>
  )
}

export default AdminHomePage