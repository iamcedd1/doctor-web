import React from "react";

// COMPONENTS
import { Radio, Form } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import HelpTooltip from "../tooltip/help-tooltip";

const RadioControl = ({ name, help, helpContent, className, ...controlProps }) => {
    // STYLES
    const controlName = name ? `mdRadio-${name}` : "mdRadio";
    const controlClass = className ? ` ${className}` : "";

    return (
        <Form.Field>
            <Radio
                name={name}
                data-cy={controlName}
                className={`mdRadio${controlClass}`}
                {...controlProps}
            />
            {help && <HelpTooltip name={name} content={helpContent} />}
        </Form.Field>
    );
};

export default RadioControl;

RadioControl.propTypes = {
    help: PropTypes.bool,
    name: PropTypes.string,
    className: PropTypes.string,
    helpContent: PropTypes.string,
};

RadioControl.defaultProps = {
    name: "",
    help: false,
    className: "",
};
