const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      minlenght: 1
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const toughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      maxlength: 280,
      minlenght: 1
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
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
      getters: true
    },
    id: false
  }
);

// virutal to get the reaction count
toughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.lenght;
})

// creating and exporting tought model
const Tought = model('Tought', toughtSchema);

module.exports = Tought;