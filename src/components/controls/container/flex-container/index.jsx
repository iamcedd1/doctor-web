import React from "react";

// COMPONENTS
import { Item } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

const FlexContainer = ({
    itemAs,
    spaced,
    flexed,
    direction,
    centered,
    className,
    children,
    ...controlProps
}) => {
    // STATES
    const controlSpaced = spaced ? " mdSpaced" : "";
    const controlFlexed = flexed ? " mdFlexed" : "";
    const controlClass = className ? ` ${className}` : "";
    const controlCentered = centered ? ` mdCentered ${centered}` : "";
    const controlDirection = direction ? ` mdDirection-${direction}` : "";

    return (
        <Item
            as={itemAs}
            className={`mdFlexContainer${controlFlexed}${controlSpaced}${controlCentered}${controlDirection}${controlClass}`}
            {...controlProps}
        >
            {children}
        </Item>
    );
};

export default FlexContainer;

FlexContainer.propTypes = {
    itemAs: PropTypes.any,
    spaced: PropTypes.bool,
    flexed: PropTypes.bool,
    centered: PropTypes.any,
    direction: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
};

FlexContainer.defaultProps = {
    itemAs: "div",
    flexed: true,
    spaced: false,
    direction: "",
    centered: "",
    className: "",
};
