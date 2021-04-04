import React from "react";

// COMPONENTS
import { Form } from "semantic-ui-react";
import LabelControl from "../label-control";
import RadioControl from "../radio-control";

// UTILS
import PropTypes from "prop-types";
import ErrorControl from "../error-control";

const RadioGroupControl = ({
    name,
    items,
    value,
    label,
    error,
    width,
    indented,
    disabled,
    labelSize,
    handleChange,
    ...controlProps
}) => {
    // STATES
    const controlError = error ? true : false;
    const controlIndented = indented ? " mdIndented" : "";
    const controlName = name ? `mdRadioGroup-${name}` : "mdRadioGroup";

    return (
        <Form.Field
            width={width}
            data-cy={controlName}
            error={controlError}
            className={`mdRadioGroup${controlIndented}`}
        >
            <LabelControl label={label} size={labelSize} />
            {items &&
                items.map((item) => {
                    const withHelp = item.tip ? true : false;
                    const isDisabled = disabled ? disabled : item.disabled ? true : false;
                    return (
                        <RadioControl
                            help={withHelp}
                            key={item.value}
                            name={item.value}
                            label={item.name}
                            value={item.value}
                            disabled={isDisabled}
                            helpContent={item.tip}
                            checked={value === item.value}
                            onChange={() => handleChange(item.value)}
                            {...controlProps}
                        />
                    );
                })}
            <ErrorControl name={name} error={error} />
        </Form.Field>
    );
};

export default RadioGroupControl;

RadioGroupControl.propTypes = {
    items: PropTypes.array,
    name: PropTypes.string,
    width: PropTypes.number,
    value: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    indented: PropTypes.bool,
    labelSize: PropTypes.string,
    handleChange: PropTypes.func,
};

RadioGroupControl.defaultProps = {
    width: 16,
    items: [],
    name: "",
    value: "",
    label: "",
    indented: false,
    disabled: false,
    labelSize: "large",
    handleChange: () => {},
};
