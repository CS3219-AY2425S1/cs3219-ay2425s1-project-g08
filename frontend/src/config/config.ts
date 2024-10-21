const apiConfig = {
    userServiceBaseUrl: process.env.USER_SERVICE_URL || "http://localhost:3001",
    questionbankServiceBaseUrl: process.env.QB_SERVICE_URL || "http://localhost:8080",
    profilePictureServiceBaseUrl: process.env.PP_SERVICE_URL || "http://localhost:8081",
    matchWebsocketUrl: process.env.MATCH_WEBSOCKET_URL || "ws://localhost:8082",
    matchExpressJsUrl: process.env.MATCH_EXPRESS_URL || "http://localhost:3000",
};

export default apiConfig;