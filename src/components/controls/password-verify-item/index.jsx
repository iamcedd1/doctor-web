import React from "react";

// COMPONENTS
import { Icon } from "semantic-ui-react";
import LabelControl from "../label-control";
import FlexContainer from "../container/flex-container";

// UTILES
import PropTypes from "prop-types";

const PasswordVerifyItem = ({ name, label, status }) => {
    const statusName = status ? "check" : "close";
    const statusColor = status ? "blue" : "red";
    const controlName = name ? `mdRequirement-${name}` : "mdRequirement";

    return (
        <FlexContainer centered data-cy={controlName}>
            <Icon name={statusName} color={statusColor} />
            <LabelControl label={label} />
        </FlexContainer>
    );
};

export default PasswordVerifyItem;

PasswordVerifyItem.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    status: PropTypes.string,
};

PasswordVerifyItem.defaultProps = {
    name: "",
    label: "",
    status: "",
};
