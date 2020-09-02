var mongoose = require('mongoose');

var gradeSchema = new mongoose.Schema({
  std: String,
  division: String,
  date: { type: Date, default: Date.now },
  year: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
});

module.exports = mongoose.model('Grade', gradeSchema);
