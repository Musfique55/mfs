import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import useAxiosPublic from "./useAxiosPublic";

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic();
    const [userInfo,setUserInfo] = useState(localStorage.getItem('user'));
    
    

    const login = (userInformation) => {        
        return axiosPublic.post('/login',userInformation)     
    }
    
    const logout = () => {
        const currentUser = {
            userInfo,
            available : false
        }
        return axiosPublic.post('/logout',currentUser)
    }

    const authInfo = {login,setUserInfo,userInfo,logout} 
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};


AuthProvider.propTypes={
    children : PropTypes.node
}

export default AuthProvider;