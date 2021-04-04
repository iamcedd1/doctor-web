import React from "react";

// COMPONENTS
import TextControl from "../../controls/text-control";
import LabelControl from "../../controls/label-control";
import { Segment, Grid, Divider } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

const LoaCheckout = ({ data }) => {
    return (
        <Segment className="mdCheckout">
            <Grid>
                <Grid.Row className="mdCheckoutContainer">
                    <Grid.Column mobile={16} computer={7}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <Grid columns="equal" verticalAlign="middle">
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                <LabelControl
                                                    className="mdCheckoutLabel"
                                                    label="TOTAL (PHP)"
                                                />
                                            </Grid.Column>
                                            <Grid.Column width={8} textAlign="right">
                                                <TextControl
                                                    bold
                                                    contentType="custom-currency"
                                                    className="mdCheckoutValue"
                                                    text={data?.total_amount}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider className="mdMarginTop-1 mdMarginBottom-1" />
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <Grid columns="equal" verticalAlign="middle">
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                <LabelControl
                                                    className="mdCheckoutLabel"
                                                    label="DISCOUNT (PHP)"
                                                />
                                            </Grid.Column>
                                            <Grid.Column width={8} textAlign="right">
                                                <TextControl
                                                    bold
                                                    contentType="custom-currency"
                                                    className="mdCheckoutValue"
                                                    text={data?.discount}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={9}>
                        <Grid>
                            <Grid.Row columns="equal">
                                <Grid.Column width={16}>
                                    <LabelControl label="ASSESSED AMOUNT (PHP)" />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <LabelControl label="MEMBER PAYS" />
                                    <TextControl
                                        bold
                                        contentType="custom-currency"
                                        className="mdCheckoutValue"
                                        text={data?.member_pays}
                                    />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <LabelControl label="PAYOR PAYS" />
                                    <TextControl
                                        bold
                                        contentType="custom-currency"
                                        className="mdCheckoutValue"
                                        text={data?.payor_pays}
                                    />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <LabelControl label="MEMBER PAYS" />
                                    <TextControl
                                        bold
                                        contentType="custom-currency"
                                        className="mdCheckoutValue"
                                        text={data?.philhealth_pays}
                                    />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <LabelControl label="PAYOR PAYS" />
                                    <TextControl
                                        bold
                                        contentType="custom-currency"
                                        className="mdCheckoutValue"
                                        text={data?.company_pays}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
};

export default LoaCheckout;

LoaCheckout.propTypes = {
    data: PropTypes.object,
};

LoaCheckout.defaultProps = {};
