import React, { Fragment } from "react";

// COMPONENTS
import { Grid } from "semantic-ui-react";
import TextControl from "../../controls/text-control";
import LabelControl from "../../controls/label-control";
import TitleControl from "../../controls/title-control";
import DimmerControl from "../../controls/dimmer-control";
import PanelItemControl from "../../panel/panel-item-control";
import ResponsiveControl from "../../controls/responsive-control";
import FlexContainer from "../../controls/container/flex-container";

// DATA
import { LOA_INFORMATION } from "../../../data/transactions";

// UTILS
import PropTypes from "prop-types";
import { isObjectEmpty } from "../../../utils/helpers";

const LoaInformation = ({ data, loading }) => {
    // FUNCTIONS
    const handleDesktop = () => {
        return (
            <Fragment>
                {LOA_INFORMATION.map(({ _key, title, items }) => (
                    <Grid.Row key={_key}>
                        <Grid.Column>
                            <TitleControl as="h3" spacing="none" title={title} />
                            {items.map(({ key, label }) => (
                                <FlexContainer key={key}>
                                    <LabelControl padded label={label} />
                                    <TextControl>
                                        {!isObjectEmpty(data) && !loading && data[_key][key]}
                                    </TextControl>
                                </FlexContainer>
                            ))}
                        </Grid.Column>
                    </Grid.Row>
                ))}
            </Fragment>
        );
    };

    const handleMobile = () => {
        return (
            <Fragment>
                {LOA_INFORMATION.map(({ _key, title, items }) => (
                    <Grid.Row key={_key}>
                        <Grid.Column>
                            <TitleControl as="h3" spacing="none" title={title} />
                            {items.map(({ key, label }) => (
                                <PanelItemControl
                                    key={key}
                                    label={label}
                                    text={!isObjectEmpty(data) && !loading && data[_key][key]}
                                />
                            ))}
                        </Grid.Column>
                    </Grid.Row>
                ))}
            </Fragment>
        );
    };

    return (
        <Grid>
            {loading && <DimmerControl />}
            <ResponsiveControl as={Fragment}>{handleDesktop()}</ResponsiveControl>
            <ResponsiveControl type="mobile" width="max" as={Fragment}>
                {handleMobile()}
            </ResponsiveControl>
        </Grid>
    );
};

export default LoaInformation;

LoaInformation.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
};

LoaInformation.defaultProps = {
    data: {},
    loading: false,
};
