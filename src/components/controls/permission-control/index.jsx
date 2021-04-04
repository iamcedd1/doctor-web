import React, { Fragment, useContext } from "react";

// CONTEXTS
import UserContext from "../../../contexts/user";

// UTILS
import PropTypes from "prop-types";

const PermissionControl = ({ permission, children }) => {
    // CONTEXTS
    const { userAccess } = useContext(UserContext);

    return permission === userAccess || userAccess === "fa" ? (
        <Fragment>{children}</Fragment>
    ) : null;
};

export default PermissionControl;

PermissionControl.propTypes = {
    permission: PropTypes.string,
    children: PropTypes.any,
};
