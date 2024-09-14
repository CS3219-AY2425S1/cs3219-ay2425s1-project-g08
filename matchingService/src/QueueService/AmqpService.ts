import { Channel } from 'amqplib'
import QueueMessage from './QueueMessage'
import MatchRequest from './MatchRequest'
import { ConnectionManager, IConnectionManager } from './ConnectionManager'
import ChannelNotFoundError from '../errors/ChannelNotFoundError'
import Consumer from './Consumer'
import Producer from './Producer'

const TOPIC_LIST: string[] = ['algorithm', 'graph', 'dp']
const DIFFICULTY_LEVELS: string[] = ['easy', 'medium', 'hard']

const testMessages: MatchRequest[] = [
  new MatchRequest('john', 'algorithm', 'hard'),
  new MatchRequest('amy', 'algorithm', 'medium'),
  new MatchRequest('johhny', 'graph', 'easy'),
  new MatchRequest('bob', 'graph', 'easy'),
  new MatchRequest('the builder', 'dp', 'medium')
]

class AmqpService {
  private exchange: string
  private connectionManager: IConnectionManager

  private constructor (exchange: string, connectionManager: IConnectionManager) {
    this.exchange = exchange
    this.connectionManager = connectionManager
  }

  private async init (): Promise<void> {
    const channel: Channel | null = this.connectionManager.getChannel()
    if (!channel) {
      return
    }
    channel.assertExchange(this.exchange, 'headers', { durable: false })
  }

  public static async of (connectionUrl: string, exchange: string): Promise<AmqpService> {
    const connectionManager: IConnectionManager = new ConnectionManager()
    const service: AmqpService = new AmqpService(exchange, connectionManager)
    await connectionManager.setup(connectionUrl)
    await service.init()
    await service.startConsumers()
    return service
  }

  public async startProducers (): Promise<void> {
    const channel: Channel = this.connectionManager.getChannel()
    if (channel instanceof ChannelNotFoundError) {
      console.error(channel.message)
      return
    }
    const producer: Producer = new Producer()
    for (const testMessage of testMessages) {
      await producer.sendJsonMessage(testMessage, channel, this.exchange)
    }
  }

  public async startConsumers (): Promise<void> {
    const channel: Channel = this.connectionManager.getChannel()
    if (channel instanceof ChannelNotFoundError) {
      console.error(channel.message)
      return
    }
    const consumer: Consumer = new Consumer()
    for (const topic of TOPIC_LIST) {
      for (const difficulty of DIFFICULTY_LEVELS) {
        await consumer.receiveMessages(topic, difficulty, this.exchange, channel, (msg: QueueMessage | null) => {
          const content = msg?.content.toString()
          if (content) {
            try {
              const matchRequest: MatchRequest = JSON.parse(content)
              console.log(matchRequest)
            } catch (e) {
              if (e instanceof Error) {
                const name = e.message
                console.log(`Error occured ${name}`)
              }
            }
          }
        })
      }
    }
  }
}

export default AmqpService
