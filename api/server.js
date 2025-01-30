import express from 'express';
import initialize from './service/app.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userCreationRouter from './service/routers/userCreationRouter.js';
import userAuthenticationRouter from './service/routers/userAuthenticationRouter.js';
import cors from 'cors';
import authRouter from './service/routers/authRouter.js';
import session from 'express-session';


// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


// Enable CORS to allow requests from the frontend (assuming frontend is running on http://localhost:3000)
app.options("*", cors());

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_session_secret', // Replace with a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Enable secure cookies in production
      httpOnly: true,
    },
  })
);

// Middleware to parse JSON requests

app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/users/register', userCreationRouter);
app.use('/api/users/login', userAuthenticationRouter);
app.use('/api/users', authRouter);


// Initialize other middleware/services
initialize(app);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
