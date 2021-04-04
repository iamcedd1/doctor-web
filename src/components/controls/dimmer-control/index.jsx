import React from "react";

// COMPONENTS
import { Dimmer, Loader } from "semantic-ui-react";

const DimmerControl = () => {
    return (
        <Dimmer data-cy="mdDimmer" className="mdDimmer" active inverted>
            <Loader data-cy="mdLoader" />
        </Dimmer>
    );
};

export default DimmerControl;
