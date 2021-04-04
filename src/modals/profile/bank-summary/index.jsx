import React from "react";

// COMPONENTS
import { Grid } from "semantic-ui-react";
import TextControl from "../../../components/controls/text-control";
import ModalControl from "../../../components/controls/modal-control";
import TitleControl from "../../../components/controls/title-control";
import LabelControl from "../../../components/controls/label-control";
import ImageControl from "../../../components/controls/image-control";
import ButtonControl from "../../../components/controls/button-control";

// UTILS
import PropTypes from "prop-types";

const BankSummary = ({ data, loading, visible, handleClose, handleSubmit }) => {
    return (
        <ModalControl
            size="tiny"
            name="summary"
            animation="none"
            visible={visible}
            handleClose={handleClose}
        >
            <Grid padded>
                <Grid.Row>
                    <Grid.Column>
                        <ImageControl centered size="tiny" source="/images/warning.png" />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <TitleControl
                            centered
                            size="large"
                            name="summary"
                            title="Bank Information Summary"
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <LabelControl name="bank" label="Bank Name" />
                    </Grid.Column>
                    <Grid.Column>
                        <TextControl name="bank" padded={false} text={data?.bank} />
                    </Grid.Column>
                    <Grid.Column>
                        <LabelControl name="account" label="Bank Account Number" />
                    </Grid.Column>
                    <Grid.Column>
                        <TextControl name="account" padded={false} text={data?.account} />
                    </Grid.Column>
                    <Grid.Column>
                        <LabelControl name="tin" label="TIN" />
                    </Grid.Column>
                    <Grid.Column>
                        <TextControl name="tin" padded={false} text={data?.tin} />
                    </Grid.Column>
                    <Grid.Column>
                        <LabelControl
                            help
                            name="rate"
                            helpContent={data?.tip}
                            label="Withholding Tax Rate"
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <TextControl
                            name="rate"
                            padded={false}
                            text={data?.rate}
                            contentType="percentage"
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <LabelControl name="status" label="VAT Status" />
                    </Grid.Column>
                    <Grid.Column>
                        <TextControl name="status" padded={false} text={data?.status} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2}>
                    <Grid.Column>
                        <ButtonControl
                            fluid
                            color="grey"
                            name="cancel"
                            onClick={handleClose}
                            text="Continue Editing"
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <ButtonControl
                            fluid
                            name="submit"
                            text="Submit"
                            loading={loading}
                            onClick={handleSubmit}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </ModalControl>
    );
};

export default BankSummary;

BankSummary.propTypes = {
    data: PropTypes.object,
    history: PropTypes.any,
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func,
};

BankSummary.defaultProps = {
    data: {},
    visible: false,
    loading: false,
    handleClose: () => {},
    handleSubmit: () => {},
};
