const resourceModel = require('../database/resource')(global.mongoose)

module.exports = ({
    createResource: async ({
        userId,
        resourceId
    }) => {
        const resource = await resourceModel.create({
            ownerId: userId,
            resourceId
        })
        return resource
    },
    findById: async ({
        resourceId
    }) => {
        const resource = await resourceModel.findOne({
            resourceId
        })
        return resource
    }
})