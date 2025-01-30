import User from '../models/user.js';

export async function signup(name, email, password) {
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // Create and save the new user
  const user = new User({ name, email, password });
  await user.save();

  return { message: 'User registered successfully' };
}

export async function login(email, password) {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if the password matches
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Return the relevant fields
  return { id: user._id, name: user.name, email: user.email };
}
