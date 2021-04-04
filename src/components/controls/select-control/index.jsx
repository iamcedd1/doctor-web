import React from "react";

// COMPONENTS
import LabelControl from "../label-control";
import ErrorControl from "../error-control";
import { Form, Dropdown } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

const SelectControl = ({
    name,
    width,
    label,
    error,
    labelSize,
    className,
    inputWidth,
    ...controlProps
}) => {
    // STYLES
    const controlError = error ? true : false;
    const styleError = controlError ? "error " : "";
    const controlName = name ? `mdSelectInput-${name}` : "mdSelectInput";
    const controlWidth = inputWidth ? ` mdContainerWidth-${inputWidth}` : "";

    return (
        <Form.Field width={width} error={controlError} className="mdInput mdSelectInput">
            <LabelControl label={label} size={labelSize} />
            <div className={`mdContainer${controlWidth}`}>
                <Dropdown
                    fluid
                    lazyLoad
                    clearable
                    selection
                    data-cy={controlName}
                    className={`${styleError}${className}`}
                    {...controlProps}
                />
            </div>
            <ErrorControl name={name} error={error} />
        </Form.Field>
    );
};

export default SelectControl;

SelectControl.propTypes = {
    name: PropTypes.string,
    width: PropTypes.number,
    label: PropTypes.string,
    error: PropTypes.string,
    labelSize: PropTypes.string,
    className: PropTypes.string,
    inputWidth: PropTypes.number,
};

SelectControl.defaultTypes = {
    name: "",
    width: 16,
    label: "",
    error: "",
    inputWidth: 1,
    className: "",
    labelSize: "large",
};
