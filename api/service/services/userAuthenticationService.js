import userModel from '../models/userAuthenticationModel.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'defaultSecretKey';

const authenticate = async (userID, password) => {
  const user = userAuthenticationModel.findUser(userID);
  if (user && user.password === password) {
    return jwt.sign({ userID: user.userID }, SECRET_KEY, { expiresIn: '1h' });
  }
  return null;
};

export default { authenticate };
