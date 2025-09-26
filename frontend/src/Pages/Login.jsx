import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../Slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [form,setForm] = useState({uname:"",pass:""})
    const dispatch = useDispatch()
    const {user,token,loading,error} = useSelector((state)=>state.auth)
    const [validationError, setValidationError] = useState("")
    const navigate=useNavigate()

    const handleSubmit =(e)=>{
        e.preventDefault()

         if (!form.uname.trim() || !form.pass.trim()) {
        setValidationError("Username and Password cannot be empty")
        return
        }
        setValidationError("")

        dispatch(loginUser(form))
    }

    useEffect(()=>{
        if(token){
            navigate("/home")
        }
    },[token,navigate])

    const styles = {
        container: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
        },
        card: {
            background: "#fff",
            padding: "32px 24px",
            borderRadius: "16px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.1)",
            width: "340px",
            maxWidth: "90vw",
        },
        heading: {
            textAlign: "center",
            fontWeight: "600",
            fontSize: "2rem",
            marginBottom: "24px"
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "16px",
        },
        input: {
            padding: "11px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            outline: "none",
            transition: "border-color 0.2s",
        },
        inputFocus: {
            borderColor: "#87ceeb"
        },
        button: {
            background: "#87ceeb",
            color: "#fff",
            padding: "11px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            transition: "background 0.2s",
        },
        error: {
            color: "red",
            margin: "8px 0 0",
            fontWeight: "500",
            textAlign: "center"
        },
        welcome: {
            color: "#228c22",
            fontWeight: "600",
            textAlign: "center",
            marginTop: "18px"
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>Login Page</h1>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        style={styles.input}
                        onChange={(e) => setForm({...form, uname:e.target.value})}
                        value={form.uname}
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.input}
                        onChange={(e) => setForm({...form, pass:e.target.value})}
                        value={form.pass}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={styles.button}
                    >
                        {loading ? "Logging in..." : "Submit"}
                    </button>

                    <Link to={"/register"}>Register</Link>
                </form>
                {validationError && <p style={styles.error}>{validationError}</p>}
                {error && <p style={styles.error}>{typeof error === "string" ? error : JSON.stringify(error)}</p>}
                {token && <p style={styles.welcome}>Welcome {user?.username}!</p>}
            </div>
            
        </div>
    )
}

export default Login
