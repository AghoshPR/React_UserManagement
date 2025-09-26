
// import './App.css'
import {BrowserRouter  as Router,Routes,Route ,Link, Navigate} from "react-router-dom"
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import HomePage from './Pages/HomePage'
import AdminLogin from './AdminPages/AdminLogin'
import AdminHomePage from './AdminPages/AdminHomePage'
import Profile from './Pages/Profile'
import PrivateRoute from "./Pages/PrivateRoute"

function App() {
  

  return (
    <>
      <Router>

       

        <Routes>
             <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<SignUp/>}/>


             <Route path="/home" element={ <PrivateRoute> <HomePage /> </PrivateRoute> } />

            {/* AdminRoutes */}

            <Route path='/adminLogin' element={<AdminLogin/>}/>
            <Route path='/adminHome' element={<AdminHomePage/>}/>

            <Route path="/profile" element={<PrivateRoute>   <Profile />  </PrivateRoute>}/>


        </Routes>

      </Router>
    </>
  )
}

export default App
