import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/userAuthentication.js';
import nodemailer from 'nodemailer';

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  return res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

export const verifyEmail = async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({ resetToken: hashedToken, resetTokenExpiration: { $gt: Date.now() } });
  if (!user) return next(new AppError('Token is invalid or has expired.', 400));
  user.isVerified = true;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();
  return createSendToken(user, 200, res);
};

export const deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(new AppError('User not found', 404));
  return res.status(204).json({ status: 'success', message: 'User deleted successfully' });
};

export const signup = async (req, res, next) => {
  const newUser = await User.create(req.body);
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
  await User.findByIdAndUpdate(newUser._id, {
    resetToken: hashedToken,
    resetTokenExpiration: Date.now() + 10 * 60 * 1000,
  });
  const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify/${verificationToken}`;
  await sendEmail({
    email: newUser.email,
    subject: 'Verify your email',
    message: `Verify your email: ${verificationUrl}`,
  });
  return res.status(201).json({ status: 'success', message: 'Account created. Please verify your email!' });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Please provide email and password!', 400));
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password))) return next(new AppError('Incorrect email or password!', 401));
  if (!user.isVerified) return next(new AppError('Please verify your email before logging in.', 403));
  return createSendToken(user, 200, res);
};

export const resetPassword = async (req, res, next) => {
  const resetToken = req.params.token;
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const user = await User.findOne({ resetToken: hashedToken, resetTokenExpiration: { $gt: Date.now() } });
  if (!user) return next(new AppError('Token invalid or expired', 400));
  user.password = req.body.password;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();
  return createSendToken(user, 200, res);
};

export const sendPasswordResetEmail = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('No user found with that email', 404));
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  await User.findByIdAndUpdate(user._id, {
    resetToken: hashedToken,
    resetTokenExpiration: Date.now() + 10 * 60 * 1000,
  });
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetPassword/${resetToken}`;
  await sendEmail({
    email: user.email,
    subject: 'Password Reset',
    message: `Reset your password: ${resetUrl}`,
  });
  return res.status(200).json({ status: 'success', message: 'Password reset email sent!' });
};

const userAuthenticationController = {
  verifyEmail,
  deleteUser,
  signup,
  loginUser,
  resetPassword,
  sendPasswordResetEmail,
};

export default userAuthenticationController;
