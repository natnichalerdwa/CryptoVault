import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Error fetching users',
      error: err.message,
    });
  }
};


export const getUserById = async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await User.findOne({ userID });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Error fetching user',
      error: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { userID } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { userID },
      { password },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Error updating user',
      error: err.message,
    });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Name, email, and password are required!',
    });
  }

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: { user: newUser },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Error registering user',
      error: err.message,
    });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    res.status(204).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getUserById,
  updateUser,
  createUser,
  deleteUser,
  getAllUsers

};
