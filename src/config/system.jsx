const system = {
    appCode: "DL",
    appName: "DoctorLink",
    apiVersion: "v1",

    // S3
    S3_BUCKET_NAME: window.S3_BUCKET_NAME,
    S3_REGION: window.S3_REGION,
    S3_ACCESS_KEY_ID: window.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY_ID: window.S3_SECRET_ACCESS_KEY_ID,

    // PUSHER
    cluster: "ap1",

    // CONFIG
    SESSION_SECRET: "ham+8n2g7Fe2hr7REnGvBYXL51MCyu3kZxk9OVuHxm14+z+iumoakYUlaZmrsDiC",

    defaultColor: "blue",
    defaultHexColor: "#005B96",
    timeout: 1000 * 60 * 5,
    uploadMaxSize: 1024 * 1024 * 5,

    logo: "https://payorsuite-staging.s3-ap-southeast-1.amazonaws.com/images/doctor-logo.png",
};

export default system;
