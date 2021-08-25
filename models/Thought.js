const { Schema, model } = require('mongoose');
const validate = require('mongoose-validator');
const dateFormat = require('../utils/dateFormat');

var textValidator = [
  validate({
    validator: 'isLenght',
    arguments: [3, 50],
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
      get: (createdAtVal) => dateFormat(createAtVal)
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