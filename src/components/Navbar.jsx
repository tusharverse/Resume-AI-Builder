import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const logoutUser = ()=>{
        logout();
        navigate('/')
    }
  return (
    <div className='shadow bg-white'>
    <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
    <Link to="/">
        <img src="/logo.svg" alt="Logo" className='h-11 w-auto '/>
    </Link>
    <div>
        <p className='max-sm:hidden'>Hi, {user ? user.name : 'Guest'}</p>
        <button onClick={logoutUser} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
    </div>

    </nav>


    </div>
  )
}

export default Navbar