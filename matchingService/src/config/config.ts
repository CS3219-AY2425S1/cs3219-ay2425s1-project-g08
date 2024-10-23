const apiConfig = {
    frontendURL: process.env.FRONTEND_URL || "http://localhost:5173",
    rabbitMQUrl: process.env.RABBITMQ_URL || "amqp://localhost:5672",
};

export default apiConfig;