import React from "react";

// COMPONENTS
import { Icon } from "semantic-ui-react";
import ButtonControl from "../../controls/button-control";

// UTILS
import PropTypes from "prop-types";

const DownloadResult = ({ name, value, label, contained, isSuccess, handleClick }) => {
    // STYLES
    const styleSuccess = isSuccess ? "success" : "failed";
    const styleName = name
        ? `mdDownloadResult-${name}-${styleSuccess}`
        : `mdDowloadResult-${styleSuccess}`;

    const isDisabled = value <= 0;
    const styleDisabled = isDisabled ? "disabled" : "";
    const styleContained = contained ? "mdContained" : "";

    return (
        <div data-cy={styleName} className={`mdDownloadResult ${styleContained}`}>
            <span className="mdLabel">{label}</span>
            <span className="mdValue">{value}</span>

            {contained ? (
                <ButtonControl
                    basic
                    text="Download"
                    icon="download"
                    disabled={isDisabled}
                    onClick={() => {
                        !isDisabled && handleClick && handleClick();
                    }}
                />
            ) : (
                <span
                    className={`mdAction ${styleDisabled}`}
                    onClick={() => {
                        !isDisabled && handleClick && handleClick();
                    }}
                >
                    Download <Icon name="arrow circle down" color="grey" />
                </span>
            )}
        </div>
    );
};

export default DownloadResult;

DownloadResult.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    contained: PropTypes.bool,
    isSuccess: PropTypes.bool,
    handleClick: PropTypes.func,
};

DownloadResult.defaultProps = {
    name: "",
    value: "",
    label: "",
    contained: false,
    isSuccess: false,
    handleClick: () => {},
};
