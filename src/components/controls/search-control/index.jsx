import React from "react";

// COMPONENTS
import { Input } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

const SearchControl = ({ name, size, ...controlProps }) => {
    // STYLES
    const controlName = name ? `mdSearch-${name}` : "mdSearch";

    return (
        <Input
            fluid
            name={name}
            size={size}
            icon="search"
            data-cy={controlName}
            {...controlProps}
        />
    );
};

export default SearchControl;

SearchControl.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.string,
};

SearchControl.defaultProps = {
    size: "large",
};
