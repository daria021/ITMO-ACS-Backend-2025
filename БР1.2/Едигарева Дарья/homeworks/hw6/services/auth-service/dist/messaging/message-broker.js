"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBroker = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const settings_1 = __importDefault(require("../config/settings"));
const SERVICE_NAME = '[auth-service]';
class MessageBroker {
    async getConnection() {
        if (this.connection) {
            return this.connection;
        }
        const connection = await amqplib_1.default.connect(settings_1.default.MESSAGE_BROKER_URL);
        connection.on('error', (err) => {
            console.error(`${SERVICE_NAME} RabbitMQ connection error`, err);
        });
        connection.on('close', () => {
            console.warn(`${SERVICE_NAME} RabbitMQ connection closed`);
            this.connection = undefined;
            this.channel = undefined;
        });
        this.connection = connection;
        return connection;
    }
    async getChannel() {
        if (this.channel) {
            return this.channel;
        }
        const connection = await this.getConnection();
        const channel = await connection.createChannel();
        await channel.prefetch(10);
        this.channel = channel;
        return channel;
    }
    async connect() {
        await this.getChannel();
        console.log(`${SERVICE_NAME} RabbitMQ connected`);
    }
    async publish(queue, message) {
        const channel = await this.getChannel();
        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
    }
    async consume(queue, handler) {
        const channel = await this.getChannel();
        await channel.assertQueue(queue, { durable: true });
        await channel.consume(queue, async (msg) => {
            if (!msg) {
                return;
            }
            try {
                const payload = JSON.parse(msg.content.toString());
                await handler(payload);
                channel.ack(msg);
            }
            catch (err) {
                console.error(`${SERVICE_NAME} Failed to process ${queue} message`, err);
                channel.nack(msg, false, false);
            }
        });
    }
}
exports.MessageBroker = MessageBroker;
