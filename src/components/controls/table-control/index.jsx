import React from "react";

// COMPONENTS
import CheckboxControl from "../checkbox-control";
import { Table, Dimmer, Loader } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

const TableControl = ({
    name,
    fixed,
    loading,
    headers,
    customed,
    children,
    className,
    singleLine,
    scrollable,
    selectProps,
    withSelectAll,
    ...controlProps
}) => {
    // STYLES
    const controlName = name ? `mdTable-${name}` : "mdTable";
    const controlScrollable = scrollable ? " mdScrollable" : "";
    const controlCustomed = customed ? " mdCustomed" : "";
    const controlClass = className ? ` ${className}` : "";

    return loading ? (
        <Dimmer active inverted>
            <Loader active inverted />
        </Dimmer>
    ) : (
        <Table
            padded
            striped
            basic="very"
            fixed={fixed}
            data-cy={controlName}
            singleLine={singleLine}
            className={`mdTable${controlCustomed}${controlScrollable}${controlClass}`}
            {...controlProps}
        >
            {headers && (
                <Table.Header>
                    <Table.Row>
                        {withSelectAll && (
                            <Table.HeaderCell>
                                <CheckboxControl {...selectProps} />
                            </Table.HeaderCell>
                        )}
                        {headers.map((header, index) => (
                            <Table.HeaderCell
                                key={index}
                                content={header.name}
                                textAlign={header.align}
                            />
                        ))}
                    </Table.Row>
                </Table.Header>
            )}
            {children}
        </Table>
    );
};

export default TableControl;

TableControl.propTypes = {
    fixed: PropTypes.bool,
    name: PropTypes.string,
    children: PropTypes.any,
    loading: PropTypes.bool,
    headers: PropTypes.array,
    customed: PropTypes.bool,
    singleLine: PropTypes.bool,
    scrollable: PropTypes.bool,
    selectProps: PropTypes.any,
    className: PropTypes.string,
    withSelectAll: PropTypes.bool,
};

TableControl.defaultProps = {
    name: "",
    headers: [],
    className: "",
    loading: false,
    selectProps: {},
    customed: false,
    singleLine: true,
    scrollable: false,
    withSelectAll: false,
};
