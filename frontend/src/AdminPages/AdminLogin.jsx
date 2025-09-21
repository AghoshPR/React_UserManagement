import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {

    const [form,setForm] = useState({adminName:"",adminPass:""})

    const [error,setError]=useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{

            const res = await axios.post("http://127.0.0.1:8000/api/myadmin/adminLogin/",form)
            localStorage.setItem('adminToken',res.data.access)
            navigate('/adminHome')

        }catch(err){
            setError(err.response.data.error)
        }
    }


  return (
    <>
        <h1>Admin Login</h1>

        <form onSubmit={handleSubmit}>

            <input type="text" placeholder='Username' value={form.adminName} onChange={(e)=>setForm({...form,adminName:e.target.value})} />

            <input type="password" placeholder='Password' value={form.adminPass} onChange={(e)=>setForm({...form,adminPass:e.target.value})} />

            <button type='submit'>Login</button>

        </form>
        {error && <p style={{color:"red"}}>{error}</p>}


    </>
  )
}

export default AdminLogin