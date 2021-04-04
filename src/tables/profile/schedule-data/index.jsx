import React, { Fragment } from "react";

// COMPONENTS
import { Table, Card, Loader } from "semantic-ui-react";
import TextControl from "../../../components/controls/text-control";
import CardControl from "../../../components/controls/card-control";
import TableControl from "../../../components/controls/table-control";
import DimmerControl from "../../../components/controls/dimmer-control";
import TableCellControl from "../../../components/controls/table-cell-control";
import BoxContainer from "../../../components/controls/container/box-container";
import ResponsiveControl from "../../../components/controls/responsive-control";

// UTILS
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// DATA
import { SCHEDULE_HEADERS } from "../../../data/profile";

const ScheduleData = ({ items, loading }) => {
    const handleDesktop = () => {
        return (
            <TableControl fixed name="schedules" headers={SCHEDULE_HEADERS}>
                <Table.Body>
                    {loading ? (
                        <Table.Row>
                            <Table.Cell>
                                <DimmerControl />
                            </Table.Cell>
                        </Table.Row>
                    ) : (
                        items.map((item) => (
                            <Table.Row key={item.loaNumber}>
                                <TableCellControl bold content={item.name} />
                                <TableCellControl>
                                    {item.time?.map((time, index) => (
                                        <TextControl key={index} text={time} />
                                    ))}
                                </TableCellControl>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </TableControl>
        );
    };

    const handleMobile = () => {
        return loading ? (
            <Loader active />
        ) : (
            items.map((item) => (
                <CardControl fluid key={item.loaNumber}>
                    <Card.Content>
                        <Card.Header content={item.name} />
                        <BoxContainer>
                            {item.time?.length > 0 ? (
                                item.time?.map((time, index) => (
                                    <TextControl key={index} text={time} />
                                ))
                            ) : (
                                <TextControl centered text="No schedule added" />
                            )}
                        </BoxContainer>
                    </Card.Content>
                </CardControl>
            ))
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

export default withRouter(ScheduleData);

ScheduleData.propTypes = {
    items: PropTypes.array,
    loading: PropTypes.bool,
};

ScheduleData.defaultProps = {
    items: [],
    loading: false,
};
