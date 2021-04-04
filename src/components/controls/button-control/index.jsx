import React, { Fragment } from "react";

// COMPONENTS
import { Button, Icon } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import system from "../../../config/system";

const ButtonControl = ({
    color,
    text,
    name,
    size,
    icon,
    padded,
    iconOnly,
    children,
    className,
    ...controlProps
}) => {
    // STATES
    const controlName = name ? `mdButton-${name}` : "mdButton";
    const controlPadded = padded ? "mdPadded" : "";
    const controlClass = className ? ` ${className}` : "";

    return iconOnly ? (
        <Button
            icon={icon}
            size={size}
            color={color}
            data-cy={controlName}
            className={`mdButton ${controlPadded}${controlClass}`}
            {...controlProps}
        />
    ) : (
        <Button
            size={size}
            color={color}
            data-cy={controlName}
            className={`mdButton ${controlPadded}${controlClass}`}
            {...controlProps}
        >
            {!iconOnly && (
                <Fragment>
                    {icon && <Icon name={icon} size="small" className="mdIcon" />}
                    {text}
                    {children}
                </Fragment>
            )}
        </Button>
    );
};

export default ButtonControl;

ButtonControl.propTypes = {
    text: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    padded: PropTypes.bool,
    color: PropTypes.string,
    children: PropTypes.any,
    iconOnly: PropTypes.bool,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
};

ButtonControl.defaultProps = {
    icon: "",
    text: "",
    size: "large",
    padded: false,
    className: "",
    iconOnly: false,
    color: system.defaultColor,
};
