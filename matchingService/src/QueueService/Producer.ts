import { Channel } from 'amqplib'
import MatchRequest from './MatchRequest'
import { MessageHeader } from './MessageHeaders'

class Producer {
  constructor () {

  }

  public async sendJsonMessage (msg: MatchRequest, channel: Channel, exchange: string): Promise<void> {
    const messageHeaders: MessageHeader = {
      topic: msg.getTopic(),
      difficulty: msg.getDifficulty()
    }
    channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)), {
      headers: messageHeaders
    })
    console.log('Successfully sent message!')
  }
}

export default Producer
