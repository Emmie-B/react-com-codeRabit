import { Children, createContext, react, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// navigate
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const navigationate = useNavigate();

    const [user, setUser] = useState(() => {
        try {
            const storedUser =
                localStorage.getItem("currentUser");

            return storedUser
                ? JSON.parse(storedUser)
                : null;
        } catch (error) {
            console.error(
                "Invalid user data in localStorage",
                error
            );

            localStorage.removeItem("currentUser");

            return null;
        }
    });

    function signup({ email, password, username }) {
        const user = [];

        const newUser = { email, password, username };

        try {
            user.push(newUser);

            localStorage.setItem('users', JSON.stringify(user));

            toast.success('User registered successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setUser(newUser);
            navigationate('/');
        } catch (error) {
            toast.error('Failed to save user. Please try again.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error("Error saving user to localStorage:", error);
            throw error;

        }
    }

    function login({ email, password }) {

        try {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userData = users.find(user => user.email === email && user.password === password);

            if (!userData) {
                toast.error('Invalid email or password. Please try again.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }

            localStorage.setItem('currentUser', JSON.stringify(userData));


            toast.success('Logged in successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setUser(userData);

            navigationate('/');
        } catch (error) {
            toast.error('Failed to login. Please try again.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error("Error during login:", error);
            throw error;

        }
    }

    function logout() {
        localStorage.removeItem('users');
        setUser(null);
    }
    return <AuthContext.Provider value={{ signup, login, user, logout }}>{children}</AuthContext.Provider>
}


export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
