import React from "react";

// COMPONENTS
import { Icon } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import system from "../../../config/system";

const TextIconControl = ({ name, color, size, text, active, hideText, ...controlProps }) => {
    // STYLES
    const controlIconColor = active ? system.defaultColor : color;
    const controlHidden = hideText ? "mdHidden" : "";

    return (
        <div className={`mdTextIcon ${controlHidden}`}>
            <Icon
                name={name}
                size={size}
                color={controlIconColor}
                {...controlProps}
                className={`mdIcon ${controlHidden}`}
            />
            <span hidden={hideText} className="mdText">
                {text}
            </span>
        </div>
    );
};

export default TextIconControl;

TextIconControl.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    text: PropTypes.string,
    active: PropTypes.bool,
    hideText: PropTypes.bool,
};

TextIconControl.defaultProps = {
    name: "",
    text: "",
    color: "grey",
    size: "small",
    active: false,
    hideText: false,
};
