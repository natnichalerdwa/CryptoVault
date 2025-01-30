import userCreationModel from '../models/userCreationModel.js';

const createUser = async (userData) => {
  const { firstName, lastName, userID, email, password, phoneNumber, SSN } = userData;
  if (!firstName || !lastName || !userID || !email || !password || !phoneNumber || !SSN) {
    return null;
  }
  return userCreationModel.addUser(userData);
};

export default { createUser };
