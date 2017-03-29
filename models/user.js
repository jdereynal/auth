import mongoose from 'mongoose'
mongoose.Promise = global.Promise

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true
  }
}, {collection: 'users'})

const User = mongoose.model('User', userSchema);

export default User;
