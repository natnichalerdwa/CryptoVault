import * as authService from '../services/authService.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Ensure all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Call the signup service
    const result = await authService.signup(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Call the login service
    const user = await authService.login(email, password);
    req.session.user = user; // Save user details in the session
    res.status(200).json({ message: 'User logged in successfully', user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed.' });
      }
      res.clearCookie('sessionId'); // Clear the session cookie
      res.status(200).json({ message: 'Logged out successfully.' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
