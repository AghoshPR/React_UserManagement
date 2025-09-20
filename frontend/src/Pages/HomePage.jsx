import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../Slices/authSlice'

const HomePage = () => {

    const {user}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const navigate = useNavigate()

    const handleLogout=()=>{

        dispatch(logout())
        navigate("/login")
    }


  return (
    <>
        <h1>welcome {user?.username}</h1>
        <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default HomePage