const resourceController = require('../../controllers/resource.controller')
const KafkaService = require('../../infra/kafka')

const handlerMap = new Map()
module.exports =async (appName, brokerUris) => {
    const kafkaService = new KafkaService(appName, brokerUris)
    await kafkaService.init()
    handlerMap.set('RESOURCE_CREATED', resourceController.createResource)
    handlerMap.set('USER_CREATED', resourceController.createResourcePolicyForOwner)
    kafkaService.consumeMessage(handlerMap)
    // kafkaService.consumeMessage("GRANT_PERMISSION",resourceController.createResourcePolicyForOwner)
}