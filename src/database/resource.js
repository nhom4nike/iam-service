const { Schema } = require('mongoose')

const resourceSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.String,
      immutable: true,
      required: true,
      index: true,
    },
    resourceId: {
        type: Schema.Types.String,
        immutable: true,
        required: true,
        index: true,
      }
  },
 {
   timestamps: true
 }
)
resourceSchema.index({ownerId: 1,  resourceId: 1}, { unique: true})
module.exports = function (mongoose) {
  return mongoose.model(
    'Resource',
    new Schema(
      {
        ownerId: {
          type: Schema.Types.String,
          immutable: true,
          required: true,
          index: true,
        },
        resourceId: {
            type: Schema.Types.String,
            immutable: true,
            required: true,
            index: true,
          }
      },
     {
       timestamps: true
     }
    )
  )
}
