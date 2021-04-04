import React from "react";

// COMPONENTS
import { Icon } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

const ButtonIconTextControl = ({
    text,
    name,
    icon,
    iconSize,
    iconColor,
    className,
    iconProps,
    ...controlProps
}) => {
    // STYLES
    const controlName = name ? `mdButton-${name}` : "mdButton";
    const controlClass = className ? ` ${className}` : "";

    return (
        <div
            data-cy={controlName}
            className={`mdButton mdIconText${controlClass}`}
            {...controlProps}
        >
            <Icon className="mdIcon" size={iconSize} color={iconColor} name={icon} {...iconProps} />
            {text}
        </div>
    );
};

export default ButtonIconTextControl;

ButtonIconTextControl.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconSize: PropTypes.string,
    iconColor: PropTypes.string,
    iconProps: PropTypes.object,
    className: PropTypes.string,
};

ButtonIconTextControl.defaultProps = {
    name: "",
    className: "",
    text: "Download",
    iconSize: "big",
    iconColor: "grey",
    icon: "arrow alternate circle down",
};
