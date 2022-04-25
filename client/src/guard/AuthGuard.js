
import { useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const TOKEN_KEY = 'token';

const AuthGuard = ({ children }) => {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname !== '/login' && location.pathname !== '/register') {
            if(!verifyAuth()){
                navigate("/login")
            }
        }
    }, [location.pathname, navigate])

    function verifyAuth() {

        const token = localStorage.getItem(TOKEN_KEY);

        if(!token) return false;

        try {

            const decoded = jwt_decode(token, {complete: true});
    
            if(!decoded) return false;

        } catch (err){

            return false;
        }
        return true;
    }
    return children;
}

export default AuthGuard;