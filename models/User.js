const { Schema, model } = require('mongoose');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

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
      validate: [validateEmail, 'Please fill a valid email address'],
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
        ref: [this]
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

userSchema.virtual('userFriendCount').get(function() {
  return this.friends.lenght;
});

const User = model('User', userSchema);

module.exports = User;