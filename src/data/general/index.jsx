export const HERO_IMAGES = [
    {
        codes: ["LGN", "RGS", "VA", "VU"],
        image: "doctors",
    },
    {
        codes: ["FPWD", "RPWD"],
        image: "authentication",
    },
];

export const PANEL_ITEMS = [
    {
        text: "My Profile",
        icon: "user outline",
        url: "/profile/general",
    },
    {
        icon: "list",
        text: "Transactions",
        url: "/profile/transactions",
    },
    // {
    //     icon: "lock",
    //     text: "Change Password",
    //     url: "/change-password",
    // },
];

export const NOTIFICATION_TYPES = [
    {
        code: "T",
        name: "Transactions",
        image: "authorizations",
    },
];

export const NOTIFICATIONS = [
    {
        type: "T",
        isRead: false,
        title: "From: MemberGateway",
        message: "Transaction with LOA Number 1234223 has been Issued.",
        addedDate: "JUL-26-2020 07:28:30",
    },
    {
        type: "T",
        isRead: true,
        title: "From: MemberGateway",
        message: "Transaction with LOA Number 1234323 has been Approved.",
        addedDate: "JUL-26-2020 07:28:30",
    },
    {
        type: "T",
        isRead: true,
        title: "From: MemberGateway",
        message: "Transaction with LOA Number 1234423 has been Cancelled.",
        addedDate: "JUL-26-2020 07:28:30",
    },
];
