import React, { useState, useEffect } from "react";

// UTILS
import PropTypes from "prop-types";

const GridContainer = ({
    mobile,
    tablet,
    columns,
    desktop,
    computer,
    children,
    className,
    widescreen,
    ...controlProps
}) => {
    // STATES
    const [controlColumn, setControlColumn] = useState("");
    const controlClass = className ? ` ${className}` : "";

    // FUNCTIONS
    useEffect(() => {
        let _columns = " mdColumn";

        if (columns) {
            setControlColumn(`${_columns} mdColumn-${columns}`);
        } else {
            if (widescreen) _columns = `${_columns} mdWColumn-${widescreen}`;
            if (desktop) _columns = `${_columns} mdDColumn-${desktop}`;
            if (computer) _columns = `${_columns} mdCColumn-${computer}`;
            if (tablet) _columns = `${_columns} mdTColumn-${tablet}`;
            if (mobile) _columns = `${_columns} mdMColumn-${mobile}`;
            setControlColumn(_columns);
        }
    }, [columns]);

    return (
        <div className={`mdGridContainer${controlColumn}${controlClass}`} {...controlProps}>
            {children}
        </div>
    );
};

export default GridContainer;

GridContainer.propTypes = {
    children: PropTypes.any,
    tablet: PropTypes.number,
    mobile: PropTypes.number,
    columns: PropTypes.number,
    desktop: PropTypes.number,
    computer: PropTypes.number,
    className: PropTypes.string,
    widescreen: PropTypes.number,
};

GridContainer.defaultProps = {
    className: "",
};
