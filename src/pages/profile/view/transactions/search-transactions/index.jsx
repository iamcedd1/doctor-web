/* eslint-disable react/display-name */
import React, { useState, useEffect, lazy } from "react";

// COMPONENTS
import { Grid, Tab, Form } from "semantic-ui-react";
import TitleControl from "../../../../../components/controls/title-control";
import BottomControl from "../../../../../components/general/bottom-control";
import SearchControl from "../../../../../components/controls/search-control";
import FilterControl from "../../../../../components/controls/filter-control";
import ButtonControl from "../../../../../components/controls/button-control";
import SuspenseControl from "../../../../../components/controls/suspense-control";
import CheckboxControl from "../../../../../components/controls/checkbox-control";
import ResponsiveControl from "../../../../../components/controls/responsive-control";
import FilterActionControl from "../../../../../components/controls/filter-action-control";

// DATA
import { CONSULTATION_MODES, STATUSES } from "../../../../../data/transactions";

// TABLES
import TransactionData from "../../../../../tables/profile/transaction-data";

// UTILS
import PropTypes from "prop-types";
import { loader } from "graphql.macro";
import { withRouter } from "react-router-dom";
import { client } from "../../../../../utils/api";
import useDebounce from "../../../../../utils/useDebounce";
import { handleConvertDate } from "../../../../../utils/helpers";

// COMPONENTS
const CalendarControl = lazy(() => import("../../../../../components/controls/calendar-control"));

const SearchTransactions = ({ history }) => {
    // STATES
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [searching, setSearching] = useState(false);
    const [totalResult, setTotalResult] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [currentResult, setCurrentResult] = useState(0);

    // DEBOUNCE
    const debouncedSearch = useDebounce(searchValue, 500);

    // FILTER STATES
    const [filterModes, setFilterModes] = useState([]);
    const [filterStatus, setFilterStatus] = useState([]);
    const [filterDateIssuanceTo, setFilterDateIssuanceTo] = useState("");
    const [filterDateAvailmentTo, setFilterDateAvailmentTo] = useState("");
    const [filterDateIssuanceFrom, setFilterDateIssuanceFrom] = useState("");
    const [filterDateAvailmentFrom, setFilterDateAvailmentFrom] = useState("");

    const [filterOpen, setFilterOpen] = useState(false);
    const [filterOptions, setFilterOptions] = useState({
        status: [],
        date_issuance_to: "",
        date_issuance_from: "",
        date_availment_to: "",
        date_availment_from: "",
    });

    // PAGINATION STATES
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 10,
        orderBy = "desc",
        sortBy = "issued_datetime";

    // FUNCTIONS
    const handleSearch = async () => {
        if (loading) return;

        setLoading(true);
        const page = searching ? 1 : pageNumber;

        const params = {
            sortBy,
            orderBy,
            pageNumber: page,
            displayPerPage: perPage,
            searchValue: searchValue,
            filterBy: {
                ...filterOptions,
                date_issuance_to: handleConvertDate(filterOptions?.date_issuance_to),
                date_issuance_from: handleConvertDate(filterOptions?.date_issuance_from),
                date_availment_from: handleConvertDate(filterOptions?.date_availment_from),
                date_availment_to: handleConvertDate(filterOptions?.date_availment_to),
            },
        };

        const query = loader("../../../../../graphql/profile/search-transactions.graphql");
        await client.doctor
            .query({
                query,
                variables: params,
            })
            .then(({ data }) => {
                const { transactions, totalNumber } = data.transactions;
                const { length } = transactions;

                const count = totalNumber / perPage;
                const result = pageNumber * perPage + Math.ceil(length - perPage);

                setTransactions(transactions);
                setCurrentResult(result);
                setTotalResult(totalNumber);
                setTotalPages(Math.ceil(count));
            })
            .catch(() => {
                setTotalPages(0);
                setTransactions([]);
                setTotalResult(0);
                setCurrentResult(0);
            });

        setSearching(false);
        setLoading(false);
    };

    const handleOpen = () => {
        const {
            modes,
            status,
            date_issuance_from,
            date_issuance_to,
            date_availment_from,
            date_availment_to,
        } = filterOptions;

        const filter_status = status ? status : [];

        setFilterModes(modes);
        setFilterStatus(filter_status);
        setFilterDateIssuanceFrom(date_issuance_from);
        setFilterDateIssuanceTo(date_issuance_to);
        setFilterDateAvailmentFrom(date_availment_from);
        setFilterDateAvailmentTo(date_availment_to);

        setFilterOpen(true);
    };

    const handleClose = () => {
        setFilterOpen(false);
        handleReset();
    };

    const handleApply = () => {
        const options = {
            modes: filterModes,
            status: filterStatus,
            date_issuance_to: filterDateIssuanceTo,
            date_issuance_from: filterDateIssuanceFrom,
            date_availment_from: filterDateAvailmentFrom,
            date_availment_to: filterDateAvailmentTo,
        };

        setFilterOptions(options);
        setPageNumber(1);
        setSearching(true);
    };

    const handleClear = () => {
        handleReset();

        setFilterOptions({});
        setPageNumber(1);
        setSearching(true);
    };

    const handleReset = () => {
        setFilterStatus([]);
        setFilterDateIssuanceTo("");
        setFilterDateAvailmentTo("");
        setFilterDateIssuanceFrom("");
        setFilterDateAvailmentFrom("");
    };

    const handleChangeDate = (e, data) => {
        const { name, value } = data;

        if (["availmentFrom"].includes(name)) {
            setFilterDateAvailmentFrom(value);
        } else if (["availmentTo"].includes(name)) {
            setFilterDateAvailmentTo(value);
        } else if (["issuanceFrom"].includes(name)) {
            setFilterDateIssuanceFrom(value);
        } else if (["issuanceTo"].includes(name)) {
            setFilterDateIssuanceTo(value);
        }
    };

    useEffect(() => {
        setPageNumber(1);
        setSearching(true);
    }, [debouncedSearch]);

    useEffect(() => {
        handleSearch();
    }, [pageNumber, searching]);

    // CONSTANTS
    const panes = [
        {
            menuItem: "Issuance Date",
            render: () => (
                <SuspenseControl>
                    <Tab.Pane>
                        <Form>
                            <Form.Group>
                                <CalendarControl
                                    label="Date From"
                                    name="issuanceFrom"
                                    onChange={handleChangeDate}
                                    value={filterDateIssuanceFrom}
                                />
                                <CalendarControl
                                    label="Date To"
                                    name="issuanceTo"
                                    onChange={handleChangeDate}
                                    value={filterDateIssuanceTo}
                                />
                            </Form.Group>
                        </Form>
                        <FilterActionControl handleApply={handleApply} handleClear={handleClear} />
                    </Tab.Pane>
                </SuspenseControl>
            ),
        },
        {
            menuItem: "Availment Date",
            render: () => (
                <Tab.Pane>
                    <Form>
                        <Form.Group>
                            <SuspenseControl>
                                <CalendarControl
                                    label="Date From"
                                    name="availmentFrom"
                                    onChange={handleChangeDate}
                                    value={filterDateAvailmentFrom}
                                />
                                <CalendarControl
                                    label="Date To"
                                    name="availmentTo"
                                    onChange={handleChangeDate}
                                    value={filterDateAvailmentTo}
                                />
                            </SuspenseControl>
                        </Form.Group>
                    </Form>
                    <FilterActionControl handleApply={handleApply} handleClear={handleClear} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Status",
            render: () => (
                <Tab.Pane>
                    {STATUSES.map((item) => (
                        <CheckboxControl
                            key={item.code}
                            value={item.code}
                            label={item.name}
                            filterItems={filterStatus}
                            handleChange={setFilterStatus}
                        />
                    ))}
                    <FilterActionControl handleApply={handleApply} handleClear={handleClear} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Medium",
            render: () => (
                <Tab.Pane>
                    {CONSULTATION_MODES.map((item) => (
                        <CheckboxControl
                            key={item.code}
                            value={item.code}
                            label={item.name}
                            filterItems={filterModes}
                            handleChange={setFilterModes}
                        />
                    ))}
                    <FilterActionControl handleApply={handleApply} handleClear={handleClear} />
                </Tab.Pane>
            ),
        },
    ];

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <TitleControl as="h1" title="Transactions" />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
                <Grid.Column widescreen={6} computer={6} tablet={12} mobile={10}>
                    <SearchControl
                        value={searchValue}
                        name="transactions"
                        placeholder="Search transactions"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </Grid.Column>
                <Grid.Column widescreen={3} computer={4} tablet={2} mobile={3}>
                    <FilterControl
                        fluid
                        panes={panes}
                        open={filterOpen}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                    />
                </Grid.Column>
                <Grid.Column textAlign="right" widescreen={7} computer={6} tablet={2} mobile={3}>
                    <ResponsiveControl width="max" type="tablet" as={Grid}>
                        <Grid.Column tablet={16}>
                            <ButtonControl
                                basic
                                fluid
                                iconOnly
                                icon="plus"
                                size="large"
                                name="confirmAvailment"
                                onClick={() =>
                                    history.push("/profile/transactions/confirm-availment")
                                }
                            />
                        </Grid.Column>
                    </ResponsiveControl>
                    <ResponsiveControl as={Grid}>
                        <Grid.Column floated="right" widescreen={7} computer={10}>
                            <ButtonControl
                                basic
                                fluid
                                icon="plus"
                                name="confirmAvailment"
                                text="Confirm Availment"
                                onClick={() =>
                                    history.push("/profile/transactions/confirm-availment")
                                }
                            />
                        </Grid.Column>
                    </ResponsiveControl>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
                <Grid.Column width={16}>
                    <TransactionData items={transactions} loading={loading} />
                </Grid.Column>
            </Grid.Row>
            <BottomControl
                totalPages={totalPages}
                pageNumber={pageNumber}
                totalResult={totalResult}
                currentResult={currentResult}
                handleChangePage={setPageNumber}
            />
        </Grid>
    );
};

export default withRouter(SearchTransactions);

SearchTransactions.propTypes = {
    history: PropTypes.object,
};
