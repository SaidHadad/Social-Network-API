const { Schema, model } = require('mongoose');
const validate = require('mongoose-validator');
const dateFormat = require('../utils/dateFormat');

var textValidator = [
  validate({
    validator: 'isLenght',
    arguments: [1, 280],
    message: "Text should be between 1 and 280 characters"
  })
];

const toughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      validate: textValidator  
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJson: {
      virtual: true,
      getters: trure
    },
    id: false
  }
);

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      validate: textValidator
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// virutal to get the reaction count
toughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.lenght;
})

// creating and exporting tought model
const Tought = model('Tought', toughtSchema);

module.exports = Tought;