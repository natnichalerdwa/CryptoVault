// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const MONGO_URI = 'mongodb://localhost:27017/mydatabase';

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
//   isVerified: Boolean,
// });

// const User = mongoose.model('User', userSchema);

// const encryptPasswords = async () => {
//   try {
//     const users = await User.find();
//     for (const user of users) {
//       if (!user.password.startsWith('$2a$')) {
//         const hashedPassword = await bcrypt.hash(user.password, 12);
//         await User.updateOne(
//           { _id: user._id },
//           { $set: { password: hashedPassword } }
//         );
//         console.log(`Password updated for user: ${user.email}`);
//       }
//     }
//     console.log('All passwords are encrypted.');
//   } catch (error) {
//     console.error('Error encrypting passwords:', error);
//   } finally {
//     mongoose.disconnect();
//   }
// };

// encryptPasswords();
