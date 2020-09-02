var Grade = require('../models/grades'),
  Student = require('../models/students');
const grades = require('../models/grades');
const students = require('../models/students');

var middlewareObj = {};

middlewareObj.checkGradeOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    grades.findById(req.params.id, (err, foundGrade) => {
      try {
        if (foundGrade.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'Access denied');
          res.redirect('/grades');
        }
      } catch (err) {
        req.flash('error', 'Class not found');
        res.redirect('/grades');
      }
    });
  } else {
    req.flash('error', 'You need to be Logged In');
    res.redirect('/login');
  }
};

middlewareObj.checkStudentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Student.findById(req.params.student_id, (err, foundStudent) => {
      try {
        if (foundStudent.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'Access denied');
          res.redirect('/grades/' + req.params.id);
        }
      } catch (err) {
        req.flash('error', 'Student not found');
        res.redirect('/grades/' + req.params.id);
      }
    });
  } else {
    req.flash('error', 'You need to be Logged In');
    res.redirect('/login');
  }
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to be Logged In');
  res.redirect('/login');
};

module.exports = middlewareObj;
