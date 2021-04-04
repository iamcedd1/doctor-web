const jwt = require("jsonwebtoken");
const { default: system } = require("../config/system");

const authenticate = (request) => {
    const authorization = request.get("Authorization");

    if (authorization) {
        const token = authorization.replace("Bearer ", "");
        const { user_id, practitioner_code } = jwt.verify(token, system.SESSION_SECRET);
        return { user_id, practitioner_code };
    }

    throw new Error("Unauthorized");
};

module.exports = {
    authenticate,
};
