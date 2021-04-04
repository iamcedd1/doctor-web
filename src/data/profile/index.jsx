import React from "react";

import General from "../../pages/profile/view/general";
import Facilities from "../../pages/profile/view/facilities";
import Telemedicine from "../../pages/profile/view/telemedicine";
import ViewTransaction from "../../pages/profile/view/transactions/view-transaction";
import SearchTransactions from "../../pages/profile/view/transactions/search-transactions";

export const PROFILE_TABS = [
    {
        index: 0,
        code: "GI",
        visible: true,
        view: <General />,
        icon: "user outline",
        mobileName: "General",
        name: "General Information",
    },
    // {
    //     index: 1,
    //     code: "BI",
    //     mobileName: "Bank",
    //     name: "Bank Information",
    //     icon: "credit card outline",
    // },
    {
        index: 1,
        code: "TM",
        visible: true,
        name: "Telemedicine",
        view: <Telemedicine />,
        mobileName: "Telemed",
        icon: "calendar check outline",
    },
    {
        index: 2,
        code: "FC",
        visible: false,
        name: "Facilities",
        view: <Facilities />,
        mobileName: "Facilities",
        icon: "calendar check outline",
    },
    {
        index: 3,
        code: "TR",
        visible: true,
        name: "Transactions",
        icon: "file outline",
        mobileName: "Transactions",
        view: <SearchTransactions />,
    },
    {
        index: 4,
        code: "VTR",
        visible: false,
        icon: "file outline",
        name: "View Transaction",
        mobileName: "Transactions",
        view: <ViewTransaction />,
    },
];

export const SCHEDULE_HEADERS = [
    {
        value: "day",
        name: "Day",
    },
    {
        value: "time",
        name: "Time",
    },
];

export const SCHEDULES = [
    {
        code: "SU",
        name: "Sunday",
        time: [],
    },
    {
        code: "M",
        name: "Monday",
        time: [],
    },
    {
        code: "T",
        name: "Tuesday",
        time: [],
    },
    {
        code: "W",
        name: "Wednesday",
        time: [],
    },
    {
        code: "TH",
        name: "Thursday",
        time: [],
    },
    {
        code: "F",
        name: "Friday",
        time: [],
    },
    {
        code: "SA",
        name: "Saturday",
        time: [],
    },
];
