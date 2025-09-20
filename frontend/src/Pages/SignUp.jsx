import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../Slices/authSlice'

const SignUp = () => {

    

    const [form,setForm] = useState({username:"",email:"",password:"",password2:""})

    const dispatch = useDispatch()

    const {loading,error}=useSelector((state)=>state.auth);

    const handleSubmit =(e)=>{
        e.preventDefault()
        dispatch(registerUser(form))
    }
    

  return (
    <>
        <h1>SignUp page</h1>

        <form onSubmit={handleSubmit}>

            <input type="text" placeholder='Username' onChange={(e)=>setForm({...form,username:e.target.value})} value={form.username} />
            <input type="text" placeholder='Email' onChange={(e)=>setForm({...form,email:e.target.value})} value={form.email} />
            <input type="text" placeholder='password' onChange={(e)=>setForm({...form,password:e.target.value})} value={form.password} />
            <input type="text" placeholder='confirm password' onChange={(e)=>setForm({...form,password2:e.target.value})} value={form.password2} />

            <button type='submit' disabled={loading}>Register</button>

        </form>
    </>
  )
}

export default SignUp