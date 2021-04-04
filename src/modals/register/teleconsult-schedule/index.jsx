import React, { useState, useContext, Fragment, useEffect } from "react";

// COMPONENTS
import { Grid, Form, Divider } from "semantic-ui-react";
import ChipControl from "../../../components/controls/chip-control";
import TimeControl from "../../../components/controls/time-control";
import ModalControl from "../../../components/controls/modal-control";
import LabelControl from "../../../components/controls/label-control";
import ErrorControl from "../../../components/controls/error-control";
import ButtonControl from "../../../components/controls/button-control";
import ResponsiveControl from "../../../components/controls/responsive-control";
import ButtonIconControl from "../../../components/controls/button-icon-control";
import GridContainer from "../../../components/controls/container/grid-container";

// CONTEXTS
import UserContext from "../../../contexts/user";

// DATA
import { SCHEDULE_DAYS } from "../../../data/generic";

// MODAL
import TeleconsultModalData from "../../../components/general/register/teleconsult-modal-data";

// UTILS
import PropTypes from "prop-types";
import {
    checkFilter,
    actionFilter,
    handleEditMap,
    convertToTime,
    checkTimeOverlap,
} from "../../../utils/helpers";
import { alertMessage } from "../../../utils/alert";

const TeleconsultSchedule = ({ visible, handleClose }) => {
    // CONTEXTS
    const { teleSchedules, setTeleSchedules } = useContext(UserContext);

    // CONTANTS
    const time = { from: "", to: "" };

    // STATES
    const [days, setDays] = useState([]);
    const [times, setTimes] = useState([time]);
    const [loading, setLoading] = useState(false);
    const [schedules, setSchedules] = useState([]);

    // ERROR STATES
    const [dayError, setDayError] = useState("");

    // FUNCTIONS
    const handleDays = (width) => {
        return (
            <Form.Field width={width}>
                <LabelControl size="large" label="Day(s)" className="no-spacing" />
                <GridContainer columns={7}>
                    {SCHEDULE_DAYS.map(({ code, name, text }) => (
                        <ChipControl
                            action
                            key={code}
                            name={name}
                            text={name}
                            title={text}
                            selected={checkFilter(days, code)}
                            onClick={() => {
                                setDayError("");
                                setDays(actionFilter(days, code));
                            }}
                        />
                    ))}
                </GridContainer>
                <ErrorControl name="day" error={dayError} />
            </Form.Field>
        );
    };

    const handleTime = (item, index, width) => {
        return (
            <Fragment>
                <TimeControl
                    name="from"
                    index={index}
                    width={width}
                    label="Time From"
                    value={item.from}
                    error={item.fromError}
                    onChange={handleEditField}
                />
                <TimeControl
                    name="to"
                    width={width}
                    index={index}
                    label="Time To"
                    value={item.to}
                    error={item.toError}
                    onChange={handleEditField}
                />
            </Fragment>
        );
    };

    const handleActions = () => {
        return (
            <Fragment>
                <ButtonControl
                    basic
                    color="grey"
                    name="cancel"
                    text="Cancel"
                    onClick={handleCloseModal}
                />
                <ButtonControl name="save" text="Save Changes" onClick={handleSaveChanges} />
            </Fragment>
        );
    };

    const handleEditField = (e, data) => {
        const { name, value, index } = data;
        const errorName = `${name}Error`;
        const idx = parseInt(index);

        handleEditMap({
            name,
            value,
            errorName,
            index: idx,
            items: times,
            handleSet: setTimes,
        });
    };

    const handleRemoveField = (index) => {
        const _times = times.filter((_, idx) => idx !== index);
        setTimes(_times);
    };

    const handleValidation = () => {
        let valid = true;

        if (days.length > 0) {
            setDayError("");
        } else {
            setDayError("Select day(s)");
            valid = false;
        }

        const time = times.map((item, index) => {
            const { from, to } = item;
            let result;

            if (from) {
                result = { ...item, fromError: "" };
            } else {
                valid = false;
                result = { ...item, fromError: "Select time from" };
            }

            if (to) {
                result = { ...item, ...result, toError: "" };
            } else {
                valid = false;
                result = { ...item, ...result, toError: "Select time to" };
            }

            if (from && to) {
                const timeFrom = convertToTime(from);
                const timeTo = convertToTime(to);
                if (timeFrom.isAfter(timeTo) || to === from) {
                    result = {
                        ...item,
                        ...result,
                        toError: "Invalid time selection",
                        fromError: "Invalid time selection",
                    };
                    valid = false;
                } else {
                    let _existingTimes = [];
                    for (const _item of schedules) {
                        const exists = days?.some((e) => _item.days?.includes(e));
                        if (exists) {
                            for (const _time of _item?.times) {
                                const _times = { from: _time.from, to: _time.to };
                                _existingTimes = [..._existingTimes, _times];
                            }
                        }
                    }

                    let overlapExisting = false;
                    if (_existingTimes.length > 0) {
                        overlapExisting = checkTimeOverlap({
                            timeTo: to,
                            timeFrom: from,
                            values: _existingTimes,
                        });
                    }

                    const overlapNew = checkTimeOverlap({
                        index,
                        timeTo: to,
                        values: times,
                        timeFrom: from,
                        withIndex: true,
                    });

                    if (overlapExisting || overlapNew) {
                        result = {
                            ...item,
                            ...result,
                            toError: "Overlapping schedules",
                            fromError: "Overlapping schedules",
                        };
                        valid = false;
                    }
                }
            }

            return { ...item, ...result };
        });

        setTimes(time);
        return valid;
    };

    const handleAddSchedule = async () => {
        const isValid = handleValidation();

        if (isValid) {
            setLoading(true);
            if (schedules.length > 0) {
                let exists = false;
                let added = false;
                const schedule = await schedules.map((item) => {
                    if (days.length === item.days?.length) {
                        exists = days?.every((e) => item.days?.includes(e));
                        if (exists) {
                            added = true;
                            return { ...item, times: [...item.times, ...times] };
                        }
                    }

                    return item;
                });

                if (exists && added) {
                    setSchedules(schedule);
                } else {
                    const item = { days, times: [...times] };
                    setSchedules([...schedule, item]);
                }
            } else {
                const item = { days, times: [...times] };
                setSchedules([item]);
            }

            setDays([]);
            setTimes([time]);
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        alertMessage
            .showMessage({
                title: "Discard Changes?",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes, discard changes",
                cancelButtonText: "No, continue editing",
            })
            .then((result) => {
                if (result.value) {
                    handleClose();
                }
            });
    };

    const handleSaveChanges = () => {
        setTeleSchedules(schedules);
        handleClose();
    };

    const handleRemoveTime = (from, to, index) => {
        const schedule = schedules
            .map((item, idx) => {
                if (idx === index) {
                    const _times = item.times?.filter(
                        (time) => time?.from !== from && time?.to !== to
                    );
                    if (_times.length > 0) {
                        return { ...item, times: _times };
                    }

                    return null;
                }

                return item;
            })
            .filter((item) => item !== null);

        setSchedules(schedule);
    };

    useEffect(() => {
        setSchedules(teleSchedules);
        return () => {
            setSchedules([]);
        };
    }, []);

    return (
        <ModalControl
            customed
            name="schedule"
            scrolling={true}
            centered={false}
            visible={visible}
            withTransition={false}
            closeOnDimmerClick={false}
            closeOnDocumentClick={false}
            handleClose={handleCloseModal}
            actionButtons={handleActions()}
            title="Teleconsultation Schedule"
        >
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Form unstackable>
                            <Form.Group>
                                <ResponsiveControl as={Fragment} width="min" type="tablet">
                                    {handleDays(9)}
                                </ResponsiveControl>
                                <ResponsiveControl as={Fragment} width="max" type="mobile">
                                    {handleDays(16)}
                                </ResponsiveControl>
                            </Form.Group>
                            {times.map((item, index) => (
                                <Form.Group key={index} className="mdTeleconsultationTime">
                                    <ResponsiveControl as={Fragment} width="min" type="tablet">
                                        {handleTime(item, index, 4)}
                                    </ResponsiveControl>
                                    <ResponsiveControl as={Fragment} width="max" type="mobile">
                                        {handleTime(item, index, 7)}
                                    </ResponsiveControl>
                                    <Form.Field
                                        className={`${
                                            item.fromError || item.toError
                                                ? "align-center"
                                                : "align-bottom"
                                        }`}
                                    >
                                        {index === 0 ? (
                                            <ButtonIconControl
                                                name="add"
                                                icon="plus"
                                                handleClick={() => setTimes([...times, time])}
                                            />
                                        ) : (
                                            <ButtonIconControl
                                                icon="minus"
                                                color="grey"
                                                name="remove"
                                                handleClick={() => handleRemoveField(index)}
                                            />
                                        )}
                                    </Form.Field>
                                </Form.Group>
                            ))}
                            <Form.Group className="mdMarginTop-16 mdPaddingTop-16">
                                <ResponsiveControl as={Fragment} width="min" type="tablet">
                                    <Form.Field width="5">
                                        <ButtonControl
                                            fluid
                                            name="submit"
                                            text="Add Schedule"
                                            onClick={handleAddSchedule}
                                        />
                                    </Form.Field>
                                </ResponsiveControl>
                                <ResponsiveControl as={Fragment} width="max" type="mobile">
                                    <Form.Field width="16">
                                        <ButtonControl
                                            fluid
                                            name="submit"
                                            text="Add Schedule"
                                            onClick={handleAddSchedule}
                                        />
                                    </Form.Field>
                                </ResponsiveControl>
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid.Row>

                <Divider />
                <Grid.Row>
                    <Grid.Column>
                        <TeleconsultModalData
                            items={schedules}
                            loading={loading}
                            handleRemove={handleRemoveTime}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </ModalControl>
    );
};

export default TeleconsultSchedule;

TeleconsultSchedule.propTypes = {
    visible: PropTypes.bool,
    handleClose: PropTypes.func,
};

TeleconsultSchedule.defaultProps = {
    visible: false,
    handleClose: () => {},
};
