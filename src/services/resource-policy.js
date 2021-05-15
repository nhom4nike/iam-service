const resourcePolicyModel = require('../database/resource-policy')(global.mongoose)

module.exports = ({
    createResourcePolicyForOwner: async ({
        userId,
    }) => {
        const resourcePolicy = await resourcePolicyModel.create({
            userId: userId,
            type: 
                "Allow"
            ,
            policyResource: `${userId}/*`,
            operations: [
                "READ",
                "GRANT",
                "SIGN",
                "DELETE"
              ]
        })
        return resourcePolicy
    },
    checkIsAuthorized: async function({userId, resourceId, ownerId, operations }){
        if(userId === ownerId)  return true
        const policyResource = `${userId}/${resourceId}`
        const resourcePolicy = await resourcePolicyModel.findOne({
            policyResource,
            type: "Allow"
        })
        if(!resourcePolicy) return false
        if(operations.some(r=> resourcePolicy.operations.indexOf(r) < 0)) return false
        return true
    }
})