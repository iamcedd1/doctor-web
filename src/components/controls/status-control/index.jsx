import React, { useEffect, useState } from "react";

// COMPONENTS
import { Label } from "semantic-ui-react";

// DATA
import { statuses } from "../../../data/status";

// UTILS
import PropTypes from "prop-types";

const StatusControl = ({
    size,
    type,
    fluid,
    width,
    tablet,
    mobile,
    padded,
    status,
    desktop,
    computer,
    className,
    widescreen,
    ...controlProps
}) => {
    // STATES
    const [currentStatus, setCurrentStatus] = useState({});
    const [controlWidth, setControlWidth] = useState("");

    // STYLES
    const controlFluid = fluid ? " mdFluid" : "";
    const controlPadded = padded ? " mdPadded" : "";
    const controlClass = className ? ` ${className}` : "";

    // FUNCTIONS
    useEffect(() => {
        const _status = statuses.find((item) => {
            if (status) {
                return (
                    (item.name === status.toUpperCase() || item.code === status) &&
                    item.type.includes(type)
                );
            }

            return item.code === "DF";
        });
        setCurrentStatus(_status);
    }, [type, status]);

    useEffect(() => {
        if (width) {
            setControlWidth(`w-${width}`);
        } else {
            let widths = "";
            if (widescreen) widths = `${widths} ww-${widescreen}`;
            if (desktop) widths = `${widths} dw-${desktop}`;
            if (computer) widths = `${widths} cw-${computer}`;
            if (tablet) widths = `${widths} tw-${tablet}`;
            if (mobile) widths = `${widths} mw-${mobile}`;
            setControlWidth(widths);
        }
    }, [width, tablet, mobile, computer, desktop, widescreen]);

    return currentStatus ? (
        <Label
            size={size}
            data-cy="mdStatus"
            color={currentStatus.color}
            content={currentStatus.name}
            className={`mdStatus${controlPadded}${controlFluid}${controlWidth}${controlClass}`}
            {...controlProps}
        />
    ) : null;
};

export default StatusControl;

StatusControl.propTypes = {
    size: PropTypes.string,
    fluid: PropTypes.any,
    type: PropTypes.string,
    padded: PropTypes.bool,
    width: PropTypes.number,
    status: PropTypes.string,
    tablet: PropTypes.number,
    mobile: PropTypes.number,
    desktop: PropTypes.number,
    computer: PropTypes.number,
    className: PropTypes.string,
    widescreen: PropTypes.number,
};

StatusControl.defaultProps = {
    size: "small",
    fluid: false,
    padded: false,
    type: "status",
    status: "DF",
    className: "",
};
