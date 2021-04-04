import React, { createContext } from "react";

const initialState = {};

const GeneralContext = createContext(initialState);
export default GeneralContext;

export function GeneralProvider({ children }) {
    // STATES

    const value = {};

    return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
}
