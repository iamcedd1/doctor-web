import Swal from "sweetalert2";
import system from "../config/system";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    showClass: {
        popup: "animated bounceInRight",
    },
    customClass: {
        container: "mdToast",
    },
});

export const toastError = (title, action) => {
    return Toast.fire({
        title,
        icon: "error",
        onAfterClose: action,
    });
};

export const alertMessage = {
    showMessage: ({ title, text, confirmButtonText = "Okay", ...controlProps }) => {
        return Swal.fire({
            title,
            text,
            icon: "info",
            reverseButtons: true,
            customClass: {
                icon: "mdAlertIcon",
                container: "mdAlertInfo",
                content: "mdAlertContent",
                title: "mdAlertTitle",
                header: "mdAlertHeader",
                confirmButton: "mdAlertConfirm",
                closeButton: "mdAlertClose",
                cancelButton: "mdAlertCancel",
            },
            confirmButtonText: confirmButtonText,
            confirmButtonColor: system.defaultHexColor,
            ...controlProps,
        });
    },
    showSuccess: ({ title, text, confirmButtonText = "Okay", ...controlProps }) => {
        return Swal.fire({
            title,
            text,
            icon: "success",
            reverseButtons: true,
            customClass: {
                icon: "mdAlertIcon",
                container: "mdAlertSuccess",
                content: "mdAlertContent",
                title: "mdAlertTitle",
                header: "mdAlertHeader",
                confirmButton: "mdAlertConfirm",
                closeButton: "mdAlertClose",
                cancelButton: "mdAlertCancel",
            },
            confirmButtonText: confirmButtonText,
            confirmButtonColor: system.defaultHexColor,
            ...controlProps,
        });
    },
    showError: ({ title, text, confirmButtonText = "Okay", ...controlProps }) => {
        return Swal.fire({
            title,
            text,
            icon: "error",
            reverseButtons: true,
            customClass: {
                icon: "mdAlertIcon",
                container: "mdAlertError",
                content: "mdAlertContent",
                title: "mdAlertTitle",
                header: "mdAlertHeader",
                confirmButton: "mdAlertConfirm",
                closeButton: "mdAlertClose",
                cancelButton: "mdAlertCancel",
            },
            confirmButtonText: confirmButtonText,
            confirmButtonColor: system.defaultHexColor,
            ...controlProps,
        });
    },
    toastMessage: (title, action) => {
        return Toast.fire({
            title,
            icon: "info",
            onAfterClose: action,
        });
    },
    toastSuccess: (title, action) => {
        return Toast.fire({
            title,
            icon: "success",
            onAfterClose: action,
        });
    },
    toastError: (title, action) => {
        return Toast.fire({
            title,
            icon: "error",
            onAfterClose: action,
        });
    },
};
