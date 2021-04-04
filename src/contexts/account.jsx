import React, { createContext } from "react";

const initialState = {};

const AccountContext = createContext(initialState);
export default AccountContext;

export function AccountProvider({ children }) {
    // STATES

    const value = {};

    return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}
