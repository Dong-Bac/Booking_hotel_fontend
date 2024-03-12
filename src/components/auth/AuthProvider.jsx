import React from 'react'
import { createContext } from 'react'
import {jwtDecode} from 'jwt-decode';
import { useContext,useState } from 'react'

export const AuthContext=createContext({
    user:null,
    handleLogin:(token)=>{},
    handleLogout:()=>{}
})
const AuthProvider = ({children}) => {
    const[user, setUser]=useState(null)

    const handleLogin=(token)=>{
        const decodeUser=jwtDecode(token)
        localStorage.setItem('userId',decodeUser.sub)
        localStorage.setItem('userRole', decodeUser.roles)
        localStorage.setItem("token", token)
        setUser(decodeUser)
    }
    console.log(localStorage.getItem("userId"))

    const handleLogout=()=>{
        localStorage.removeItem('userId')
        localStorage.removeItem('userRole')
        localStorage.removeItem('token')
        setUser(null)

    }
  return (
    <AuthContext.Provider value={{user, handleLogin, handleLogout}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth=()=>{
    return useContext(AuthContext)
}
export default AuthProvider
