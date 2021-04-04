import React from "react";

// UTILS
import PropTypes from "prop-types";

const BoxContainer = ({ padded, position, centered, className, children }) => {
    // STYLES
    const controlCentered = centered ? " mdCentered" : "";
    const controlPadded = padded && ` mdPadded ${padded}`;
    const controlClass = className ? ` ${className}` : "";
    const controlPosition = position && ` mdPositioned ${position}`;

    return (
        <div
            className={`mdBoxContainer${controlClass}${controlCentered}${controlPadded}${controlPosition}`}
        >
            {children}
        </div>
    );
};

export default BoxContainer;

BoxContainer.propTypes = {
    children: PropTypes.any,
    centered: PropTypes.bool,
    className: PropTypes.string,
    position: PropTypes.oneOf(["", "top", "bottom"]),
    padded: PropTypes.oneOf(["", "top", "bottom", "horizontal", "vertical"]),
};

BoxContainer.defaultProps = {
    padded: "",
    position: "",
    className: "",
    centered: false,
};
