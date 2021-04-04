import React, { useState, useEffect, Fragment, lazy } from "react";

// COMPONENTS
import { Grid, Breadcrumb, Segment } from "semantic-ui-react";
import TextControl from "../../../../../components/controls/text-control";
import LabelControl from "../../../../../components/controls/label-control";
import TitleControl from "../../../../../components/controls/title-control";
import ButtonControl from "../../../../../components/controls/button-control";
import StatusControl from "../../../../../components/controls/status-control";
import LoaCheckout from "../../../../../components/transactions/loa-checkout";
import DimmerControl from "../../../../../components/controls/dimmer-control";
import SuspenseControl from "../../../../../components/controls/suspense-control";
import LoaInformation from "../../../../../components/transactions/loa-information";
import ResponsiveControl from "../../../../../components/controls/responsive-control";
import FlexContainer from "../../../../../components/controls/container/flex-container";

// DATA
import { VIEW_TRANSACTION_BREADCRUMBS } from "../../../../../data/transactions";

// UTILS
import moment from "moment";
import PropTypes from "prop-types";
import { loader } from "graphql.macro";
import { withRouter } from "react-router-dom";
import { client } from "../../../../../utils/api";
import { isObjectEmpty } from "../../../../../utils/helpers";

// PANELS
const LoaInformationPanel = lazy(() =>
    import("../../../../../components/transactions/loa-information-panel")
);

const ViewTransaction = ({ match }) => {
    // STATES
    const [loading, setLoading] = useState(false);
    const [transaction, setTransaction] = useState({});
    const [panelState, setPanelState] = useState(false);
    const [tabBreadcrumbs, setTabBreadcrumbs] = useState([]);

    // MODAL STATES
    const [modalData, setModalData] = useState({});
    const [modalConfirm, setModalConfirm] = useState(false);

    // FUNCTIONS
    const handleExport = () => {};

    useEffect(() => {
        async function handleLoad() {
            if (loading) return;
            setLoading(true);

            const breadcrumbs = VIEW_TRANSACTION_BREADCRUMBS.map((item) => {
                if (!item.content) {
                    return { ...item, content: `CLAIM#${match.params.code}` };
                }
                return item;
            });
            setTabBreadcrumbs(breadcrumbs);

            const params = { claimNo: match.params.code };
            const query = loader("../../../../../graphql/profile/view-transaction.graphql");

            await client.doctor
                .query({ query, variables: params })
                .then(({ data }) => {
                    const { transaction } = data;

                    const member = {
                        plan_code: transaction.plan_code,
                        plan_name: transaction.plan_name,
                        card_no: transaction.member_card_no,
                        account_code: transaction.account_code,
                        account_name: transaction.account_name,
                        name: `${transaction.member_first_name} ${transaction.member_last_name}`,
                    };

                    const facility = {
                        code: transaction.facility_code,
                        name: transaction.facility_name,
                        type: transaction.facility_type,
                        status: transaction.facility_status,
                        address: transaction.facility_address,
                    };

                    const general = {
                        claim_no: match.params.code,
                        coverage: transaction.coverage_name,
                        created_datetime: moment(transaction.issued_datetime)
                            .format("MMM-DD-YYYY HH:mm:ss")
                            .toUpperCase(),
                    };

                    const checkout = {
                        total_amount: transaction.total_amount,
                    };

                    setTransaction({
                        checkout,
                        loa_no: transaction.loa_no,
                        status: transaction.loa_status,
                        issued_date: moment(transaction.issued_datetime)
                            .format("MMM-DD-YYYY")
                            .toUpperCase(),
                        valid_until: moment(transaction.validity_date)
                            .format("MMM-DD-YYYY")
                            .toUpperCase(),
                        chief_complaints: transaction.chief_complaints,
                        diagnosis: transaction.diagnosis,
                        approved_by: transaction.approved_by,
                        details: { member, facility, general },
                    });

                    setLoading(false);
                })
                .catch((err) => console.log(err));
        }

        if (isObjectEmpty(transaction)) handleLoad();
    }, [match]);

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={16}>
                    <TitleControl as="h1" title="View Transaction" />
                </Grid.Column>
                <ResponsiveControl as={Fragment} width="min" type="tablet">
                    <Grid.Column width={16} verticalAlign="middle">
                        <Breadcrumb
                            sections={tabBreadcrumbs}
                            data-cy="mdTabBreadcrumbs"
                            className="mdTabBreadcrumbs"
                            icon={{ name: "right angle", color: "grey" }}
                        />
                    </Grid.Column>
                </ResponsiveControl>
            </Grid.Row>
            {loading && <DimmerControl />}
            <Grid.Row>
                <Grid.Column widescreen={11} largeScreen={10} computer={8} tablet={8} mobile={11}>
                    <Grid>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <LabelControl label="LOA Number" />
                                <FlexContainer flexed={false} centered="vertical">
                                    <TextControl bold text={transaction?.loa_no} />
                                    <StatusControl
                                        type="transaction_status"
                                        status={transaction?.status}
                                    />
                                </FlexContainer>
                            </Grid.Column>
                            <Grid.Column>
                                <LabelControl label="Validity Date" />
                                <TextControl bold>
                                    {`${transaction?.issued_date} to ${transaction?.valid_until}`}
                                </TextControl>
                            </Grid.Column>
                            <Grid.Column>
                                <LabelControl label="Chief Complaint" />
                                <TextControl bold>
                                    {transaction?.complaints?.join(", ")}
                                </TextControl>
                            </Grid.Column>
                            <Grid.Column>
                                <LabelControl className="text-bold" label="FINAL DIAGNOSIS" />
                            </Grid.Column>
                            <Grid.Column>
                                <LabelControl label="Primary" />
                                <TextControl bold text={transaction?.diagnosis} />
                            </Grid.Column>
                            <Grid.Column>
                                <LabelControl label="Approved By" />
                                <TextControl bold text={transaction?.approved_by} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <ResponsiveControl as={Fragment} width="min" type="tablet">
                    <Grid.Column
                        widescreen={5}
                        largeScreen={6}
                        computer={8}
                        tablet={8}
                        floated="right"
                    >
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={7} floated="right">
                                    <ButtonControl
                                        basic
                                        fluid
                                        text="Export"
                                        name="Export"
                                        icon="upload"
                                        onClick={handleExport}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Segment>
                            <LoaInformation loading={loading} data={transaction?.details} />
                        </Segment>
                    </Grid.Column>
                </ResponsiveControl>
                <ResponsiveControl as={Fragment} width="max" type="mobile">
                    <Grid.Column mobile={5} floated="right" textAlign="right">
                        <ButtonControl
                            basic
                            iconOnly
                            name="Export"
                            icon="upload"
                            onClick={handleExport}
                        />
                        <ButtonControl
                            basic
                            iconOnly
                            icon="bars"
                            name="Info"
                            onClick={() => setPanelState(true)}
                        />
                    </Grid.Column>
                    <SuspenseControl>
                        <LoaInformationPanel
                            loading={loading}
                            visible={panelState}
                            data={transaction?.details}
                            handleShow={() => setPanelState(true)}
                            handleHide={() => setPanelState(false)}
                        />
                    </SuspenseControl>
                </ResponsiveControl>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column widescreen={6} largeScreen={10} computer={13} tablet={12} mobile={16}>
                    <LoaCheckout data={transaction?.checkout} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default withRouter(ViewTransaction);

ViewTransaction.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
};

ViewTransaction.defaultProps = {};
