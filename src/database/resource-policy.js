const { Schema } = require('mongoose')

module.exports = function (mongoose) {
  return mongoose.model(
    'ResoucePolicy',
    new Schema(
      {
        type: {
          type: Schema.Types.String,
          enum: [
            "Allow",
            "Deny"
          ]
        },
        policyResource: {
          type: Schema.Types.String,
          unique: true,
          required: true,
          index: true
        },
        operations: [{
          type: Schema.Types.String,
          required: true,
          enum: [
            "READ",
            "GRANT",
            "SIGN",
            "DELETE"
          ]
        }]
      },
     {
       timestamps: true
     }
    )
  )
}
