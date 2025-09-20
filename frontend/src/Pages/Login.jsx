import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../Slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [form,setForm] = useState({uname:"",pass:""})
    const dispatch = useDispatch()
    const {user,token,loading,error} = useSelector((state)=>state.auth)

    const handleSubmit =(e)=>{
        e.preventDefault()
        dispatch(loginUser(form))
    }
    const navigate=useNavigate()
    useEffect(()=>{
        if(token){
            navigate("/home")
        }
    },[token,navigate])

  return (
    <>
        <h1>Login Page</h1>

        <form onSubmit={handleSubmit}>

            <input type="text" placeholder='Username' onChange={(e)=>setForm({...form,uname:e.target.value})} value={form.uname} />
            <input type="text" placeholder='Password' onChange={(e)=>setForm({...form,pass:e.target.value})} value={form.pass} />

            <button type='submit' disabled={loading}>Submit</button>

        </form>

        {error && <p style={{color:"red"}}>{JSON.stringify(error)}</p>}

        {token && <p>welcome{user?.username}!</p>}


    </>
  )
}

export default Login