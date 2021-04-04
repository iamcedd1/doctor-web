import React from "react";

// COMPONENTS
import { Card } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import system from "../../../config/system";

const CardControl = ({ name, color, padded, actions, children, className, ...controlProps }) => {
    // STYLES
    const controlName = name ? `mdCard-${name}` : "mdCard";
    const controlClass = className ? ` ${className}` : "";
    const controlPadded = padded ? " mdPadded" : "";

    return (
        <Card
            color={color}
            data-cy={controlName}
            className={`mdCard${controlPadded}${controlClass}`}
            {...controlProps}
        >
            {children}
            {actions?.map((item) => (
                <Card.Content
                    extra
                    key={item.name}
                    content={item.text}
                    className="mdCardAction"
                    onClick={item.handleAction}
                    data-cy={`mdCardAction-${item.name}`}
                />
            ))}
        </Card>
    );
};

export default CardControl;

CardControl.propTypes = {
    padded: PropTypes.bool,
    color: PropTypes.string,
    children: PropTypes.any,
    actions: PropTypes.array,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
};

CardControl.defaultProps = {
    name: "",
    actions: [],
    padded: false,
    color: system.defaultColor,
};
