const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const moment = require('moment');

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
      },
      username: {
          type: String,
          required: true,
      },
      createdAt: {
          type: Date,
          default: Date.now,   
          get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      }
  },
  {
      toJSON: {
          getters: true
      }
  }
);

const thoughtSchema = new Schema({
  thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  username: {
      type: String,
      required: true
  },
  reactions: [reactionSchema]
},
  {
      toJSON: {
          virtuals: true,
          getters: true
      },
      id: false
  }
);

// virutal to get the reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.lenght;
})

// creating and exporting tought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;