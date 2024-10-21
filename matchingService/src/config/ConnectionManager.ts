import { Connection, Channel, connect } from "amqplib";
import ChannelNotFoundError from "../errors/ChannelNotFoundError";

export interface IConnectionManager {
    setup(connectionUrl: string): Promise<void>;
    connect(connectionUrl: string): Promise<Connection>;
    createChannel(conn: Connection): Promise<Channel>;
    getChannel(): Channel;
}

/** ConnectionManager manages the connection to RabbitMQ cluster and providing access to a Channel */
export class ConnectionManager {
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    public async setup(connectionUrl: string): Promise<void> {
        this.connection = await this.connect(connectionUrl);
        this.channel = await this.createChannel(this.connection);
    }

    public async connect(connectionUrl: string): Promise<Connection> {
        return await connect(connectionUrl);
    }

    public async createChannel(conn: Connection): Promise<Channel> {
        return await conn.createChannel();
    }

    public getChannel(): Channel {
        if (!this.channel) {
            console.log("Channel not initialised");
            throw ChannelNotFoundError;
        }
        return this.channel;
    }
}