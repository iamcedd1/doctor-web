import React from "react";

// COMPONENTS
import { Image } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

// DATA
const MEMBER_STATUSES = ["VIP", "Blacklisted", "Orangelisted"];

const MemberLegend = ({ status, orientation }) => {
    return status ? (
        <span data-cy="mdMemberLegender" className="mdMemberLegend">
            <Image className="mdIcon" src={`/images/icons/${status}.png`} size="mini" />
        </span>
    ) : (
        MEMBER_STATUSES.map((item, index) => {
            const imageUrl = `/images/icons/${item}.png`;
            return (
                <span
                    key={index}
                    data-cy="mdMemberLegend"
                    className={`mdMemberLegend ${orientation}`}
                >
                    <Image className="mdIcon" src={imageUrl} size="mini" spaced />
                    <span>{item}</span>
                </span>
            );
        })
    );
};

export default MemberLegend;

MemberLegend.propTypes = {
    status: PropTypes.string,
    orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

MemberLegend.defaultProps = {
    orientation: "horizontal",
};
