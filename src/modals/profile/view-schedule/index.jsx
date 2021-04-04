import React, { useState, useEffect } from "react";

// COMPONENTS
import { Grid } from "semantic-ui-react";
import ModalControl from "../../../components/controls/modal-control";

// DATA
import ScheduleData from "../../../tables/profile/schedule-data";

// UTILS
import PropTypes from "prop-types";
import { SCHEDULES } from "../../../data/profile";

const ViewSchedule = ({ data, visible, handleClose }) => {
    // STATES
    const [schedules, setSchedules] = useState([]);

    // FUNCTIONS
    useEffect(() => {
        if (visible) {
            const scheds = SCHEDULES.map((item) => {
                const times = data?.schedules
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
            setSchedules(scheds);
        }
    }, [visible, data]);

    return (
        <ModalControl
            customed
            name="schedule"
            visible={visible}
            handleClose={handleClose}
            title={`${data?.facility?.name} SCHEDULE`}
        >
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <ScheduleData items={schedules} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </ModalControl>
    );
};

export default ViewSchedule;

ViewSchedule.propTypes = {
    data: PropTypes.object,
    visible: PropTypes.bool,
    handleClose: PropTypes.func,
};

ViewSchedule.defaultProps = {
    data: {},
    visible: false,
    handleClose: () => {},
};
