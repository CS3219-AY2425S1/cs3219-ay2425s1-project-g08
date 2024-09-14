import AmqpService from "./QueueService/AmqpService";

interface QueueService {
    startProducers(): Promise<void>;
}

async function main() {
    var amqpService: QueueService = await AmqpService.of("amqp://localhost:5672", "gateway");
    await amqpService.startProducers()
}
main();
