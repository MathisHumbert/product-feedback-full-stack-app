require('dotenv').config();

const connectDB = require('./db/connect');
const Feedback = require('./models/Feedback');
const jsonFeedbacks = require('./feedbacks.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Feedback.deleteMany();
    await Feedback.create(jsonFeedbacks);
    console.log('Success');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
