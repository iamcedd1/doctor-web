import React, { createContext } from "react";

const initialState = {};

const LoaContext = createContext(initialState);
export default LoaContext;

export function LoaProvider({ children }) {
    // STATES

    const value = {};

    return <LoaContext.Provider value={value}>{children}</LoaContext.Provider>;
}
