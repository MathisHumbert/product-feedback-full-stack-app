require('dotenv').config();
require('express-async-errors');

// extra securtiy packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');

// router
const feedbackRouter = require('./routes/feedbackRouter');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after an hour',
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// public
app.use(express.static('./public/html'));
app.use(express.static('./public'));

// routes
app.get('/', (req, res) => {
  res.send('Hello world');
});
app.use('/api/v1/feedbacks', feedbackRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
