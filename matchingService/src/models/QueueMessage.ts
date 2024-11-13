import amqp from "amqplib/callback_api";

interface QueueMessage extends amqp.Message {}

export default QueueMessage;