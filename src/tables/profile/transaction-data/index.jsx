import React, { Fragment } from "react";

// COMPONENTS
import { Table, Card, Loader } from "semantic-ui-react";
import CardControl from "../../../components/controls/card-control";
import LinkControl from "../../../components/controls/link-control";
import TableControl from "../../../components/controls/table-control";
import DimmerControl from "../../../components/controls/dimmer-control";
import StatusControl from "../../../components/controls/status-control";
import TableCellControl from "../../../components/controls/table-cell-control";
import TextLabelControl from "../../../components/controls/text-label-control";
import ResponsiveControl from "../../../components/controls/responsive-control";
import FlexContainer from "../../../components/controls/container/flex-container";

// UTILS
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// DATA
import { TRANSACTION_HEADERS } from "../../../data/transactions";

const TransactionData = ({ items, loading, history }) => {
    const handleDesktop = () => {
        return (
            <TableControl fixed name="transactions" headers={TRANSACTION_HEADERS}>
                <Table.Body>
                    {loading ? (
                        <Table.Row>
                            <Table.Cell>
                                <DimmerControl />
                            </Table.Cell>
                        </Table.Row>
                    ) : items.length > 0 ? (
                        items.map((item) => (
                            <Table.Row key={item.loaNumber} verticalAlign="middle">
                                <TableCellControl>
                                    <LinkControl
                                        text={item.loa_no}
                                        handleClick={() => {
                                            history.push(`/profile/transactions/${item.claim_no}/view`);
                                        }}
                                    />
                                </TableCellControl>
                                <TableCellControl
                                    content={item.total_amount}
                                    contentType="currency"
                                />
                                <TableCellControl content={item.issued_datetime} />
                                <TableCellControl content={item.availment_date} />
                                <TableCellControl content={item.consultation_mode} />
                                <TableCellControl>
                                    <StatusControl
                                        desktop={85}
                                        tablet={100}
                                        mobile={100}
                                        computer={65}
                                        widescreen={50}
                                        status={item.loa_status}
                                        type="transaction_status"
                                    />
                                </TableCellControl>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row>
                            <TableCellControl
                                textAlign="center"
                                colSpan={TRANSACTION_HEADERS.length}
                            >
                                No transactions found.
                            </TableCellControl>
                        </Table.Row>
                    )}
                </Table.Body>
            </TableControl>
        );
    };

    const handleMobile = () => {
        return loading ? (
            <Loader active />
        ) : items.length > 0 ? (
            items.map((item) => (
                <CardControl
                    fluid
                    as={LinkControl}
                    key={item.loaNumber}
                    onClick={() => {
                        history.push(`/profile/transactions/${item.claim_no}/view`);
                    }}
                >
                    <Card.Content>
                        <FlexContainer flexed={false} spaced>
                            <Card.Header content={item.loa_no} />
                            <StatusControl type="transaction_status" status={item.loa_status} />
                        </FlexContainer>
                        {/* <TextLabelControl label="Member Name:" text={item.member_name} /> */}
                        <TextLabelControl
                            label="Consultation Medium:"
                            text={item.consultation_mode}
                        />
                        <TextLabelControl
                            label="Amount:"
                            text={item.total_amount}
                            contentType="currency"
                        />
                        <FlexContainer>
                            <TextLabelControl label="Issuance Date:" text={item.issued_datetime} />
                            <TextLabelControl label="Availment Date:" text={item.availment_date} />
                        </FlexContainer>
                    </Card.Content>
                </CardControl>
            ))
        ) : (
            <CardControl fluid>
                <Card.Content textAlign="center">
                    <Card.Description>No transactions found.</Card.Description>
                </Card.Content>
            </CardControl>
        );
    };

    return (
        <Fragment>
            <ResponsiveControl type="tablet">{handleDesktop()}</ResponsiveControl>
            <ResponsiveControl type="mobile" width="max">
                {handleMobile()}
            </ResponsiveControl>
        </Fragment>
    );
};

export default withRouter(TransactionData);

TransactionData.propTypes = {
    items: PropTypes.array,
    loading: PropTypes.bool,
    history: PropTypes.object,
};

TransactionData.defaultProps = {
    items: [],
    loading: false,
};
