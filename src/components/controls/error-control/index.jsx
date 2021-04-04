import React from "react";

// COMPONENTS
import { Label } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

const ErrorControl = ({ error, name, color, errorStyle, ...controlProps }) => {
    // STYLES
    const styleColor = color ? color : "red";
    const controlName = name ? `mdError-${name}` : "mdError";

    return error ? (
        <Label
            basic
            size="large"
            data-cy={controlName}
            color={styleColor}
            style={errorStyle}
            className="mdError"
            {...controlProps}
        >
            {error}
        </Label>
    ) : null;
};

export default ErrorControl;

ErrorControl.propTypes = {
    name: PropTypes.string,
    error: PropTypes.string,
    color: PropTypes.string,
    errorStyle: PropTypes.string,
};

ErrorControl.defaultProps = {
    name: "",
    error: "",
    color: "red",
};
