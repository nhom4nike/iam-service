const { Kafka } = require('kafkajs')

class KafkaService {
  constructor(appName, brokerUris) {
    this.appName = appName
    this.brokerUris = brokerUris
    this.kafkaIntance = new Kafka({
      clientId: appName,
      brokers: brokerUris
    })
  }

  async init() {
    const producer = this.kafkaIntance.producer()
    const consumer = this.kafkaIntance.consumer({
      groupId: `${this.appName}-group`
    })
    this.producer = producer
    this.consumer = consumer
    await this.producer.connect()
    await this.consumer.connect()
  }

  async sendMessage(topic, messages) {
    try {
      await this.producer.send({ topic, messages })
    } catch (e) {
      console.log('Kafka -> sendMessage error', e)
      throw new Error('Kafka sendMessage error')
    }
  }

  async consumeMessage(handlerMap) {
    try {
      const subScribeTopics = [...handlerMap.keys()]
      await Promise.all(subScribeTopics.map(async topicName => {
        await this.consumer.subscribe({ topic: topicName, fromBeginning: true })
      }))
      await this.consumer.run({
        eachMessage: async ({ topic, message }) => {
          console.log('received message from topic: ', topic)
          const data = JSON.parse(message.value.toString())
          const callback = handlerMap.get(topic)
          callback(data)
        }
      })
    } catch (e) {
      console.log('Kafka -> consumeMessage error', e)
      throw new Error('Kafka consumeMessage error')
    }
  }
}

module.exports = KafkaService
