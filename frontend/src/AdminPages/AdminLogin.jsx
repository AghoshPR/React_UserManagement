import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [form, setForm] = useState({ adminName: "", adminPass: "" })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/myadmin/adminLogin/", form)
            localStorage.setItem('adminToken', res.data.access)
            navigate('/adminHome')
        } catch (err) {
            setError(err.response?.data?.error || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    const styles = {
        container: {
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
           background: "linear-gradient(135deg, #c3a7e1, #8a7cc1)",
            fontFamily: "Arial, sans-serif",
            padding: "16px",
        },
        card: {
            backgroundColor: "#fff",
            padding: "32px 28px",
            borderRadius: "8px",
            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            width: "320px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            textAlign: "center",
        },
        heading: {
            fontSize: "1.8rem",
            fontWeight: "600",
            color: "#333",
            marginBottom: "0"
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            textAlign: "left"
        },
        input: {
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            outline: "none",
        },
        button: {
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#333",
            color: "#fff",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
        },
        error: {
            color: "#b00020",
            fontWeight: "600",
            fontSize: "0.9rem",
            marginTop: "4px"
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>Admin Login</h1>
                <form style={styles.form} onSubmit={handleSubmit} noValidate>
                    <input
                        type="text"
                        placeholder="Username"
                        value={form.adminName}
                        onChange={(e) => setForm({ ...form, adminName: e.target.value })}
                        disabled={loading}
                        autoComplete="username"
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={form.adminPass}
                        onChange={(e) => setForm({ ...form, adminPass: e.target.value })}
                        disabled={loading}
                        autoComplete="current-password"
                        required
                        style={styles.input}
                    />
                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
            </div>
        </div>
    )
}

export default AdminLogin
