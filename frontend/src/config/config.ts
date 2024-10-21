const apiConfig = {
    userServiceBaseUrl: process.env.USER_SERVICE_URL || "http://localhost:3001",
    questionbankServiceBaseUrl: process.env.QB_SERVICE_URL || "http://localhost:8080",
    profilePictureServiceBaseUrl: process.env.PP_SERVICE_URL || "http://localhost:8081",
};

export default apiConfig;