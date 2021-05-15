const resourcePolicyService = require('../services/resource-policy')
const resourceService = require('../services/resource')

module.exports =({
    createResource: async function (eventValue) {
      const { userId, resourceId } = eventValue
      await resourceService.createResource({ userId, resourceId })
      return true
    },
    createResourcePolicyForOwner: async function (eventValue) {
        const { userId } = eventValue
        await resourcePolicyService.createResourcePolicyForOwner({ userId })
        return true
      },
    grantPermissionForUser: async function (eventValue) {
        const listOperationValid = ["READ, SIGN"]
        const { userId, resourceId, type, operations } = eventValue
        if(! operations.some(r=> listOperationValid.indexOf(r) < 0))
         throw new Error("Invalid operation")
        await resourcePolicyService.grantPermisionForUser({ userId, resourceId, type, operations })
        return true
    },
    checkIsAuthorized: async function ({ userId, resourceId, operations}){
      const resource = await resourceService.findById({resourceId})
      if(!resource) return false
      return await resourcePolicyService.checkIsAuthorized({userId,resourceId, ownerId: resource.ownerId, operations})
    }
})
