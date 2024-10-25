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
    ? "/matchwssvcapi"
    : "ws://localhost:8082",
  matchExpressJsUrl: import.meta.env.VITE_MATCH_EXPRESS_URL
    ? "/matchexpresssvcapi"
    : "http://localhost:3000",
};

export default apiConfig;
