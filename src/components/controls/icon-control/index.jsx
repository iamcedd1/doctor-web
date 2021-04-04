import React from "react";

// COMPONENTS
import { Icon } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import system from "../../../config/system";

const IconControl = ({ name, icon, size, color, className, children, ...controlProps }) => {
    // STYLE
    const controlClass = className ? ` ${className}` : "";
    const controlName = name ? `mdIcon-${name}` : "mdIcon";

    return (
        <Icon
            name={icon}
            size={size}
            color={color}
            data-cy={controlName}
            className={`mdIcon${controlClass}`}
            {...controlProps}
        >
            {children}
        </Icon>
    );
};

export default IconControl;

IconControl.propTypes = {
    name: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    icon: PropTypes.string.isRequired,
};

IconControl.defaultProps = {
    name: "",
    icon: "",
    size: "small",
    className: "",
    color: system.defaultColor,
};
