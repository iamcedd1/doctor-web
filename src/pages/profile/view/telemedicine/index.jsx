import React, { useState, useEffect, Fragment } from "react";

// COMPONENTS
import { Grid } from "semantic-ui-react";
import TextControl from "../../../../components/controls/text-control";
import TitleControl from "../../../../components/controls/title-control";
import LabelControl from "../../../../components/controls/label-control";
import DimmerControl from "../../../../components/controls/dimmer-control";
import ResponsiveControl from "../../../../components/controls/responsive-control";
import GridContainer from "../../../../components/controls/container/grid-container";

// DATA
import { SCHEDULES } from "../../../../data/profile";
import ScheduleData from "../../../../tables/profile/schedule-data";

// UTILS
import PropTypes from "prop-types";
import { loader } from "graphql.macro";
import { withRouter } from "react-router-dom";
import { client } from "../../../../utils/api";
import { REGISTER_TELECONSULT_CHANNELS } from "../../../../data/user";

const Telemedicine = ({ history }) => {
    // STATES
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [schedules, setSchedules] = useState([]);

    // FUNCTIONS
    const handleResult = () => {
        return (
            <Fragment>
                <Grid.Column>
                    <GridContainer columns={2}>
                        <LabelControl name="code" padded size="large" label="Channels" />
                        <TextControl name="code" bold text={details?.teleconsultation_channel} />
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl name="code" padded size="large" label="Other Channels" />
                        <TextControl name="code" bold text={details?.channel_others} />
                    </GridContainer>
                </Grid.Column>
            </Fragment>
        );
    };

    useEffect(() => {
        async function handleLoad() {
            if (loading) return;
            setLoading(true);

            const query = loader(
                "../../../../graphql/profile/view-telemedicine-information.graphql"
            );
            await client.doctor
                .query({ query })
                .then(({ data }) => {
                    const { telemedicine } = data.practitioner;
                    const { primaries, channel_others, teleconsultation_channel } = telemedicine;

                    const _primaries = primaries.filter((item) => item.schedules?.length !== 0);
                    const scheds = SCHEDULES.map((item) => {
                        const times = _primaries[0]?.schedules
                            ?.filter(({ day }) => day === item.code)
                            ?.sort((a, b) => {
                                return (
                                    Date.parse(
                                        "1970/01/01 " +
                                            a.time_from.slice(0, -2) +
                                            " " +
                                            a.time_from.slice(-2)
                                    ) -
                                    Date.parse(
                                        "1970/01/01 " +
                                            b.time_from.slice(0, -2) +
                                            " " +
                                            b.time_from.slice(-2)
                                    )
                                );
                            })
                            ?.map(({ time_from, time_to }) => {
                                return `${time_from} - ${time_to}`;
                            });

                        return { ...item, time: times };
                    });

                    const channels = teleconsultation_channel
                        .map((channel) => {
                            const _channel = REGISTER_TELECONSULT_CHANNELS.find(
                                (item) => item.code === channel
                            )?.name;
                            return _channel;
                        })
                        .join(", ");

                    setSchedules(scheds);
                    setDetails({ channel_others, teleconsultation_channel: channels });
                    setLoading(false);
                })
                .catch(() => {
                    history.push("/error/500");
                    return;
                });
        }

        handleLoad();
    }, []);

    return (
        <Grid>
            {loading && <DimmerControl />}
            <Grid.Column width={16} verticalAlign="middle">
                <TitleControl as="h1" title="Telemedicine" />
            </Grid.Column>
            <Grid.Row>
                <Grid.Column>
                    <Grid>
                        <ResponsiveControl as={Grid.Row} columns={2} type="tablet">
                            {handleResult()}
                        </ResponsiveControl>
                        <ResponsiveControl as={Grid.Row} columns={1} type="mobile" width="max">
                            {handleResult()}
                        </ResponsiveControl>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
                <Grid.Column computer={10} tablet={16} mobile={16}>
                    <ScheduleData items={schedules} loading={loading} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default withRouter(Telemedicine);

Telemedicine.propTypes = {
    history: PropTypes.object,
};

Telemedicine.defaultProps = {};
