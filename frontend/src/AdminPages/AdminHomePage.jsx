import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutAdmin } from '../Slices/adminAuthSlice'

const AdminHomePage = () => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [validationError, setValidationError] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    })

    const [searchTerm, setSearchTerm] = useState("");

    const [showEditModal,setShowEditModal] = useState(false)
    const [editUser,setEditUser] = useState({id:null,username:"",email:""})

    const [showDeleteModal,setShowDeleteModal] = useState(false)
    const [deleteUserId,setDeleteUserId] = useState(null)

    const { token } = useSelector((state) => state.adminAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('adminToken')
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/myadmin/users/', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setUsers(res.data)
            } catch (err) {
                setError("Failed to fetch users")
            }
        }
        if (token) fetchUsers()
        else navigate("/adminLogin")
    }, [token, navigate])

    const handleCreate = async () => {

        if (!newUser.username.trim() || !newUser.email.trim() || !newUser.password.trim() || !newUser.password2.trim()) {
        setValidationError("All fields are required")
        return
        }

         if (newUser.password !== newUser.password2) {
        setValidationError("Passwords do not match")
        return
        }

        setValidationError("")




        const token = localStorage.getItem('adminToken')
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/myadmin/createUser/",
                newUser,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            alert("User created successfully!")
            setShowModal(false)
            setNewUser({ username: "", email: "", password: "", password2: "" })
            const res = await axios.get("http://127.0.0.1:8000/api/myadmin/users/", {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUsers(res.data)
        } catch (err) {
            if (err.response && err.response.data) {
       
                setValidationError(JSON.stringify(err.response.data))
            } else {
                setValidationError("Failed to create user")
            }
        }
    }

    const handleLogout = () => {
        dispatch(logoutAdmin())
        navigate("/adminLogin")
    }

    const handleDelete = async (id) => {

        const token = localStorage.getItem('adminToken')

        try{
            await axios.delete(`http://127.0.0.1:8000/api/myadmin/deleteUser/${id}/`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            setUsers(users.filter(user=>user.id != id))
            setShowDeleteModal(false)
        
        }catch(err){
            console.log("failed to delete user",err);
            alert("failed to delete User")
            
        }

        
    }

    const handleEdit = (user) => {
        
        setEditUser({id:user.id,username:user.username,email:user.email})
        setShowEditModal(true)

    }

    const handleUpdate = async ()=>{

        if(!editUser.username.trim() || !editUser.email.trim()){
            setValidationError("all fileds are required!")
            return
        }

        const token = localStorage.getItem('adminToken')

        try{
            await axios.put(
                `http://127.0.0.1:8000/api/myadmin/editUser/${editUser.id}/`,
                {username:editUser.username,email:editUser.email},
                {headers:{Authorization:`Bearer ${token}`}}
            )
            setUsers(users.map(user=>
                user.id === editUser.id ? {...user,username:editUser.username,email:editUser.email} : user
            ))
            setShowEditModal(false)
            setValidationError("")
        }catch(err){
             if (err.response && err.response.data) {
             setValidationError(JSON.stringify(err.response.data))
            } else {
                setValidationError("Failed to update user")
            }
            
        }

    }

    const handleSearch = async (e)=>{

        const query = e.target.value
        setSearchTerm(query)

        const token = localStorage.getItem('adminToken')

        try{
            const res = await axios.get(`http://127.0.0.1:8000/api/myadmin/users/?search=${query}`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            setUsers(res.data)
        }
        catch(err){
            console.log(err);
        }
    }

    
    const styles = {
        container: {
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            minHeight: "100vh",
            backgroundColor: "#f4f6f8",
            padding: "20px",
            boxSizing: "border-box"
        },
        navbar: {
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px",
            marginBottom: "20px"
        },
        button: {
            padding: "10px 18px",
            borderRadius: "7px",
            border: "none",
            backgroundColor: "#3f51b5",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "1rem",
            boxShadow: "0 2px 6px rgba(63,81,181,0.35)",
            transition: "background-color 0.3s",
        },
        buttonSecondary: {
            backgroundColor: "#f50057",
            boxShadow: "0 2px 6px rgba(245,0,87,0.35)",
        },
        buttonHover: {
            backgroundColor: "#303f9f"
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 3px 15px rgba(0,0,0,0.1)"
        },
        th: {
            backgroundColor: "#3f51b5",
            color: "#fff",
            padding: "14px",
            textAlign: "left",
            fontWeight: "700"
        },
        tr: {
            borderBottom: "1px solid #f0f0f0"
        },
        trOdd: {
            backgroundColor: "#fafafa"
        },
        td: {
            padding: "14px",
            fontSize: "1rem",
            color: "#333"
        },
        modalOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        },
        modal: {
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "30px 25px",
            width: "350px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)"
        },
        modalHeading: {
            marginBottom: "18px",
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#3f51b5",
            textAlign: "center"
        },
        modalInput: {
            width: "100%",
            padding: "10px 14px",
            margin: "10px 0",
            borderRadius: "6px",
            border: "1.5px solid #ddd",
            fontSize: "1rem",
            boxSizing: "border-box"
        },
        modalButtonGroup: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "18px"
        },
        errorText: {
            color: "#d32f2f",
            fontWeight: "600",
            marginBottom: "12px",
            textAlign: "center"
        }
    }

    return (
        <div style={styles.container}>

            
            <div style={styles.navbar}>
                <button
                    style={styles.button}
                    onClick={() => setShowModal(true)}
                    type="button"
                >
                    Create User
                </button>
                <button
                    style={{ ...styles.button, ...styles.buttonSecondary }}
                    onClick={handleLogout}
                    type="button"
                >
                    Logout
                </button>
            </div>

            <h1>User Management Dashboard</h1>
            {error && <p style={styles.errorText}>{error}</p>}

          <input
                type="text"
                placeholder="Search User"
                value={searchTerm}
                onChange={handleSearch}
                style={{
                padding: "10px 16px",
                marginBottom:"20px",
                borderRadius: "7px",
                border: "1.5px solid #ddd",
                fontSize: "1rem",
                minWidth: "250px"
                }}
             />

            <table style={styles.table} aria-label="User list">
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Edit</th>
                        <th style={styles.th}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr
                            key={user.id}
                            style={index % 2 ? styles.trOdd : styles.tr}
                        >
                            <td style={styles.td}>{user.username}</td>
                            <td style={styles.td}>{user.email}</td>
                            <td style={styles.td}>{user.is_superuser?"Admin":user.is_staff ? "Admin":"User"}</td>

                            <td style={styles.td}>
                                
                                {!(user.is_superuser || user.is_staff) &&(
                                    <button
                                        style={styles.button}
                                        onClick={() => handleEdit(user)}
                                        type="button"
                                    >
                                        Edit
                                    </button>
                                ) }

                            </td>
                            <td style={styles.td}>

                                {!(user.is_superuser || user.is_staff) && (
                                    <button
                                        style={{ ...styles.button, ...styles.buttonSecondary }}
                                        onClick={() => { setDeleteUserId(user.id); setShowDeleteModal(true); }}
                                        type="button"
                                    >
                                        Delete
                                    </button>
                                )}
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* for creating the user */}
            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
                        <h2 id="modalTitle" style={styles.modalHeading}>Create New User</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            style={styles.modalInput}
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            style={styles.modalInput}
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            style={styles.modalInput}
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            style={styles.modalInput}
                            value={newUser.password2}
                            onChange={(e) => setNewUser({ ...newUser, password2: e.target.value })}
                            required
                        />
                        <div style={styles.modalButtonGroup}>
                            <button
                                style={{ ...styles.button, width: "48%" }}
                                onClick={handleCreate}
                                type="button"
                            >
                                Submit
                            </button>
                            <button
                                style={{ ...styles.button, ...styles.buttonSecondary, width: "48%" }}
                                onClick={() => setShowModal(false)}
                                type="button"
                            >
                                Cancel
                            </button>

                            {validationError && (
                                <div style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
                                    {validationError}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}

            {/* for user edit */}

            {showEditModal && (

                <div style={styles.modalOverlay}>
                <div style={styles.modal} role="dialog" aria-modal="true" aria-labelledby="editModalTitle">
                    <h2 id="editModalTitle" style={styles.modalHeading}>Edit User</h2>

                        <input type="text"
                                placeholder='Username'
                                style={styles.modalInput}
                                value={editUser.username}
                                onChange={(e)=>setEditUser({...editUser,username:e.target.value})}
                                required
                        />

                        <input type="email"
                                placeholder='Email'
                                style={styles.modalInput}
                                value={editUser.email}
                                onChange={(e)=>setEditUser({...editUser,email:e.target.value})}
                        />
                        
                         <div style={styles.modalButtonGroup}>

                            <button
                                style={{ ...styles.button, width: "48%" }}
                                onClick={handleUpdate}
                                type="button"
                            >
                                Update
                            </button>
                            <button
                                style={{ ...styles.button, ...styles.buttonSecondary, width: "48%" }}
                                onClick={() => setShowEditModal(false)}
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>

                    
                    
                    {validationError && (
                        <div style={styles.errorText}>{validationError}</div>
                    )}
                </div>
            </div>

            )}

            {/* for confirm deleteUser */}


            {showDeleteModal &&(

                <div style={styles.modalOverlay}>
        <div style={styles.modal}>
            <h2 style={styles.modalHeading}>Confirm Delete</h2>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>Are you sure you want to delete this user?</p>
            <div style={styles.modalButtonGroup}>
                
                <button style={{...styles.button,width:"48%"}}
                        onClick={()=>handleDelete(deleteUserId)}
                > 
                Delete
                    
                </button>


                <button style={{ ...styles.button, ...styles.buttonSecondary, width: "48%" }}
                        onClick={()=>setShowDeleteModal(false)}
                >
                
                Cancel

                </button>
                
            </div>
        </div>
    </div>
            )}

        </div>
    )
}

export default AdminHomePage
