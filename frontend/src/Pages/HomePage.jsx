import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../Slices/authSlice'

const HomePage = () => {
    const { user } = useSelector((state) => state.auth?.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    const styles = {
        container: {
            minHeight: "100vh",
            background: "linear-gradient(120deg,#e0c3fc,#8ec5fc)",
            display: "flex",
            flexDirection: "column",
        },
        navbar: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "12px 0 12px 0", // no horizontal padding (0)
            background: "rgba(255,255,255,0.88)",
            boxShadow: "0 2px 16px rgba(132,90,223,0.07)",
            margin: "0",
            border: "0",
        },
        navButton: {
            marginLeft: "12px",
            padding: "8px 21px",
            borderRadius: "7px",
            border: "0",
            outline: "none",
            fontWeight: "600",
            fontSize: "1rem",
            background: "#8ec5fc",
            color: "#fff",
            cursor: "pointer",
            transition: "background 0.2s",
            boxShadow: "none",
        },
        main: {
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        heading: {
            fontSize: "2.7rem",
            fontWeight: "700",
            color: "#634ec7",
            marginBottom: "12px",
            textShadow: "0 3px 10px rgba(40,30,125,0.07)"
        },
        subtext: {
            fontSize: "1.2rem",
            color: "#704bb6"
        }
    }

    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <button 
                    style={styles.navButton} 
                    onClick={() => navigate("/profile")}
                >
                    Profile
                </button>
                <button 
                    style={{...styles.navButton, background:"#e68fd8"}}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </nav>
            <main style={styles.main}>
                <h1 style={styles.heading}>Welcome {user?.username}</h1>
                <p style={styles.subtext}>
                    Enjoy your dashboard!
                </p>
            </main>
        </div>
    )
}

export default HomePage
