import React, { useEffect, useState } from 'react';
import { getUserAccount } from '../services/userService'
const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
    const defaultContext = { loading: true, account: {}, auth: false, token: '' }
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState(defaultContext);

    // Login updates the user data with a name parameter
    const loginContext = (data) => {
        setUser({ ...data, loading: false })
    };

    // Logout updates the user data to default
    const logoutContext = () => {
        setUser({ ...defaultContext, loading: false })
    };
    const fetchUser = async () => {
        let response = await getUserAccount()
        if (+response?.ec === 0) {
            let roles = response?.dt?.role
            let data = { loading: false, account: { ...response?.dt?.account, roles }, auth: true, token: response?.dt?.access_token }
            setUser(data)
        } else {
            setUser({ ...defaultContext, loading: false })
        }
    }
    useEffect(() => {
        const nonSecurePaths = ['/', '/login', '/register', '/logout']
        if (!nonSecurePaths.includes(window.location.pathname))
            fetchUser()
        else setUser({ ...user, loading: false })
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };