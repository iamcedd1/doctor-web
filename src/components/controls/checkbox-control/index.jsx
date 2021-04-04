import React from "react";

// COMPONENTS
import { Checkbox } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import { checkFilter, actionFilter } from "../../../utils/helpers";

const CheckboxControl = ({
    value,
    label,
    checked,
    multiple,
    filterItems,
    handleChange,
    ...controlProps
}) => {
    return (
        <div data-cy="mdCheckbox" className="mdCheckbox">
            <Checkbox
                value={value}
                label={label}
                checked={multiple ? checkFilter(filterItems, value) : checked}
                onChange={() => {
                    multiple ? handleChange(actionFilter(filterItems, value)) : handleChange();
                }}
                {...controlProps}
            />
        </div>
    );
};

export default CheckboxControl;

CheckboxControl.propTypes = {
    value: PropTypes.any.isRequired,
    label: PropTypes.string,
    checked: PropTypes.bool,
    multiple: PropTypes.bool,
    filterItems: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
};

CheckboxControl.defaultProps = {
    value: "",
    label: "",
    multiple: true,
    filterItems: [],
    handleChange: () => {},
};
