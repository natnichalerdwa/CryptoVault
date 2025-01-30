import mongoose from 'mongoose';

const userCreationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const UserCreation = mongoose.model('UserCreation', userCreationSchema);

export default UserCreation;
