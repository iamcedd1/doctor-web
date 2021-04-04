import React, { useRef } from "react";

// COMPONENTS
import { Form } from "semantic-ui-react";
import LabelControl from "../label-control";
import { TimeInput } from "semantic-ui-calendar-react";

// UTILS
import PropTypes from "prop-types";
import ErrorControl from "../error-control";

const TimeControl = ({
    name,
    size,
    width,
    error,
    label,
    className,
    labelSize,
    ...controlProps
}) => {
    // STYLES
    const controlError = error ? " error" : "";
    const controlName = name ? `mdTimeInput-${name}` : "mdTimeInput";

    // REFS
    const controlInput = useRef(null);

    // FUNCTIONS
    const handleClick = () => {
        if (!controlInput.current.state.popupIsClosed) {
            const items = document.querySelectorAll(".suicr-content-item");
            for (const item of items) {
                item.removeEventListener("click", () => {});
            }
        }
    };

    return (
        <Form.Field width={width} className="mdInput mdTimePicker">
            <LabelControl name={name} label={label} size={labelSize} />
            <TimeInput
                closable
                clearable
                name={name}
                duration={0}
                size={size}
                timeFormat="24"
                animation="null"
                autoComplete="off"
                hideMobileKeyboard
                ref={controlInput}
                placeholder="00:00"
                iconPosition="left"
                data-cy={controlName}
                onClick={handleClick}
                popupPosition="bottom right"
                className={`${className}${controlError}`}
                {...controlProps}
            />
            <ErrorControl name={name} error={error} />
        </Form.Field>
    );
};

export default TimeControl;

TimeControl.propTypes = {
    size: PropTypes.string,
    width: PropTypes.number,
    error: PropTypes.string,
    label: PropTypes.string,
    labelSize: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
};

TimeControl.defaultProps = {
    width: 16,
    error: "",
    label: "",
    size: "large",
    className: "",
    labelSize: "large",
};
