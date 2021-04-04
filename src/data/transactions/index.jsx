// UTILS
import { Link } from "react-router-dom";

export const STATUSES = [
    {
        code: "I",
        name: "Issued",
    },
    {
        code: "AV",
        name: "Availed",
    },
    {
        code: "C",
        name: "Cancelled",
    },
];

export const CONSULTATION_MODES = [
    {
        code: "TLC",
        name: "Teleconsultation",
    },
    {
        code: "FTF",
        name: "Face-to-Face",
    },
];

export const TRANSACTION_HEADERS = [
    {
        value: "loa_no",
        name: "LOA Number",
    },
    {
        value: "amount",
        name: "LOA Amount",
    },
    {
        value: "issuance_date",
        name: "Issuance Date",
    },
    {
        value: "availment_date",
        name: "Availment Date",
    },
    {
        value: "consultation_medium",
        name: "Consultation Medium",
    },
    {
        value: "status",
        name: "Status",
    },
];

export const TRANSACTIONS = [
    {
        status: "I",
        amount: "400",
        loaNumber: "10072456",
        memberName: "Jane Doe",
        issuanceDate: "JUL-20-2020",
        availmentDate: "",
    },
    {
        status: "AV",
        amount: "400",
        loaNumber: "10072455",
        memberName: "John Doe",
        issuanceDate: "JUL-17-2020",
        availmentDate: "JUL-18-2020",
    },
    {
        status: "PR",
        amount: "400",
        loaNumber: "10072455",
        memberName: "John Doe",
        issuanceDate: "JUL-17-2020",
        availmentDate: "JUL-18-2020",
    },
    {
        status: "P",
        amount: "400",
        loaNumber: "10072454",
        memberName: "Juan Dela Cruz",
        issuanceDate: "JUN-26-2020",
        availmentDate: "JUN-28-2020",
    },
];

export const VIEW_TRANSACTION_BREADCRUMBS = [
    {
        key: "Transactions",
        content: "SEARCH TRANSACTIONS",
        link: true,
        active: true,
        as: Link,
        to: "/profile/transactions",
    },
    {
        key: "View Transaction",
        content: "",
        link: false,
        active: true,
        as: "span",
    },
];

export const LOA_INFORMATION = [
    {
        _key: "member",
        title: "Member Information",
        items: [
            {
                key: "name",
                label: "Name",
            },
            {
                key: "card_no",
                label: "Card Number",
            },
            {
                key: "account_code",
                label: "Account Code",
            },
            {
                key: "account_name",
                label: "Account Name",
            },
            {
                key: "plan_code",
                label: "Plan Code",
            },
            {
                key: "plan_name",
                label: "Plan Name",
            },
        ],
    },
    {
        _key: "facility",
        title: "Facility Information",
        items: [
            {
                key: "code",
                label: "Facility Code",
            },
            {
                key: "name",
                label: "Facility Name",
            },
            {
                key: "type",
                label: "Facility Type",
            },
            {
                key: "status",
                label: "Facility Status",
            },
            {
                key: "address",
                label: "Facility Address",
            },
        ],
    },
    {
        _key: "general",
        title: "Transaction Details",
        items: [
            {
                key: "claim_no",
                label: "Claim No",
            },
            {
                key: "coverage",
                label: "Coverage",
            },
            {
                key: "created_datetime",
                label: "Date/Time Created",
            },
        ],
    },
];

export const LOA_MEMBER_INFORMATION = [
    {
        key: "name",
        label: "Name",
    },
    {
        key: "card_no",
        label: "Card Number",
    },
    {
        key: "account_code",
        label: "Account Code",
    },
    {
        key: "account_name",
        label: "Account Name",
    },
];

export const LOA_FACILITY_INFORMATION = [
    {
        key: "code",
        label: "Facility Code",
    },
    {
        key: "name",
        label: "Facility Name",
    },
    {
        key: "type",
        label: "Facility Type",
    },
    {
        key: "status",
        label: "Facility Code",
    },
    {
        key: "address",
        label: "Facility Address",
    },
];

export const LOA_TRANSACTION_INFORMATION = [
    {
        key: "coverage",
        label: "Coverage",
    },
    {
        key: "created_datetime",
        label: "Date/Time Created",
    },
];
