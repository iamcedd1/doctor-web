import React, { useContext } from "react";

// COMPONENTS
import { Item } from "semantic-ui-react";

// CONTEXTS
import AppContext from "../../../contexts/app";

// UTILS
import PropTypes from "prop-types";
import system from "../../../config/system";

const LinkControl = ({
    text,
    name,
    href,
    size,
    color,
    action,
    children,
    disabled,
    className,
    underline,
    handleClick,
    ...controlProps
}) => {
    // CONTEXTS
    const { setPageAccess } = useContext(AppContext);

    // STYLES
    const controlClass = className ? ` ${className}` : "";
    const controlColor = color ? ` mdColor-${color}` : "";
    const controlDisabled = disabled ? " mdDisabled" : "";
    const controlName = name ? `mdLink-${name}` : "mdLink";
    const controlAction = action && !href ? " mdAction" : "";
    const controlUnderline = underline ? " mdUnderline" : "";

    return (
        <Item
            as="a"
            href={href}
            data-cy={controlName}
            onClick={(e) => {
                if (!action) {
                    e.preventDefault();
                    setPageAccess(false);
                }

                if (!disabled) {
                    handleClick();
                }
            }}
            className={`mdLink ${size}${controlColor}${controlAction}${controlDisabled}${controlUnderline}${controlClass}`}
            {...controlProps}
        >
            {text}
            {children}
        </Item>
    );
};

export default LinkControl;

LinkControl.propTypes = {
    text: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.string,
    href: PropTypes.string,
    action: PropTypes.bool,
    children: PropTypes.any,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    underline: PropTypes.bool,
    handleClick: PropTypes.any,
    className: PropTypes.string,
};

LinkControl.defaultProps = {
    text: "",
    name: "",
    href: "",
    size: "large",
    className: "",
    action: false,
    disabled: false,
    underline: false,
    handleClick: () => {},
    color: system.defaultColor,
};
