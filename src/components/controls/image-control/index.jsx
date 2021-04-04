import React from "react";

// COMPONENTS
import { Image } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

const ImageControl = ({ name, size, source, centered, className, ...controlProps }) => {
    // STYLES
    const controlCentered = centered ? "mdCentered" : "";
    const controlName = name ? `mdImage-${name}` : "mdImage";

    return (
        <div className={`mdImage ${controlCentered}`}>
            <Image
                size={size}
                src={source}
                data-cy={controlName}
                className={className}
                {...controlProps}
            />
        </div>
    );
};

export default ImageControl;

ImageControl.propTypes = {
    name: PropTypes.string,
    size: PropTypes.string,
    source: PropTypes.string,
    centered: PropTypes.bool,
    className: PropTypes.string,
};

ImageControl.defaultProps = {
    name: "",
    className: "",
    source: "/images/placeholder.png",
};
