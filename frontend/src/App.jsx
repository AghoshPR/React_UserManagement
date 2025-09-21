
import './App.css'
import {BrowserRouter  as Router,Routes,Route ,Link} from "react-router-dom"
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import HomePage from './Pages/HomePage'
import AdminLogin from './AdminPages/AdminLogin'
import AdminHomePage from './AdminPages/AdminHomePage'

function App() {
  

  return (
    <>
      <Router>

        <nav>
          <Link to={"/register"}>Register</Link> | <Link to={"/login"}>Login</Link>
        </nav>

        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/home" element={<HomePage/>}/>

            {/* AdminRoutes */}

            <Route path='/adminLogin' element={<AdminLogin/>}/>
            <Route path='/adminHome' element={<AdminHomePage/>}/>

        </Routes>

      </Router>
    </>
  )
}

export default App
