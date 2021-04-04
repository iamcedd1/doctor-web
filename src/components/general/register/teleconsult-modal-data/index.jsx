import React, { Fragment } from "react";

// COMPONENTS
import { Table, Loader, Card } from "semantic-ui-react";
import CardControl from "../../../controls/card-control";
import TextControl from "../../../controls/text-control";
import IconControl from "../../../controls/icon-control";
import TableControl from "../../../controls/table-control";
import DimmerControl from "../../../controls/dimmer-control";
import TableCellControl from "../../../controls/table-cell-control";
import TextLabelControl from "../../../controls/text-label-control";
import ResponsiveControl from "../../../controls/responsive-control";
import FlexContainer from "../../../controls/container/flex-container";
import GridContainer from "../../../controls/container/grid-container";

// DATA
import { SCHEDULE_DAYS } from "../../../../data/generic";
import { REGISTER_TELECONSULT_SCHEDULE_HEADERS } from "../../../../data/user";

// UTILS
import PropTypes from "prop-types";

const TeleconsultModalData = ({ items, loading, handleRemove }) => {
    const handleDesktop = () => {
        return (
            <TableControl
                fixed={true}
                name="schedules"
                singleLine={false}
                headers={REGISTER_TELECONSULT_SCHEDULE_HEADERS}
            >
                <Table.Body>
                    {loading ? (
                        <Table.Row>
                            <Table.Cell>
                                <DimmerControl />
                            </Table.Cell>
                        </Table.Row>
                    ) : items.length > 0 ? (
                        items.map((item, index) => {
                            const days = item.days
                                ?.map((_item) => {
                                    const value = SCHEDULE_DAYS.find(({ code }) => _item === code);
                                    return value?.text;
                                })
                                .join(", ");
                            return (
                                <Table.Row key={index} verticalAlign="top">
                                    <TableCellControl bold content={days} />
                                    <TableCellControl>
                                        {item.times?.map(({ from, to }, idx) => (
                                            <FlexContainer>
                                                <TextControl className="no-spacing" key={idx}>
                                                    {`${from} - ${to}`}
                                                    <IconControl
                                                        link
                                                        color="red"
                                                        icon="close"
                                                        name={`removeTime-${index}${idx}`}
                                                        onClick={() =>
                                                            handleRemove(from, to, index)
                                                        }
                                                    />
                                                </TextControl>
                                            </FlexContainer>
                                        ))}
                                    </TableCellControl>
                                </Table.Row>
                            );
                        })
                    ) : (
                        <Table.Row>
                            <TableCellControl
                                colSpan={REGISTER_TELECONSULT_SCHEDULE_HEADERS.length}
                                textAlign="center"
                            >
                                No schedule added.
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
            items.map((item, index) => {
                const days = item.days
                    ?.map((_item) => {
                        const value = SCHEDULE_DAYS.find(({ code }) => _item === code);
                        return value?.text;
                    })
                    .join(", ");
                return (
                    <CardControl fluid name="schedules" key={item.evoucherNo}>
                        <Card.Content>
                            <FlexContainer spaced>
                                <Card.Header content={days} />
                            </FlexContainer>
                            <GridContainer columns={2}>
                                {item.times?.map(({ from, to }, idx) => (
                                    <FlexContainer centered>
                                        <TextLabelControl
                                            label="From - To:"
                                            as={Card.Description}
                                            text={`${from} - ${to}`}
                                        />
                                        <IconControl
                                            link
                                            color="red"
                                            icon="close"
                                            name={`removeTime-${index}${idx}`}
                                            onClick={() => handleRemove(from, to, index)}
                                        />
                                    </FlexContainer>
                                ))}
                            </GridContainer>
                        </Card.Content>
                    </CardControl>
                );
            })
        ) : (
            <TextControl bold centered text="No schedule added." />
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

export default TeleconsultModalData;

TeleconsultModalData.propTypes = {
    items: PropTypes.array,
    loading: PropTypes.bool,
    handleRemove: PropTypes.func,
};

TeleconsultModalData.defaultProps = {
    items: [],
    loading: true,
    handleRemove: () => {},
};
