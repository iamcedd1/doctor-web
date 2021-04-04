import React from "react";

// COMPONENTS

// UTILS
import PropTypes from "prop-types";
import system from "../../../config/system";

const ChipControl = ({ name, text, color, action, selected, className, ...controlProps }) => {
    // STYLES
    const controlName = name ? `mdChip-${name}` : "mdChip";
    const controlClass = className ? ` ${className}` : "";
    const controlSelected = selected ? " mdSelected" : "";
    const controlAction = action ? " mdAction" : "";

    return (
        <div
            color={color}
            data-cy={controlName}
            className={`mdChip${controlClass}${controlSelected}${controlAction}`}
            {...controlProps}
        >
            {text}
        </div>
    );
};

export default ChipControl;

ChipControl.propTypes = {
    action: PropTypes.bool,
    text: PropTypes.string,
    value: PropTypes.string,
    color: PropTypes.string,
    selected: PropTypes.bool,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
};

ChipControl.defaultProps = {
    name: "",
    text: "D",
    action: false,
    className: "",
    selected: false,
    color: system.defaultColor,
};
