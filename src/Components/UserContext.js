import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null); // Default user state is null

    const login = (userData) => {
        setUser(userData); // Set the user data when logged in
    };

    const logout = () => {
        setUser(null); // Reset user data when logged out
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
