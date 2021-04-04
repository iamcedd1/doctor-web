import React, { Suspense, Fragment } from "react";

// UTILS
import PropTypes from "prop-types";

const SuspenseControl = ({ fallback, children }) => {
    return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default SuspenseControl;

SuspenseControl.propTypes = {
    fallback: PropTypes.any,
    children: PropTypes.any,
};

SuspenseControl.defaultProps = {
    fallback: Fragment,
};
