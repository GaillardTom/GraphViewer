
import { useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const TOKEN_KEY = 'token';

const AuthGuard = ({ children }) => {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        async function Fetch(){ 
            if (location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== "/") {
                const ans = await verifyAuth()
                if(!ans){
                    navigate("/login")
                }
                else
                {
                    navigate(location.pathname)
                    console.log("token is valid");
                }
            }
        }Fetch()
        
    }, [location.pathname, navigate])

    async function verifyAuth() {

        const token = localStorage.getItem(TOKEN_KEY);
        console.log('token: ', token);
        console.log(children);
        if(!token || token == null) 
        {
            console.log("token: ", token);
            return false;
        }

        try {

            const decoded = await jwt_decode(token, {complete: true});
            console.log('decoded: ', decoded);
            console.log('decoded: ', decoded);
    
            if(!decoded){
                return false;
            }
            else { 
                console.log(decoded);
            }

        } catch (err){
            console.log('Test');
            return false;
        }
        console.log('This is true');
        return true;
    }
    return children;
}

export default AuthGuard;