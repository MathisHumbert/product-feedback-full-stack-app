const getAllFeedback = async (req, res) => {
  res.send('get all feedback');
};

const getSingleFeedback = async (req, res) => {
  res.send('get single feedback');
};

const createFeedback = async (req, res) => {
  res.send('create feedback');
};

const editFeedback = async (req, res) => {
  res.send('edit feedback');
};
const deleteAllFeedback = async (req, res) => {
  res.send('delete feedback');
};

module.exports = {
  getAllFeedback,
  getSingleFeedback,
  createFeedback,
  editFeedback,
  deleteAllFeedback,
};
