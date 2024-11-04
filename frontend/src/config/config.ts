const apiConfig = {
    userServiceBaseUrl: import.meta.env.VITE_USER_SERVICE_URL
        ? "/usersvcapi"
        : "http://localhost:3001",
    questionbankServiceBaseUrl: import.meta.env.VITE_QB_SERVICE_URL
        ? "/qbsvcapi"
        : "http://localhost:8080",
    profilePictureServiceBaseUrl: import.meta.env.VITE_PP_SERVICE_URL
        ? "/ppsvcapi"
        : "http://localhost:8081",
    matchWebsocketUrl: import.meta.env.VITE_MATCH_WEBSOCKET_URL
        ? "/"
        : "ws://localhost:8082",
    matchExpressJsUrl: import.meta.env.VITE_MATCH_EXPRESS_URL
        ? "/matchexpresssvcapi"
        : "http://localhost:3000",
    historyServiceUrl: import.meta.env.VITE_HISTORY_URL
        ? "/placeholdernameforhistoryservice"
        : "http://localhost:9090",
    collaborationWebSocketUrl: import.meta.env.VITE_COLLABORATION_WEBSOCKET_URL
        ? "/collaborationsvcapi"
        : "ws://localhost:1234",
};

export default apiConfig;
