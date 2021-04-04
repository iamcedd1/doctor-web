import React from "react";

// COMPONENTS
import { Table } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import { checkNull } from "../../../utils/helpers";

const TableCellControl = ({
    bold,
    grid,
    title,
    content,
    children,
    uppercase,
    contentType,
    ...controlProps
}) => {
    // STYLES
    const controlGrid = grid ? " mdGrid" : "";
    const controlCase = uppercase ? " text-uppercase" : "";
    const controlContent = children ? children : content;
    const controlBold = bold ? " text-bold" : "";

    return title ? (
        <Table.Cell
            title={title}
            data-cy="mdTableCell"
            className={`mdTableCell${controlBold}${controlGrid}${controlCase}`}
            {...controlProps}
        >
            {checkNull(controlContent, contentType)}
        </Table.Cell>
    ) : (
        <Table.Cell
            data-cy="mdTableCell"
            className={`mdTableCell${controlBold}${controlGrid}${controlCase}`}
            {...controlProps}
        >
            {checkNull(controlContent, contentType)}
        </Table.Cell>
    );
};

export default TableCellControl;

TableCellControl.propTypes = {
    bold: PropTypes.bool,
    grid: PropTypes.bool,
    title: PropTypes.any,
    content: PropTypes.any,
    children: PropTypes.any,
    uppercase: PropTypes.bool,
    contentType: PropTypes.any,
};

TableCellControl.defaultProps = {
    title: "",
    bold: false,
    grid: false,
    contentType: "",
    uppercase: false,
};
