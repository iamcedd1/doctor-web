import React from "react";

// COMPONENTS
import { Grid, Image } from "semantic-ui-react";
import TitleControl from "../../controls/title-control";
import ButtonControl from "../../controls/button-control";
import BoxContainer from "../../controls/container/box-container";
import ResponsiveControl from "../../controls/responsive-control";

// UTILS
import PropTypes from "prop-types";

const ErrorContainer = ({ code, title, image, handleReturn, handleReport }) => {
    return (
        <Grid padded className="mdErrorContainer" columns={2}>
            <Grid.Column computer={4} tablet={6} mobile={8} className="mdErrorImage">
                <ResponsiveControl as={Image} src={image} size="big" type="tablet" width="min" />
                <ResponsiveControl as={Image} src={image} size="big" type="mobile" width="max" />
            </Grid.Column>
            <Grid.Column
                computer={12}
                tablet={10}
                mobile={16}
                verticalAlign="middle"
                className="mdErrorContent"
            >
                <div className="mdErrorDescription">
                    <TitleControl as="h1" title={`ERROR ${code} - ${title}`} />
                    <span>Something went wrong. You may either:</span>
                </div>
                <div className="mdErrorActions">
                    <BoxContainer padded="top">
                        <Grid columns={2}>
                            <Grid.Column computer={6} tablet={8} mobile={16}>
                                <ButtonControl
                                    fluid
                                    basic
                                    size="huge"
                                    onClick={handleReturn}
                                    text="Return to previous page"
                                />
                            </Grid.Column>
                            <Grid.Column computer={6} tablet={8} mobile={16}>
                                <ButtonControl
                                    fluid
                                    size="huge"
                                    text="Submit Report"
                                    onClick={handleReport}
                                />
                            </Grid.Column>
                        </Grid>
                    </BoxContainer>
                </div>
            </Grid.Column>
        </Grid>
    );
};

export default ErrorContainer;

ErrorContainer.propTypes = {
    code: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    handleReturn: PropTypes.func,
    handleReport: PropTypes.func,
};

ErrorContainer.defaultProps = {
    code: "",
    title: "",
    handleReturn: () => {},
    handleReport: () => {},
    image: "/images/error/error.png",
};
