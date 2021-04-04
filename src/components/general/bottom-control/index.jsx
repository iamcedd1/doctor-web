import React, { Fragment } from "react";

// COMPONENTS
import { Grid } from "semantic-ui-react";
import ResultControl from "../../controls/result-control";
import ResponsiveControl from "../../controls/responsive-control";
import PaginationControl from "../../controls/pagination-control";

// UTILS
import PropTypes from "prop-types";

const BottomControl = ({
    name,
    totalResult,
    totalPages,
    pageNumber,
    currentResult,
    handleChangePage,
}) => {
    return (
        <Fragment>
            <ResponsiveControl as={Grid.Row} columns={2} type="tablet">
                <ResultControl
                    name={name}
                    totalResult={totalResult}
                    currentResult={currentResult}
                />
                <PaginationControl
                    name={name}
                    totalPages={totalPages}
                    activePage={pageNumber}
                    onPageChange={(e, data) => handleChangePage(data.activePage)}
                />
            </ResponsiveControl>
            <ResponsiveControl as={Grid.Row} columns={1} type="mobile" width="max">
                <ResultControl
                    name={name}
                    totalResult={totalResult}
                    currentResult={currentResult}
                />
                <PaginationControl
                    name={name}
                    totalPages={totalPages}
                    activePage={pageNumber}
                    onPageChange={(e, data) => handleChangePage(data.activePage)}
                />
            </ResponsiveControl>
        </Fragment>
    );
};

export default BottomControl;

BottomControl.propTypes = {
    name: PropTypes.string,
    totalResult: PropTypes.number,
    totalPages: PropTypes.number,
    pageNumber: PropTypes.number,
    currentResult: PropTypes.number,
    handleChangePage: PropTypes.func,
};

BottomControl.defaultProps = {
    name: "",
    totalResult: 0,
    totalPages: 1,
    pageNumber: 1,
    currentResult: 0,
    handleChangePage: () => {},
};
