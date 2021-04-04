import React, { Fragment } from "react";

// COMPONENTS
import { Grid } from "semantic-ui-react";
import ResponsiveControl from "../responsive-control";

// UTILS
import PropTypes from "prop-types";

const ResultControl = ({ name, currentResult, totalResult }) => {
    // STYLES
    const controlName = name ? `mdResult-${name}` : "mdResult";

    return (
        <Fragment>
            <ResponsiveControl
                type="tablet"
                as={Grid.Column}
                textAlign="left"
                className="mdResult"
                verticalAlign="middle"
            >
                <span data-cy={controlName}>
                    RESULT <span className="mdResultCurrent">{currentResult}</span>/
                    <span className="mdResultTotal">{totalResult}</span>
                </span>
            </ResponsiveControl>
            <ResponsiveControl
                width="max"
                type="mobile"
                as={Grid.Column}
                textAlign="center"
                verticalAlign="middle"
                className="mdResult mdMobile"
            >
                <span data-cy={controlName}>
                    RESULT <span className="mdResultCurrent">{currentResult}</span>/
                    <span className="mdResultTotal">{totalResult}</span>
                </span>
            </ResponsiveControl>
        </Fragment>
    );
};

export default ResultControl;

ResultControl.propTypes = {
    totalResult: PropTypes.number,
    currentResult: PropTypes.number,
    name: PropTypes.string.isRequired,
};

ResultControl.defaultProps = {
    totalResult: 0,
    currentResult: 0,
};
