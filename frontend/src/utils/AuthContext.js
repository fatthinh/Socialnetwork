import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as userServices from '~/services/userService';
import cookie from 'react-cookies';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        //setLoading(false)
        checkUserStatus();
    }, []);

    const loginUser = async (username, password, rememberMe) => {
        setLoading(true);
        try {
            const res = await userServices.login(username, password, rememberMe);
            cookie.save('token', res);
            const currentUser = await userServices.getCurrentuser(res);
            setUser(currentUser);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const logoutUser = async () => {
        cookie.remove('token');
        setUser(null);
    };

    const registerUser = async (email, username, password) => {
        setLoading(true);

        try {
            let res = await userServices.register(email, username, password);

            if (res) {
                navigate('/sign-in');
            }
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    const checkUserStatus = async () => {
        try {
            const currentUser = await userServices.getCurrentuser();
            setUser(currentUser);
        } catch (error) {}
        setLoading(false);
    };

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
        checkUserStatus,
    };

    return <AuthContext.Provider value={contextData}>{loading ? <p>Loading...</p> : children}</AuthContext.Provider>;
};

//Custom Hook
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
