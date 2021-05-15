const express = require('express')
const { body, validationResult } = require('express-validator')
const { resource: handler } = require('../../controllers')

const {
  format,
  codes: { req: reqCodes }
} = require('../../utils/errors')

const router = express.Router()

router.post(
  '/authorization',
  body('userId')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(reqCodes.missing_param)
    .isString()
    .withMessage(reqCodes.type_mismatch)
    .trim(),
  body('resourceId')
    .exists()
    .withMessage(reqCodes.missing_param)
    .isString()
    .withMessage(reqCodes.type_mismatch)
    .trim(),
    body('operations')
    .exists()
    .withMessage(reqCodes.missing_param)
    .isArray()
    .withMessage(reqCodes.type_mismatch),
  async (req, res, next) => {
    try{
    // request validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: format(errors) })
    }
     const { userId, resourceId, operations} = req.body
    const isAuthorized = await handler.checkIsAuthorized({userId, resourceId, operations })
    if(!isAuthorized){
      return res.status(403).json({ error: "Dont have permission" })
    }
    return res.status(200).json({status: true})
    } catch(e){
      console.log(e)
      return res.status(500).json({error: "Interal error"})
    }
  }
)

module.exports = { endpoint: '/', router }
