import React from "react";

// COMPONENTS
import {Responsive} from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import {getWidth, isTablet, isDesktop, isMobile} from "../../../utils/helpers";

const ResponsiveControl = ({type, width, children, ...controlProps}) => {
  // FUNCTIONS
  const handleDesktop = () => {
    return width === "min" ? (
            <Responsive
              getWidth={getWidth}
              minWidth={Responsive.onlyComputer.minWidth}
              {...controlProps}
            >
              {children}
            </Responsive>
        ) : (
            <Responsive
              getWidth={getWidth}
              maxWidth={Responsive.onlyComputer.maxWidth}
              {...controlProps}
            >
              {children}
            </Responsive>
        );
  };

  const handleTablet = () => {
    return width === "min" ? (
            <Responsive
              getWidth={getWidth}
              minWidth={Responsive.onlyTablet.minWidth}
              {...controlProps}
            >
              {children}
            </Responsive>
        ) : (
            <Responsive
              getWidth={getWidth}
              maxWidth={Responsive.onlyTablet.maxWidth}
              {...controlProps}
            >
              {children}
            </Responsive>
        );
  };

  const handleMobile = () => {
    return width === "min" ? (
            <Responsive
              getWidth={getWidth}
              minWidth={Responsive.onlyMobile.minWidth}
              {...controlProps}
            >
              {children}
            </Responsive>
        ) : (
            <Responsive
              getWidth={getWidth}
              maxWidth={Responsive.onlyMobile.maxWidth}
              {...controlProps}
            >
              {children}
            </Responsive>
        );
  };

  return (
    <React.Fragment>
      {isMobile(type) && handleMobile()}
      {isTablet(type) && handleTablet()}
      {isDesktop(type) && handleDesktop()}
    </React.Fragment>
  );
};

export default ResponsiveControl;

ResponsiveControl.propTypes = {
  children: PropTypes.any,
  width: PropTypes.oneOf(["min", "max"]),
  type: PropTypes.oneOf(["desktop", "tablet", "mobile"]),
};

ResponsiveControl.defaultProps = {
  width: "min",
  type: "desktop",
};
