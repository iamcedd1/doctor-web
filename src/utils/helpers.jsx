// COMPONENTS
import { Responsive } from "semantic-ui-react";

// UTILS
import moment from "moment";
import system from "../config/system";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

export default class Helpers {
    static generateRoutesFromConfigs(configs) {
        let allRoutes = [];
        // eslint-disable-next-line array-callback-return
        configs.map((config) => {
            allRoutes = [...allRoutes, ...this.setRoutes(config)];
        });
        return allRoutes;
    }

    static setRoutes(config) {
        let routes = [...config.routes];

        if (config.settings || config.auth) {
            routes = routes.map((route) => {
                let auth = config.auth ? [...config.auth] : [];
                auth = route.auth ? [...auth, ...route.auth] : auth;

                return {
                    auth,
                    settings: { ...config.settings, ...route.settings },
                    ...route,
                };
            });
        }

        return [...routes];
    }
}

export const isActive = (status) => {
    return ["Active", "active", "A"].includes(status);
};

export const isInactive = (status) => {
    return ["Inactive", "inactive", "I"].includes(status);
};

export const isNotRegistered = (status) => {
    return ["Not Yet Registered", "not yet registered", "NYR"].includes(status);
};

export const isLocked = (status) => {
    return ["Locked", "locked", "L"].includes(status);
};

export const isPending = (status) => {
    return ["Pending", "pending", "P"].includes(status);
};

export const isAvailed = (status) => {
    return ["Availed", "availed", "AV"].includes(status);
};

export const isDraft = (status) => {
    return ["Draft", "draft", "DR"].includes(status);
};

export const isCancelled = (status) => {
    return ["Cancelled", "Canceled", "cancelled", "canceled", "C"].includes(status);
};

export const isApproved = (status) => {
    return ["Approved", "approved", "A"].includes(status);
};

export const isSuspended = (status) => {
    return ["Suspended", "suspended", "S"].includes(status);
};

export const isLapsed = (status) => {
    return ["Lapsed", "lapsed", "L"].includes(status);
};

export const isForApproval = (status) => {
    return ["For Approval", "FA"].includes(status);
};

export const isApprovedPending = (status) => {
    return ["Pending", "Approved", "pending", "approved", "P", "A"].includes(status);
};

export const isRenew = (status) => {
    return isLapsed(status) || isSuspended(status) || isActive(status);
};

export const isIssued = (status) => {
    return ["I", "ISSUED", "Issued", "issued"].includes(status);
};

export const isHasUpperCase = (value) => {
    return value.match(/[A-Z]/) ? true : false;
};

export const isHasSpecialChar = (value) => {
    const symbolCount = (value.match(/\W/g) || []).length;
    return symbolCount > 0;
};

export const isHasNumber = (value) => {
    return value.match(/[0-9]/) ? true : false;
};

export const isHasLowerCase = (value) => {
    return value.match(/[a-z]/) ? true : false;
};

/*********************
        DOMAINS
*********************/
export const isCCD = (domain) => {
    return ["CC", "CCD", "Customer Care"].includes(domain);
};

export const isURG = (domain) => {
    return ["URG", "Underwriting"].includes(domain);
};

export const isAPD = (domain) => {
    return ["APD", "Account Plan Detail"].includes(domain);
};

export const isMasterFile = (domain) => {
    return ["MED", "Master File"].includes(domain);
};

export const isAdmin = (domain) => {
    return ["ADMIN", "Administration"].includes(domain);
};

export const isFA = (domain) => {
    return ["FA", "Full Access"].includes(domain);
};

/*********************
      PERMISSIONS
*********************/
export const isViewOnly = (permission) => {
    return ["view only", "view-only", "view", "vo"].includes(permission);
};

export const isFullAccess = (permission) => {
    return ["full access", "full-access", "full", "fa"].includes(permission);
};

export const isGeneralAccess = (permission) => {
    return ["general access", "general-access", "general", "gl"].includes(permission);
};

/*********************
    RESPONSIVENESS
*********************/
export const isTablet = (type) => {
    return ["tablet", "tab", "t"].includes(type);
};

export const isMobile = (type) => {
    return ["mobile", "mob", "m"].includes(type);
};

export const isDesktop = (type) => {
    return ["computer", "desktop", "c"].includes(type);
};

export const getWidth = () => {
    const isSSR = typeof window === "undefined";
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/*********************
       FILTER 
*********************/
export const checkFilter = (filterItems, itemToCheck) => {
    const exists = filterItems.find((item) => item === itemToCheck);
    return exists ? true : false;
};

export const actionFilter = (filterItems, itemToFilter) => {
    const exists = filterItems.find((item) => item === itemToFilter);

    if (exists) {
        return filterItems.filter((item) => item !== itemToFilter);
    }

    return [...filterItems, itemToFilter];
};

/*********************
       FUNCTIONS 
*********************/
export const downloadFromFile = ({ url, name }) => {
    const a = document.createElement("a");

    a.href = url;
    a.download = name;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

export const downloadFromUrl = (url) => {
    const a = document.createElement("a");
    a.href = url;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

/*********************
        FILE 
*********************/
export const isCSV = (name, type) => {
    return ["text/csv", "application/vnd.ms-excel"].includes(type) || name.endsWith(".csv");
};

export const isExcel = (name, type) => {
    return (
        ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].includes(type) ||
        name.endsWith(".xls") ||
        name.endsWith(".xlsx")
    );
};

export const checkFileHeaders = (headers, file_headers) => {
    return headers.every((a) => file_headers.includes(a));
};

/*********************
       S3 CONFIG 
*********************/
export const getS3Config = (dirName) => {
    return {
        dirName,
        region: system.S3_REGION,
        bucketName: system.S3_BUCKET_NAME,
        accessKeyId: system.S3_ACCESS_KEY_ID,
        secretAccessKey: system.S3_SECRET_ACCESS_KEY_ID,
    };
};

/*********************
        CATEGORY 
*********************/
export const isMedical = (type) => {
    return ["M", "MED", "Medical"].includes(type);
};

export const isDental = (type) => {
    return ["D", "DEN", "Dental"].includes(type);
};

export const isPeme = (type) => {
    return ["P", "PEME", "Pre-Employment Medical Examination"].includes(type);
};

export const isSession = (type) => {
    return ["Session", "SESSION", "S"].includes(type);
};

export const isArea = (type) => {
    return ["Area", "AREA", "A"].includes(type);
};

/*********************
       COVERAGE 
*********************/
export const isConsult = (coverage) => {
    return ["C", "CON", "Consult", "Consultation"].includes(coverage);
};

export const isInpatient = (coverage) => {
    return ["IP", "Inpatient"].includes(coverage);
};

export const isOutpatient = (coverage) => {
    return ["OP", "Outpatient"].includes(coverage);
};

export const isACU = (coverage) => {
    return ["ACU", "Annual Check Up", "Annual Check-Up"].includes(coverage);
};

export const isMaternity = (coverage) => {
    return ["M", "Maternity"].includes(coverage);
};

/*********************
        ADDRESS 
*********************/
export const handleFilterCities = (locations = []) => {
    return [...new Set(locations.map((item) => item.city))];
};

export const handleFilterProvinces = (locations = []) => {
    return [...new Set(locations.map((item) => item.province))];
};

export const handleFilterRegions = (locations = []) => {
    return [...new Set(locations.map((item) => item.region))];
};

/*********************
        GENERAL 
*********************/
export const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

export const checkNull = (value, type) => {
    if (["boolean", "bool"].includes(type)) {
        return value ? value : "FALSE";
    } else if (["custom-boolean"].includes(type)) {
        return value ? "YES" : "NO";
    } else if (["numeric", "number"].includes(type)) {
        return value ? value : "0";
    } else if (["amount", "decimal"].includes(type)) {
        return value ? (value.includes(".") ? value : `${value}.00`) : "0.00";
    } else if (["currency"].includes(type)) {
        return `Php ${formatCurrency({ amount: value })}`;
    } else if (["custom-currency"].includes(type)) {
        return `${formatCurrency({ amount: value })}`;
    } else if (["month"].includes(type)) {
        return value ? (value > 1 ? `${value} mos.` : `${value} mo.`) : "N/A";
    } else if (["percentage"].includes(type)) {
        return value ? (value.includes("%") ? value : `${value}%`) : "0%";
    } else if (["mobile"].includes(type)) {
        if (value.length < 11 && value[0] !== "0") {
            return `0${value}`;
        }
        return value;
    } else if (["action", "function"].includes(type)) {
        return value;
    } else if (["date"].includes(type)) {
        return value ? moment(value).format("MMM-DD-YYYY").toUpperCase() : "N/A";
    } else {
        const trimmed = value ? value.toString().replace(/\s/g, "") : "";
        return trimmed ? value : "N/A";
    }
};

export const formatCurrency = ({ amount, decimalCount = 2, decimal = ".", thousands = "," }) => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        const i = parseInt(
            (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
        ).toString();
        const j = i.length > 3 ? i.length % 3 : 0;

        return (
            negativeSign +
            (j ? i.substr(0, j) + thousands : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount
                ? decimal +
                  Math.abs(amount - i)
                      .toFixed(decimalCount)
                      .slice(2)
                : "")
        );
    } catch (e) {
        console.log(e);
    }
};

export const getFullName = (firstName, middleName, lastName, suffix) => {
    const middle_name = middleName ? ` ${middleName} ` : " ";
    const suffix_name = suffix ? ` ${suffix}` : "";
    return `${firstName}${middle_name}${lastName}${suffix_name}`;
};

export const handleEditMap = ({
    name,
    value,
    index,
    errorName,
    items = [],
    handleSet = () => {},
}) => {
    const result = items.map((item, idx) => {
        if (idx === index) {
            return { ...item, [[name]]: value, [[errorName]]: "" };
        }

        return item;
    });
    handleSet(result);
};

export const handleRemoveMap = ({ index, items = [], handleSet = () => {} }) => {
    const result = items.filter((_, idx) => idx !== index);
    handleSet(result);
};

export const handleNumberMask = createNumberMask({
    prefix: "",
    suffix: "",
    allowLeadingZeroes: true,
    includeThousandsSeparator: false,
});

export const handleCurrencyMask = createNumberMask({
    prefix: "",
    suffix: "",
});

export const isValidEmail = (value) => {
    let valid = true;

    if (value.indexOf("@") === -1) {
        valid = false;
    } else {
        const parts = value.split("@");
        const domain = parts[1];

        if (domain.indexOf(".") === -1) {
            valid = false;
        } else {
            const domainParts = domain.split(".");
            const ext = domainParts[1];

            if (ext.length > 4 || ext.length < 2) {
                valid = false;
            }
        }
    }

    return valid;
};

export const validateString = ({
    allowLetters = true,
    allowNumbers = true,
    allowSpaces = false,
    allowedCharacters,
}) => {
    let regex = "";
    const numerics = "0-9";
    const alphabets = "a-zA-Z";

    if (allowLetters) regex = `${regex}${alphabets}`;
    if (allowNumbers) regex = `${regex}${numerics}`;
    if (allowSpaces) regex = `${regex} `;
    if (allowedCharacters) regex = `${regex}${allowedCharacters}`;

    return new RegExp(`^[${regex}]+$`);
};

export const handleValidateRegex = ({
    value,
    regex,
    handleSet = () => {},
    handleSetError = () => {},
}) => {
    if (value) {
        const valid = regex.test(value);

        if (valid) {
            handleSet(value);
            handleSetError("");
        } else {
            return;
        }
    } else {
        handleSet(value);
    }
};

/*********************
      DATE/TIME 
*********************/
export const convertToTime = (value) => {
    if (value) {
        return moment(value, "HH:mm");
    }
};

export const checkTimeOverlap = ({ index, timeFrom, timeTo, values = [], withIndex = false }) => {
    return values.some((e, i) => {
        if (withIndex) {
            if (index === i) return false;
        }

        const _timeTo = convertToTime(e?.to);
        const _timeFrom = convertToTime(e?.from);
        return !(
            moment(timeTo, "HH:mm").diff(_timeFrom) < 0 ||
            moment(timeFrom, "HH:mm").diff(_timeTo) > 0
        );
    });
};

export const getFirstLetter = (value) => {
    return value?.substr("0", "1");
};

export const handleValidateMobile = () => {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
};

export const timeSince = (timeStamp) => {
    if (!(timeStamp instanceof Date)) {
        timeStamp = new Date(timeStamp);
    }

    if (isNaN(timeStamp.getDate())) {
        return "Invalid date";
    }

    const now = new Date(),
        secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;

    const formatDate = function (date, format, utc) {
        const MMMM = [
            "\x00",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const MMM = [
            "\x01",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const dddd = [
            "\x02",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        function ii(i, len) {
            let s = i + "";
            len = len || 2;
            while (s.length < len) s = "0" + s;
            return s;
        }

        const y = utc ? date.getUTCFullYear() : date.getFullYear();
        format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
        format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
        format = format.replace(/(^|[^\\])y/g, "$1" + y);

        const M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
        format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
        format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
        format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
        format = format.replace(/(^|[^\\])M/g, "$1" + M);

        const d = utc ? date.getUTCDate() : date.getDate();
        format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
        format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
        format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
        format = format.replace(/(^|[^\\])d/g, "$1" + d);

        const H = utc ? date.getUTCHours() : date.getHours();
        format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
        format = format.replace(/(^|[^\\])H/g, "$1" + H);

        const h = H > 12 ? H - 12 : H == 0 ? 12 : H;
        format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
        format = format.replace(/(^|[^\\])h/g, "$1" + h);

        const m = utc ? date.getUTCMinutes() : date.getMinutes();
        format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
        format = format.replace(/(^|[^\\])m/g, "$1" + m);

        const s = utc ? date.getUTCSeconds() : date.getSeconds();
        format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
        format = format.replace(/(^|[^\\])s/g, "$1" + s);

        let f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
        format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
        f = Math.round(f / 10);
        format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
        f = Math.round(f / 10);
        format = format.replace(/(^|[^\\])f/g, "$1" + f);

        const T = H < 12 ? "AM" : "PM";
        format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
        format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

        const t = T.toLowerCase();
        format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
        format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

        let tz = -date.getTimezoneOffset();
        let K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
        if (!utc) {
            tz = Math.abs(tz);
            const tzHrs = Math.floor(tz / 60);
            const tzMin = tz % 60;
            K += ii(tzHrs) + ":" + ii(tzMin);
        }
        format = format.replace(/(^|[^\\])K/g, "$1" + K);

        const day = (utc ? date.getUTCDay() : date.getDay()) + 1;
        format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
        format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

        format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
        format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

        format = format.replace(/\\(.)/g, "$1");

        return format;
    };

    if (secondsPast < 0) {
        // Future date
        return timeStamp;
    }
    if (secondsPast < 60) {
        // Less than a minute
        return "a few seconds ago";
        // return parseInt(secondsPast) + "secs";
    }
    if (secondsPast < 3600) {
        // Less than an hour
        const value = parseInt(secondsPast / 60);
        if (value > 1) {
            return value + " minutes ago";
        } else {
            return value + " minute ago";
        }
    }
    if (secondsPast <= 86400) {
        // Less than a day
        const value = parseInt(secondsPast / 3600);
        if (value > 1) {
            return value + " hours ago";
        } else {
            return value + " hour ago";
        }
    }
    if (secondsPast <= 172800) {
        // Less than 2 days
        return "Yesterday at " + formatDate(timeStamp, "h:mmtt");
    }
    if (secondsPast > 172800) {
        return formatDate(timeStamp, "MMM-dd-yyyy") + " at " + formatDate(timeStamp, "h:mmtt");
    }
};

export const handleConvertDate = (value) => {
    return value ? moment(value).format("MMM-DD-YYYY").toUpperCase() : "";
};

export const handleReverseDate = (value) => {
    return value ? Date.parse(moment(value, "MMM-DD-YYYY").toISOString()) : "";
};
