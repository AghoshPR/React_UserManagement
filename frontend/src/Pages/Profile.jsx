import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Profile = () => {
    const {token} = useSelector((state => state.auth))
    const [profile, setProfile] = useState(null)
    const [file, setFile] = useState(null)
    const [validationError, setValidationError] = useState("")


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/user/profile/", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setProfile(res.data)
            } catch (err) {
                console.log("failed to fetch Profile", err);
            }
        }
        if (token) fetchProfile()
    }, [token])

    const handleUpdate = async () => {

        

        
        if (!profile.username.trim() || !profile.email.trim() || !profile.phone.trim()) {
        setValidationError("All fields are required")
        return
        }

        if (profile.phone.trim().length < 10 || profile.phone.trim().length > 15) {
        setValidationError("Phone must be 10-15 digits")
        return
        }

        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setValidationError("File size must be less than 2MB")
                return
            }
            if (!(file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
                setValidationError("Only JPG/PNG images are allowed")
                return
            }
        }


        setValidationError("")



        const formData = new FormData()
        formData.append("username", profile.username)
        formData.append("email", profile.email)
        formData.append("phone", profile.phone)

        if (file) {
            formData.append("profile_image", file)
        }

        try {
            const res = await axios.put(
                "http://127.0.0.1:8000/api/user/profile/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-Type": "multipart/form-data",
                    },
                }
            )
            setProfile(res.data)
            alert("profile Updated succesfully!")
        } catch (err) {
            console.log("update Failed", err);
        }
    }

    if (!profile) return <p>Loading....</p>

    const styles = {
        container: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(120deg,#fbc2eb,#a6c1ee)"
        },
        card: {
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 6px 32px rgba(133,90,223,0.16)",
            padding: "36px 30px",
            width: "420px",
            maxWidth: "96vw"
        },
        heading: {
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "700",
            color: "#9756c6",
            marginBottom: "20px"
        },
        avatarArea: {
            display: "flex",
            justifyContent: "center",
            marginBottom: "18px"
        },
        avatar: {
            borderRadius: "50%",
            boxShadow: "0 2px 14px rgba(133,90,223,0.09)",
            objectFit: "cover",
            background: "#fbc2eb",
            padding: "4px"
        },
        formSection: {
            display: "flex",
            flexDirection: "column",
            gap: "14px"
        },
        label: {
            fontWeight: "600",
            fontSize: "1rem",
            color: "#7a41be",
            marginBottom: "4px"
        },
        input: {
            padding: "10px",
            borderRadius: "8px",
            border: "1.5px solid #d1cbfa",
            fontSize: "1rem",
            outline: "none",
            background: "#f8f6fd"
        },
        fileInput: {
            marginTop: "6px"
        },
        button: {
            marginTop: "18px",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "700",
            fontSize: "1rem",
            background: "linear-gradient(120deg,#a6c1ee,#9756c6)",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(133,90,223,0.09)",
            transition: "background 0.2s"
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>User Profile</h2>
                <div style={styles.avatarArea}>
                    {profile.profile_image && (
                        <img
                            src={`http://127.0.0.1:8000${profile.profile_image}?t=${new Date().getTime()}`}
                            alt="Profile"
                            width="120"
                            height="120"
                            style={styles.avatar}
                        />
                    )}
                </div>

                <div style={styles.formSection}>
                    <div>
                        <div style={styles.label}>Username:</div>
                        <input
                            type="text"
                            style={styles.input}
                            value={profile.username}
                            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <div style={styles.label}>Email:</div>
                        <input
                            type="email"
                            style={styles.input}
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <div style={styles.label}>Phone:</div>
                        <input
                            type="text"
                            style={styles.input}
                            value={profile.phone || ""}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <div style={styles.label}>Profile Image:</div>
                        <input
                            type="file"
                            style={styles.fileInput}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <button style={styles.button} onClick={handleUpdate}>
                        Update Profile
                    </button>

                        {validationError && (
                                <div style={{ color: "red", marginBottom: "10px" }}>
                                    {validationError}
                                </div>
                            )}
                </div>
            </div>
        </div>
    )
}

export default Profile
