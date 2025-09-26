import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../Slices/authSlice'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [form,setForm] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    })
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.auth)
     
    const [validationError, setValidationError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.username.trim()) {
        setValidationError("Username is required")
        return
        }

        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setValidationError("Enter a valid email")
            return
        }

        if (form.password.length < 6) {
            setValidationError("Password must be at least 6 characters")
            return
        }

        if (form.password !== form.password2) {
            setValidationError("Passwords do not match")
            return
        }

        try {
            await dispatch(registerUser(form)).unwrap()

            
            setForm({ username: "", email: "", password: "", password2: "" })

            
            setValidationError("User registered successfully!")
        } catch (err) {
            console.log("Registration failed:", err)
            setValidationError("Registration failed. " + (err?.message || ""))
        }


        // dispatch(registerUser(form))
    }

    const styles = {
        container: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(120deg,#f6d365,#fda085)",
        },
        card: {
            background: "#fff",
            padding: "32px 24px",
            borderRadius: "18px",
            boxShadow: "0 2px 18px rgba(0,0,0,0.06)",
            width: "370px",
            maxWidth: "94vw",
        },
        heading: {
            textAlign: "center",
            fontWeight: "700",
            fontSize: "2rem",
            marginBottom: "24px",
            color: "#ff7e5f"
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "15px",
        },
        input: {
            padding: "12px",
            borderRadius: "9px",
            border: "1px solid #fed6e3",
            fontSize: "1rem",
            outline: "none",
            boxShadow: "0 1px 2px rgba(255,190,152,0.06)",
            transition: "border-color 0.2s",
        },
        button: {
            background: "#ff7e5f",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "9px",
            fontWeight: "700",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            marginTop: "4px",
            transition: "background 0.2s",
        },
        error: {
            color: "#ee0979",
            margin: "10px 0 0",
            fontWeight: "500",
            textAlign: "center"
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>SignUp Page</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        style={styles.input}
                        onChange={(e) => setForm({...form, username: e.target.value})}
                        value={form.username}
                        disabled={loading}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        style={styles.input}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        value={form.email}
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.input}
                        onChange={(e) => setForm({...form, password: e.target.value})}
                        value={form.password}
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        style={styles.input}
                        onChange={(e) => setForm({...form, password2: e.target.value})}
                        value={form.password2}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={styles.button}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <Link to={"/login"}>Login</Link>
                </form>
                {validationError && <p style={styles.error}>{validationError}</p>}
                {error && <p style={styles.error}>{typeof error === "string" ? error : JSON.stringify(error)}</p>}
            </div>
        </div>
    )
}

export default SignUp
