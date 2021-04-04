import React, { useContext } from "react";

// COMPONENTS
import { Card } from "semantic-ui-react";
import CardControl from "../../../controls/card-control";
import TextLabelControl from "../../../controls/text-label-control";
import FlexContainer from "../../../controls/container/flex-container";
import GridContainer from "../../../controls/container/grid-container";

// CONTEXTS
import UserContext from "../../../../contexts/user";

// DATA
import { SCHEDULE_DAYS } from "../../../../data/generic";

const TeleconsultData = () => {
    // CONTEXTS
    const { teleSchedules } = useContext(UserContext);

    return (
        teleSchedules.length > 0 &&
        teleSchedules.map((item) => {
            const days = item.days
                ?.map((_item) => {
                    const value = SCHEDULE_DAYS.find(({ code }) => _item === code);
                    return value?.text;
                })
                .join(", ");
            return (
                <CardControl fluid padded key={days}>
                    <Card.Content>
                        <FlexContainer spaced>
                            <Card.Header content={days} />
                        </FlexContainer>
                        <GridContainer columns={2}>
                            {item.times?.map(({ from, to }) => (
                                <FlexContainer centered>
                                    <TextLabelControl
                                        label="From - To:"
                                        as={Card.Description}
                                        text={`${from} - ${to}`}
                                    />
                                </FlexContainer>
                            ))}
                        </GridContainer>
                    </Card.Content>
                </CardControl>
            );
        })
    );
};

export default TeleconsultData;

TeleconsultData.propTypes = {};

TeleconsultData.defaultProps = {};
