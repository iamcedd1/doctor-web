import React, { createContext } from "react";

// UTILS
import PropTypes from "prop-types";

const initialState = {};

const ProfileContext = createContext(initialState);
export default ProfileContext;

export function ProfileProvider({ children }) {
    // STATES

    const value = {};

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

ProfileProvider.propTypes = {
    children: PropTypes.any,
};
