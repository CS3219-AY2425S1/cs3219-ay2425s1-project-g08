import { Channel } from 'amqplib'
import QueueMessage from './QueueMessage'
import { ConsumerMessageHeaderReq } from './MessageHeaders'

class Consumer {
  constructor () {

  }

  public async receiveMessages (topic: string, difficulty: string, exchange: string, channel: Channel, callback: (msg: QueueMessage | null) => void): Promise<void> {
    const queue = await channel.assertQueue('', { exclusive: true })
    const queueName = queue?.queue
    if (!queueName) {
      return
    }

    const headers: ConsumerMessageHeaderReq = {
      'x-match': 'all',
      topic,
      difficulty
    }

    await channel.bindQueue(queueName, exchange, '', headers)
    console.log('Consumer ready')
    await channel.consume(queueName, (message) => {
      callback(message)
    }, { noAck: true })
  }
}

export default Consumer
