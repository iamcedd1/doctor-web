import React, { useState, useEffect, lazy } from "react";

// COMPONENTS
import { Grid, Card } from "semantic-ui-react";
import CardControl from "../../../../components/controls/card-control";
import TitleControl from "../../../../components/controls/title-control";
import DimmerControl from "../../../../components/controls/dimmer-control";
import SuspenseControl from "../../../../components/controls/suspense-control";
import GridContainer from "../../../../components/controls/container/grid-container";

// CONTEXTS

// UTILS
import PropTypes from "prop-types";
import { loader } from "graphql.macro";
import { withRouter } from "react-router-dom";
import { client } from "../../../../utils/api";

// MODALS
const ViewSchedule = lazy(() => import("../../../../modals/profile/view-schedule"));

const Schedules = ({ history }) => {
    // CONTEXTS

    // STATES
    const [loading, setLoading] = useState(false);
    const [facilities, setFacilities] = useState([]);

    // MODAL STATES
    const [modalData, setModalData] = useState({});
    const [modalSchedule, setModalSchedule] = useState(false);

    // FUNCTIONS
    useEffect(() => {
        async function handleLoad() {
            if (loading) return;
            setLoading(true);

            const query = loader("../../../../graphql/profile/view-schedules.graphql");
            await client.doctor
                .query({ query })
                .then(({ data }) => {
                    const { primaries } = data.practitioner;
                    setFacilities(primaries);
                })
                .catch(() => {
                    history.push("/error/500");
                    return;
                });

            setLoading(false);
        }

        handleLoad();
    }, []);

    return (
        <Grid>
            {loading && <DimmerControl />}
            <Grid.Column width={16} verticalAlign="middle">
                <TitleControl as="h1" title="Schedules" />
            </Grid.Column>
            <Grid.Row>
                <Grid.Column width={16}>
                    <GridContainer widescreen={4} computer={3} desktop={2} tablet={2} mobile={1}>
                        {facilities?.map((item) => {
                            const address = item.facility?.addresses?.find(
                                ({ type }) => type === "P"
                            );
                            const city = `${address?.city}, ${address?.province}`;
                            const actions = [
                                {
                                    name: "view",
                                    text: "View Schedule",
                                    handleAction: () => {
                                        setModalData(item);
                                        setModalSchedule(true);
                                    },
                                },
                            ];

                            return (
                                <CardControl fluid actions={actions} key={item.facility?.code}>
                                    <Card.Content>
                                        <Card.Header>
                                            {item.facility?.name} ({item.coverage_name})
                                        </Card.Header>
                                        <Card.Description content={address?.address_line_1} />
                                        <Card.Description content={city} />
                                    </Card.Content>
                                </CardControl>
                            );
                        })}
                    </GridContainer>
                </Grid.Column>
            </Grid.Row>
            <SuspenseControl>
                {modalSchedule && (
                    <ViewSchedule
                        data={modalData}
                        visible={modalSchedule}
                        handleClose={() => {
                            setModalData({});
                            setModalSchedule(false);
                        }}
                    />
                )}
            </SuspenseControl>
        </Grid>
    );
};

export default withRouter(Schedules);

Schedules.propTypes = {
    history: PropTypes.object,
};

Schedules.defaultProps = {};
