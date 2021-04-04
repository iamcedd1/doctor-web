import React, { createContext, useState, useEffect } from "react";

// UTILS
import PropTypes from "prop-types";
import userRoutes from "../config/routes";

const initialState = {
    routes: {},
    visible: true,
    isConnected: true,

    accountPanel: true,
    notificationPanel: true,

    permissions: [],
    pageAccess: false,
    pageLoading: false,

    // NOTIFICATIONS
    newNotificationCount: 0,
    fetchingNotifications: false,

    toggleMenu: () => {},
    setPermissions: () => {},
    showAccountPanel: () => {},
    hideAccountPanel: () => {},
    showNotificationPanel: () => {},
    hideNotificationPanel: () => {},
};

const AppContext = createContext(initialState);
export default AppContext;

export function AppProvider({ children }) {
    const [routes, setRoutes] = useState(userRoutes);
    const [permissions, setPermissions] = useState([]);
    const [pageAccess, setPageAccess] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [visible, setVisible] = useState(true);

    const [accountPanel, setAccountPanel] = useState(false);
    const [notificationPanel, setNotificationPanel] = useState(false);

    const [isConnected, setIsConnected] = useState(false);

    const [newNotificationCount, setNewNotificationCount] = useState(0);
    const [fetchingNotifications, setFetchingNotifications] = useState(false);

    const showAccountPanel = () => {
        setAccountPanel(true);
        setNotificationPanel(false);
    };

    const hideAccountPanel = () => {
        setAccountPanel(false);
    };

    const showNotificationPanel = () => {
        setAccountPanel(false);
        setNotificationPanel(true);
    };

    const hideNotificationPanel = () => {
        setNotificationPanel(false);
    };

    const toggleMenu = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        handleConnectionChange();
        window.addEventListener("online", handleConnectionChange);
        window.addEventListener("offline", handleConnectionChange);
    }, []);

    const handleConnectionChange = () => {
        const condition = navigator.onLine ? "online" : "offline";
        if (condition === "online") {
            const ping = setInterval(() => {
                fetch(`${window.SSO_URL}status`)
                    .then(() => {
                        setIsConnected(true);
                        clearInterval(ping);
                    })
                    .catch(() => setIsConnected(false));
            }, 2000);
            return;
        }

        return setIsConnected(false);
    };

    const value = {
        routes,
        setRoutes,

        permissions,
        setPermissions,

        pageAccess,
        setPageAccess,

        pageLoading,
        setPageLoading,

        visible,
        setVisible,
        toggleMenu,

        accountPanel,
        hideAccountPanel,
        showAccountPanel,

        notificationPanel,
        showNotificationPanel,
        hideNotificationPanel,

        isConnected,
        setIsConnected,

        newNotificationCount,
        setNewNotificationCount,

        fetchingNotifications,
        setFetchingNotifications,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
    children: PropTypes.any,
};
