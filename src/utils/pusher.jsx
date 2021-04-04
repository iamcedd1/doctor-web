import Pusher from "pusher-js";
import systemConfig from "../config/system";

const APP_KEY = window.PUSHER_APP_KEY;
const APP_CHANNEL = window.PUSHER_CHANNEL;
const APP_CLUSTER = systemConfig.cluster;

const pusher = new Pusher(APP_KEY, {
    cluster: APP_CLUSTER,
    forceTLS: true,
});

export const PusherSubscribe = (channel) => {
    const current_channel = channel ? channel : APP_CHANNEL;
    return pusher.subscribe(current_channel);
};
