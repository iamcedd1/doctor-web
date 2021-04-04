import React from "react";

// COMPONENTS
import { Button } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import system from "../../../config/system";

const FilterActionControl = ({ handleClear, handleApply }) => {
    return (
        <div data-cy="mdFilterActions" className="mdFilterActions">
            <Button
                data-cy="mdFilterAction"
                size="medium"
                color="grey"
                content="Clear"
                onClick={handleClear}
            />
            <Button
                size="medium"
                data-cy="mdFilterAction"
                color={system.defaultColor}
                content="Apply"
                onClick={handleApply}
            />
        </div>
    );
};

export default FilterActionControl;

FilterActionControl.propTypes = {
    handleClear: PropTypes.func.isRequired,
    handleApply: PropTypes.func.isRequired,
};
