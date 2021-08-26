const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    usename: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
        
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// virtual to get friends array lenght
userSchema.virtual('userFriendCount').get(function() {
  return this.friends.lenght;
});

// creating and exportin User model
const User = model('User', userSchema);

module.exports = User;