const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
  username: {
    type: String,
    unique:true,
    required: true,
  },
  phone: {
    type: String,
    unique:true,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
  password: {
    type: String,
    required: true,
    minLength:6,
  },
  token:String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;