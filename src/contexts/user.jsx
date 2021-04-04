import React, { createContext, useState, useEffect } from "react";

// UTILS
import jwt from "jsonwebtoken";
import PropTypes from "prop-types";
import system from "../config/system";

const initialState = {
    currentUser: "",
    accessToken: "",
    authenticated: false,

    userAccess: "",

    isLogin: false,
    setIsLogin: () => {},

    bankSetup: false,
    setBankSetup: () => {},

    timedOut: false,
    setTimedOut: () => {},

    setUser: () => {},
    clearUser: () => {},
    handleLogout: () => {},
    handleDecryptToken: () => {},

    // FORGOT PASSWORD
    forgotUser: {},
    setForgotUser: () => {},

    forgotOtp: {},
    setForgotOtp: () => {},

    expiredLink: "",
    setExpiredLink: () => {},

    // REGISTER
    register: {},
    teleSchedules: [],

    setRegister: () => {},
    setTeleSchedules: () => {},
};

const UserContext = createContext(initialState);
export default UserContext;

export function UserProvider({ children }) {
    // STATES
    const [currentUser, setCurrentUser] = useState({});
    const [accessToken, setAccessToken] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    const [isLogin, setIsLogin] = useState(false);
    const [userAccess, setUserAccess] = useState("");
    const [timedOut, setTimedOut] = useState(false);

    const [bankSetup, setBankSetup] = useState(false);

    // FORGOT PASSWORD
    const [forgotOtp, setForgotOtp] = useState({});
    const [forgotUser, setForgotUser] = useState({});
    const [expiredLink, setExpiredLink] = useState("");

    // REGISTER
    const [register, setRegister] = useState({});
    const [teleSchedules, setTeleSchedules] = useState([]);

    // FUNCTIONS
    const setUser = (user) => {
        const { name, token, userType, bankSetup, initials } = user;
        setCurrentUser({ name, userType, initials });
        setBankSetup(bankSetup);

        if (!token.includes("Bearer")) {
            setAccessToken(`Bearer ${token}`);
        } else {
            setAccessToken(token);
        }

        if (name && token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    };

    const getUser = () => {
        const token = localStorage.getItem("access_token");
        const userData = localStorage.getItem("current_user");
        if (token && userData) {
            const user = JSON.parse(userData);
            setCurrentUser(user);
            setAccessToken(token);
            setAuthenticated(true);
        }
    };

    const clearUser = () => {
        // history.replace("/login");
        setCurrentUser("");
        setAccessToken("");
        setAuthenticated(false);
        localStorage.clear();
    };

    const handleLogout = () => {
        clearUser();
    };

    const handleDecryptToken = () => {
        if (accessToken) {
            const token = accessToken.replace("Bearer ", "");
            const { user_id, practitioner_code } = jwt.verify(token, system.SESSION_SECRET);
            return { user_id, practitioner_code };
        }

        return null;
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("current_user", JSON.stringify(currentUser));
    }, [currentUser, accessToken]);

    const value = {
        currentUser,
        setCurrentUser,

        accessToken,
        authenticated,

        userAccess,
        setUserAccess,

        isLogin,
        setIsLogin,

        bankSetup,
        setBankSetup,

        forgotUser,
        setForgotUser,

        forgotOtp,
        setForgotOtp,

        expiredLink,
        setExpiredLink,

        timedOut,
        setTimedOut,

        register,
        setRegister,

        teleSchedules,
        setTeleSchedules,

        setUser,
        clearUser,
        handleLogout,
        handleDecryptToken,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
    children: PropTypes.any,
};
