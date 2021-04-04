import React, { useContext, useEffect, useState, useRef, Fragment } from "react";

// COMPONENTS
import HeaderControl from "../components/header-control";
import SidebarControl from "../components/sidebar-control";
import TitleControl from "../../components/controls/title-control";
import { Container, Grid, Breadcrumb, Header } from "semantic-ui-react";

// CONTEXTS
import AppContext from "../../contexts/app";
import UserContext from "../../contexts/user";

// DIALOGS
// import AccountSetupDialog from "../../components/general/account-setup-dialog";

// MODALS
import IdleTimeout from "../../modals/general/idle-timeout";

// UTILS
import PropTypes from "prop-types";
// import { api } from "../../utils/api";
import IdleTimer from "react-idle-timer";
import system from "../../config/system";
import { alertMessage } from "../../utils/alert";
import { renderRoutes } from "react-router-config";
import { Redirect, withRouter } from "react-router-dom";

const MainLayout = ({ location, history, children, settings }) => {
    // CONTEXTS
    const { routes, permissions } = useContext(AppContext);
    const {
        // isLogin,
        // bankSetup,
        // setIsLogin,
        setTimedOut,
        // setBankSetup,
        handleLogout,
        authenticated,
    } = useContext(UserContext);

    // STATES
    const [pages, setPages] = useState([]);
    const [pageCode, setPageCode] = useState("");
    // const [loading, setLoading] = useState(true);
    const [pageHeader, setPageHeader] = useState("");
    const [pageAccess, setPageAccess] = useState(true);
    const [pageBreadcrumbs, setPageBreadcrumbs] = useState([]);
    // const [showBankPrompt, setShowBankPrompt] = useState(false);
    // const [showBankWarning, setShowBankWarning] = useState(true);

    // IDLE STATES
    const [isTimedOut, setIsTimedOut] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);

    // MODALS
    const [modalIdle, setModalIdle] = useState(false);

    // REFS
    const idleRef = useRef(null);

    // FUNCTIONS
    const handleActive = () => {
        if (!isTimedOut) {
            setIsTimedOut(false);
        }
    };

    const handleIdle = () => {
        if (!isTimedOut) {
            setModalIdle(true);
            idleRef.current.reset();
            setIsTimedOut(true);
        }
    };

    useEffect(() => {
        if (isTimedOut) {
            const intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            if (!timeLeft) {
                setModalIdle(false);
                clearInterval(intervalId);
                setTimedOut(true);
                handleLogout();
                return;
            }

            return () => clearInterval(intervalId);
        }
    }, [isTimedOut && timeLeft]);

    useEffect(() => {
        if (!modalIdle) {
            setTimeLeft(600);
            setIsTimedOut(false);
        }
    }, [modalIdle]);

    useEffect(() => {
        function handleLoad() {
            const {
                code,
                title,
                match,
                // bankPrompt,
                //bankWarning,
                breadcrumbs,
                enableAccess,
            } = settings;

            if (breadcrumbs) {
                const pageBreadcrumbs = breadcrumbs.map((item) => {
                    if (!item.content) {
                        return { ...item, content: `${match.params.id}` };
                    }
                    return item;
                });

                setPageBreadcrumbs(pageBreadcrumbs);
            } else {
                setPageBreadcrumbs([]);
            }

            setPageCode(code);
            setPageHeader(title);
            // setShowBankPrompt(bankPrompt);
            // setShowBankWarning(bankWarning);
            setPageAccess(enableAccess?.includes(window.ENV));
        }

        handleLoad();
    }, [location, permissions]);

    useEffect(() => {
        const pages = permissions
            .map((item) => {
                return item.code;
            })
            .filter((item) => item !== undefined);
        setPages(pages);
    }, [permissions]);

    useEffect(() => {
        if (!pageAccess && authenticated) {
            alertMessage.showError({
                title: "Feature Maintenance",
                text:
                    "We are deploying new changes to the module, it will be available as soon as possible.",
                onClose: () => history.push("/"),
            });
        }
    }, [authenticated, pageAccess]);

    // useState(() => {
    //     setLoading(true);
    //     async function handleCheck() {
    //         setLoading(true);
    //         const res = await api.doctor.PostMethod("/banks/verify");
    //         const { data, status } = res;

    //         if (status === 200) {
    //             if (data.errors) {
    //                 setBankSetup(false);
    //             } else {
    //                 setBankSetup(data.is_verified);
    //             }
    //         } else {
    //             setBankSetup(false);
    //         }
    //         setLoading(false);
    //     }

    //     handleCheck();
    // }, [location]);

    // useEffect(() => {
    //     if (!loading) {
    //         if (!bankSetup && showBankPrompt) {
    //             alertMessage.showMessage({
    //                 title: "Bank Setup",
    //                 text: "Submit your Bank Information before proceeding.",
    //                 onClose: () => {
    //                     history.push("/profile/banks/add");
    //                 },
    //             });
    //         }
    //     }
    // }, [loading, bankSetup, showBankPrompt]);

    // useEffect(() => {
    //     if (isLogin && !bankSetup) {
    //         alertMessage.showMessage({
    //             title: "Bank Setup",
    //             confirmButtonText: "Okay",
    //             text: "Submit your Bank Information before proceeding.",
    //             onClose: () => {
    //                 setIsLogin(false);
    //                 history.push("/profile/banks/add");
    //             },
    //         });
    //     }
    // }, [isLogin, bankSetup, location]);

    return authenticated ? (
        <div className="mdMainLayout">
            <IdleTimer
                ref={idleRef}
                debounce={100}
                element={document}
                onIdle={handleIdle}
                onActive={handleActive}
                timeout={system.timeout}
            />
            <HeaderControl withMenu />
            <SidebarControl pages={pages} code={pageCode}>
                <Container fluid className="main-wrapper">
                    {!pageAccess ? (
                        <Fragment>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column textAlign="center">
                                        <TitleControl title="Feature Disabled" />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {/* {!bankSetup && !loading && showBankWarning && <AccountSetupDialog />} */}
                            <Grid padded>
                                {pageBreadcrumbs.length > 0 && (
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            <Breadcrumb
                                                data-cy="mdBreadcrumbs"
                                                className="mdBreadcrumbs"
                                                sections={pageBreadcrumbs}
                                                icon={{ name: "right angle", color: "grey" }}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                )}
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        {pageHeader && <Header as="h1" content={pageHeader} />}
                                        {modalIdle && (
                                            <IdleTimeout
                                                seconds={timeLeft}
                                                visible={modalIdle}
                                                handleClose={() => setModalIdle(false)}
                                            />
                                        )}
                                        <settings.context>
                                            {renderRoutes(routes)}
                                            {children}
                                        </settings.context>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Fragment>
                    )}
                </Container>
            </SidebarControl>
        </div>
    ) : (
        <Redirect to={{ pathname: "/login", state: { path: location.pathname } }} />
    );
};

export default withRouter(MainLayout);

MainLayout.propTypes = {
    children: PropTypes.any,
    history: PropTypes.object,
    location: PropTypes.object,
    settings: PropTypes.object,
};
