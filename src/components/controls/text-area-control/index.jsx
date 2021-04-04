import React from "react";

// COMPONENTS
import LabelControl from "../label-control";
import ErrorControl from "../error-control";
import { Form, TextArea } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

const TextAreaControl = ({
    name,
    width,
    error,
    label,
    minHeight,
    labelSize,
    className,
    ...controlProps
}) => {
    // STYLES
    const controlError = error ? true : false;
    const styleError = controlError ? "error" : "";
    const controlName = name ? `mdTextArea-${name}` : "mdTextArea";

    return (
        <Form.Field width={width} error={controlError} className="mdTextArea">
            <LabelControl name={name} label={label} size={labelSize} />
            <TextArea
                name={name}
                data-cy={controlName}
                style={{ minHeight }}
                className={`${styleError} ${className}`}
                {...controlProps}
            />
            <ErrorControl name={name} error={error} />
        </Form.Field>
    );
};

export default TextAreaControl;

TextAreaControl.propTypes = {
    name: PropTypes.string,
    width: PropTypes.number,
    minHeight: PropTypes.number,
    className: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    labelSize: PropTypes.string,
};

TextAreaControl.defaultProps = {
    width: 16,
    error: "",
    label: "",
    className: "",
    minHeight: 100,
    labelSize: "large",
};
