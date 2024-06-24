
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../features/auth/authSlice' 
import { logout, reset } from '../features/auth/authSlice'

const Nav = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/home")
    }


    return (
        <nav className="navbar">
            <NavLink className="logo" to="/">Logo</NavLink>
            <ul className="nav-links">
                {user ?
                    <>
                        <NavLink className='nav-childs' to="/home">Dashboard</NavLink>
                        <NavLink className='nav-childs' to="/" onClick={handleLogout}>Logout</NavLink>
                    </>
                    :
                    <>
                        <NavLink className='nav-childs' to="/home">Dashboard</NavLink>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Nav