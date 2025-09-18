import amqp, { Channel, ChannelModel, ConsumeMessage } from 'amqplib';
import SETTINGS from '../config/settings';

type Handler<T> = (payload: T) => Promise<void>;

const SERVICE_NAME = '[profiles-service]';

export class MessageBroker {
  private connection?: ChannelModel;
  private channel?: Channel;

  private async getConnection(): Promise<ChannelModel> {
    if (this.connection) {
      return this.connection;
    }
    const connection = await amqp.connect(SETTINGS.MESSAGE_BROKER_URL);
    connection.on('error', (err: Error) => {
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

  private async getChannel(): Promise<Channel> {
    if (this.channel) {
      return this.channel;
    }
    const connection = await this.getConnection();
    const channel = await connection.createChannel();
    await channel.prefetch(10);
    this.channel = channel;
    return channel;
  }

  public async connect(): Promise<void> {
    await this.getChannel();
    console.log(`${SERVICE_NAME} RabbitMQ connected`);
  }

  public async publish(queue: string, message: unknown): Promise<void> {
    const channel = await this.getChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  }

  public async consume<T = unknown>(queue: string, handler: Handler<T>): Promise<void> {
    const channel = await this.getChannel();
    await channel.assertQueue(queue, { durable: true });
    await channel.consume(queue, async (msg: ConsumeMessage | null) => {
      if (!msg) {
        return;
      }
      try {
        const payload = JSON.parse(msg.content.toString()) as T;
        await handler(payload);
        channel.ack(msg);
      } catch (err) {
        console.error(`${SERVICE_NAME} Failed to process ${queue} message`, err);
        channel.nack(msg, false, false);
      }
    });
  }
}
