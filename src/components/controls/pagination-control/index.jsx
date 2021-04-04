import React, { Fragment, useEffect, useState } from "react";

// COMPONENTS
import { Pagination, Grid, Icon } from "semantic-ui-react";
import ResponsiveControl from "../responsive-control";

// UTILS
import PropTypes from "prop-types";

const PaginationControl = ({ name, totalPages, activePage, ...controlProps }) => {
    // STYLES
    const controlName = name ? `mdPagination-${name}` : "mdPagination";

    // STATES
    const [options, setOptions] = useState({});
    const [nextDisabled, setNextDisabled] = useState(false);
    const [prevDisabled, setPrevDisabled] = useState(false);

    // FUNCTIONS
    useEffect(() => {
        if (activePage === 1) {
            setPrevDisabled(true);

            if (activePage === totalPages) {
                setNextDisabled(true);
            } else {
                setNextDisabled(false);
            }
        } else if (totalPages === activePage) {
            setPrevDisabled(false);
            setNextDisabled(true);
        } else {
            setPrevDisabled(false);
            setNextDisabled(false);
        }
    }, [totalPages, activePage]);

    useEffect(() => {
        const _options = {
            firstItem: {
                disabled: prevDisabled,
                content: <Icon name="angle double left" />,
            },
            prevItem: { disabled: prevDisabled, content: <Icon name="angle left" /> },
            lastItem: { disabled: nextDisabled, content: <Icon name="angle double right" /> },
            nextItem: { disabled: nextDisabled, content: <Icon name="angle right" /> },
        };
        setOptions(_options);
    }, [nextDisabled, prevDisabled]);

    return (
        <Fragment>
            <ResponsiveControl as={Grid.Column} textAlign="right" type="tablet">
                <Pagination
                    {...options}
                    size="large"
                    totalPages={totalPages}
                    activePage={activePage}
                    boundaryRange={2}
                    data-cy={controlName}
                    className="mdPagination"
                    {...controlProps}
                />
            </ResponsiveControl>
            <ResponsiveControl as={Grid.Column} textAlign="center" type="mobile" width="max">
                <Pagination
                    {...options}
                    size="large"
                    totalPages={totalPages}
                    activePage={activePage}
                    boundaryRange={0}
                    data-cy={controlName}
                    className="mdPagination"
                    {...controlProps}
                />
            </ResponsiveControl>
        </Fragment>
    );
};

export default PaginationControl;

PaginationControl.propTypes = {
    totalPages: PropTypes.number,
    activePage: PropTypes.number,
    name: PropTypes.string.isRequired,
};

PaginationControl.defaultProps = {
    totalPages: 1,
    activePage: 1,
};
