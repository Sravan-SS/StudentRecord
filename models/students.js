var mongoose = require('mongoose');
var studentSchema = new mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  date: { type: Date, default: Date.now },
  name: String,
  gender: String,
  adNo: String,
  dateOfBirth: Date,
  father: {
    name: String,
    occupation: String,
    income: String,
  },
  mother: {
    name: String,
    occupation: String,
    income: String,
  },
  phoneNo: String,
  religion: String,
  caste: String,
  category: String,
  dateOfAdmission: Date,
  bloodGroup: String,
  address: {
    streetAddress: String,
    city: String,
    PIN: String,
  },
  adharNo: String,
  bank: {
    accNo: String,
    IFSC: String,
  },
});

module.exports = mongoose.model('Student', studentSchema);
