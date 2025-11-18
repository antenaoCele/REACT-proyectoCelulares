import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [vendedor, setVendedor] = useState(null);

    const login = (vendedorData) => {
        setIsAuthenticated(true);
        setVendedor(vendedorData);
        // NO guardamos en localStorage para que la sesión no persista
    };

    const logout = () => {
        setIsAuthenticated(false);
        setVendedor(null);
    };

    const value = { isAuthenticated, vendedor, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}