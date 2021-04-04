export const statuses = [
    {
        code: "I",
        name: "ISSUED",
        color: "yellow",
        type: ["transaction_status"],
    },
    {
        code: "AV",
        name: "AVAILED",
        color: "blue",
        type: ["transaction_status"],
    },
    {
        code: "PR",
        name: "PROCESSING",
        color: "orange",
        type: ["transaction_status"],
    },
    {
        code: "P",
        name: "PAID",
        color: "green",
        type: ["transaction_status"],
    },
    {
        code: "A",
        name: "ACTIVE",
        color: "green",
        type: ["status"],
    },
    {
        code: "NYR",
        color: "grey",
        type: ["status"],
        name: "NOT REGISTERED",
    },
    {
        code: "DF",
        color: "grey",
        name: "DEFAULT",
        type: ["status", "transaction_status", "affiliation_status"],
    },
    {
        code: "A",
        color: "blue",
        name: "AFFILIATED",
        type: ["affiliation_status"],
    },
    {
        code: "P",
        name: "PAID",
        color: "green",
        type: ["transaction_status"],
    },
];
