import React from "react";

// COMPONENTS
import { Button } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import system from "../../../config/system";

const ButtonIconControl = ({ color, name, circular, size, icon, className, handleClick }) => {
    // STYLES
    const controlName = name ? `mdButtonIcon-${name}` : "mdButtonIcon";

    return (
        <Button
            icon={icon}
            size={size}
            color={color}
            circular={circular}
            data-cy={controlName}
            onClick={handleClick}
            className={`mdButtonIcon ${className}`}
        />
    );
};

export default ButtonIconControl;

ButtonIconControl.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    className: PropTypes.string,
    circular: PropTypes.bool,
    handleClick: PropTypes.func.isRequired,
};

ButtonIconControl.defaultProps = {
    name: "",
    className: "",
    size: "medium",
    circular: true,
    handleClick: () => {},
    color: system.defaultColor,
};
