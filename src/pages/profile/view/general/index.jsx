import React, { useState, Fragment, useEffect } from "react";

// COMPONENTS
import { Grid } from "semantic-ui-react";
import TextControl from "../../../../components/controls/text-control";
import LabelControl from "../../../../components/controls/label-control";
import TitleControl from "../../../../components/controls/title-control";
import DimmerControl from "../../../../components/controls/dimmer-control";
import StatusControl from "../../../../components/controls/status-control";
// import ButtonControl from "../../../../components/controls/button-control";
import BoxContainer from "../../../../components/controls/container/box-container";
import ResponsiveControl from "../../../../components/controls/responsive-control";
import GridContainer from "../../../../components/controls/container/grid-container";

// DATA
import { GENDERS } from "../../../../data/generic";

// UTILS
import moment from "moment";
import PropTypes from "prop-types";
import { loader } from "graphql.macro";
import { withRouter } from "react-router-dom";
import { client } from "../../../../utils/api";

const General = ({ history }) => {
    // STATES
    const [general, setGeneral] = useState({});
    const [loading, setLoading] = useState(false);

    // FUNCTIONS
    const handleResult = () => {
        return (
            <Fragment>
                <Grid.Column>
                    <GridContainer columns={2}>
                        <LabelControl name="code" padded size="large" label="Practitioner Code" />
                        <TextControl name="code" bold text={general?.code} />
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl name="firstName" padded size="large" label="First Name" />
                        <TextControl name="firstName" bold text={general?.first_name} />
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl name="middleName" padded size="large" label="Middle Name" />
                        <TextControl name="middleName" bold text={general?.middle_name} />
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl name="lastName" padded size="large" label="Last Name" />
                        <TextControl name="lastName" bold text={general?.last_name} />
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl name="suffix" padded size="large" label="Suffix" />
                        <TextControl name="suffix" bold text={general?.suffix} />
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl name="gender" padded size="large" label="Gender" />
                        <TextControl
                            bold
                            name="gender"
                            text={GENDERS.find(({ code }) => code === general?.gender)?.name}
                        />
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl name="birthdate" padded size="large" label="Birthdate" />
                        <TextControl bold name="birthdate">
                            {general?.birth_date &&
                                moment(general?.birth_date).format("MMM-DD-YYYY")?.toUpperCase()}
                        </TextControl>
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl name="email" padded size="large" label="Email Address" />
                        <TextControl name="email" bold text={general?.email} />
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl name="mobile" padded size="large" label="Mobile Number" />
                        <BoxContainer>
                            {general?.phones?.length > 0 ? (
                                general?.phones
                                    ?.filter(({ type }) => type === "M")
                                    .map(({ number, country_code }, index) => {
                                        const _number = `+${country_code} ${number}`;
                                        return (
                                            <TextControl
                                                bold
                                                key={index}
                                                text={_number}
                                                name={`mobile-${index}`}
                                            />
                                        );
                                    })
                            ) : (
                                <TextControl name="mobile-0" bold />
                            )}
                        </BoxContainer>
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl
                            padded
                            size="large"
                            name="phicAccredited"
                            label="PHIC Accredited"
                        />
                        <TextControl
                            bold
                            name="phicAccredited"
                            text={general?.phic_accredited}
                            contentType="custom-boolean"
                        />
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl
                            padded
                            size="large"
                            name="phicAccreditationFrom"
                            label="PHIC Accreditation From"
                        />
                        <TextControl bold name="phicAccreditationFrom">
                            {general?.phic_accreditation_from &&
                                moment(general?.phic_accreditation_from)
                                    .format("MMM-DD-YYYY")
                                    ?.toUpperCase()}
                        </TextControl>
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl
                            padded
                            size="large"
                            name="phicAccreditationTo"
                            label="PHIC Accreditation To"
                        />
                        <TextControl bold name="phicAccreditationTo">
                            {general?.phic_accreditation_to &&
                                moment(general?.phic_accreditation_to)
                                    .format("MMM-DD-YYYY")
                                    ?.toUpperCase()}
                        </TextControl>
                    </GridContainer>
                </Grid.Column>
                <Grid.Column>
                    <GridContainer columns={2}>
                        <LabelControl name="prcNumber" padded size="large" label="PRC Number" />
                        <TextControl name="prcNumber" bold text={general?.prc_no} />
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl name="status" padded size="large" label="Status" />

                        <BoxContainer className="mdPaddingTop-5">
                            <StatusControl type="status" status={general?.status} />
                        </BoxContainer>
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl
                            padded
                            size="large"
                            name="affiliationStatus"
                            label="Affiliation Status"
                        />
                        <BoxContainer className="mdPaddingTop-5">
                            <StatusControl
                                type="affiliation_status"
                                status={general?.affiliation_status}
                            />
                        </BoxContainer>
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl padded name="type" size="large" label="Practitioner Type" />
                        <BoxContainer>
                            {general?.types?.length > 0 ? (
                                general?.types?.map(({ code, name }, index) => (
                                    <TextControl
                                        bold
                                        key={code}
                                        text={name}
                                        name={`type-${index}`}
                                    />
                                ))
                            ) : (
                                <TextControl name="type-0" bold />
                            )}
                        </BoxContainer>
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl
                            padded
                            size="large"
                            name="specializations"
                            label="Specializations"
                        />
                        <BoxContainer>
                            {general?.specializations?.length > 0 ? (
                                general?.specializations?.map(({ code, name }, index) => (
                                    <TextControl
                                        bold
                                        key={code}
                                        text={name}
                                        name={`specialization-${index}`}
                                    />
                                ))
                            ) : (
                                <TextControl name="specialization-0" bold />
                            )}
                        </BoxContainer>
                    </GridContainer>
                    <GridContainer columns={2}>
                        <LabelControl
                            padded
                            size="large"
                            name="subSpecializations"
                            label="Sub Specializations"
                        />
                        <BoxContainer>
                            {general?.sub_specializations?.length > 0 ? (
                                general?.sub_specializations?.map(({ code, name }, index) => (
                                    <TextControl
                                        bold
                                        key={code}
                                        text={name}
                                        name={`subSpecialization-${index}`}
                                    />
                                ))
                            ) : (
                                <TextControl name="subSpecialization-0" bold />
                            )}
                        </BoxContainer>
                    </GridContainer>
                </Grid.Column>
                <Grid.Column></Grid.Column>
            </Fragment>
        );
    };

    useEffect(() => {
        async function handleLoad() {
            if (loading) return;

            setLoading(true);
            const query = loader("../../../../graphql/profile/view-general-information.graphql");
            await client.doctor
                .query({ query })
                .then(({ data }) => {
                    setGeneral(data.practitioner);
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
            <Grid.Row>
                <Grid.Column
                    tablet={10}
                    mobile={13}
                    computer={11}
                    widescreen={11}
                    verticalAlign="middle"
                >
                    <TitleControl as="h1" title="General Information" />
                </Grid.Column>

                {/* <Grid.Column widescreen={5} computer={5} tablet={6} mobile={3}>
                    <ResponsiveControl width="max" type="mobile" as={Grid}>
                        <Grid.Column tablet={16}>
                            <ButtonControl
                                basic
                                fluid
                                iconOnly
                                icon="edit"
                                name="edit"
                                size="large"
                            />
                        </Grid.Column>
                    </ResponsiveControl>
                    <ResponsiveControl as={Grid} width="min" type="tablet">
                        <Grid.Column floated="right" widescreen={6} computer={10}>
                            <ButtonControl basic fluid icon="edit" text="Edit" name="edit" />
                        </Grid.Column>
                    </ResponsiveControl>
                </Grid.Column> */}
            </Grid.Row>
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
        </Grid>
    );
};

export default withRouter(General);

General.propTypes = {
    history: PropTypes.object,
};

General.defaultProps = {};
