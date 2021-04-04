import React from "react";

// COMPONENTS
import { Step } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

const StepControl = ({ items, ...controlProps }) => {
    return <Step.Group className="mdStepControl" items={items} {...controlProps} />;
};

export default StepControl;

StepControl.propTypes = {
    items: PropTypes.array.isRequired,
};

StepControl.defaultProps = {};
