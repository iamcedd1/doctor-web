import React from "react";

// COMPONENTS
import { Form } from "semantic-ui-react";
import LabelControl from "../label-control";
import ErrorControl from "../error-control";
import SemanticDatepicker from "react-semantic-ui-datepickers";

// UTILS
import PropTypes from "prop-types";

const CalendarControl = ({
    name,
    size,
    error,
    label,
    width,
    labelSize,
    className,
    ...controlProps
}) => {
    // STYLES
    const controlError = error ? " mdError" : "";
    const controlClass = className ? ` ${className}` : "";
    const controlName = name ? `mdCalendar-${name}` : "mdCalendar";

    return (
        <Form.Field width={width} className={`mdTextbox mdDatePicker${controlClass}${controlError}`}>
            <LabelControl label={label} size={labelSize} />
            <SemanticDatepicker
                clearable
                name={name}
                size={size}
                autoComplete="off"
                iconPosition="left"
                format="MMM-DD-YYYY"
                data-cy={controlName}
                placeholder="MMM-DD-YYYY"
                clearOnSameDateClick={false}
                {...controlProps}
            />
            <ErrorControl error={error} />
        </Form.Field>
    );
};

export default CalendarControl;

CalendarControl.propTypes = {
    size: PropTypes.string,
    width: PropTypes.number,
    error: PropTypes.string,
    label: PropTypes.string,
    labelSize: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
};

CalendarControl.defaultProps = {
    width: 16,
    error: "",
    label: "",
    size: "large",
    className: "",
    labelSize: "large",
};
