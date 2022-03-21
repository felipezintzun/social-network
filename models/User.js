const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v)
      }
    },
    message: props => `${props.value} is not a valid email!` 
   },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// get total count of friends
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// create the User model using the userSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;