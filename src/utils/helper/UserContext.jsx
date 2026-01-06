import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

// 1. Initialize the Context
const UserContext = createContext(null);

// 2. Create the Provider
export const UserProvider = ({ children }) => {
    // Retrieve the data from Redux
    // Make sure your Redux selector path matches your store structure
    const userData = useSelector((state) => state.user.user);

    return (
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    );
};

// 3. Create a Custom Hook for easier consumption
export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};