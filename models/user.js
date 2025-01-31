var mongoose = require('mongoose'),
  passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  school: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
