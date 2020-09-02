var express = require('express'),
  router = express.Router({ mergeParams: true }),
  middleware = require('../middleware/index.js'),
  Grade = require('../models/grades'),
  Student = require('../models/students');

// new
router.get('/new', middleware.isLoggedIn, (req, res) => {
  Grade.findById(req.params.id, (err, foundGrade) => {
    try {
      res.render('students/new', { grade: foundGrade });
    } catch (err) {
      console.log(err);
      res.redirect('back');
    }
  });
});

// create
router.post('/', middleware.isLoggedIn, async (req, res) => {
  try {
    let grade = await Grade.findById(req.params.id);
    let newStudent = {};
    newStudent = req.body.student;
    newStudent.author = {
      id: req.user._id,
    };
    let student = await Student.create(newStudent);
    // save student
    student.save();
    grade.students.push(student);
    grade.save();
    req.flash('success', 'New student added Successfully');
    res.redirect('/grades/' + grade._id);
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
});

// show
router.get(
  '/:student_id/show',
  middleware.checkStudentOwnership,
  async (req, res) => {
    let foundGrade = await Grade.findById(req.params.id);
    Student.findById(req.params.student_id, (err, foundStudent) => {
      try {
        res.render('students/show', {
          grade: foundGrade,
          student: foundStudent,
          path: 'student',
        });
      } catch (err) {
        console.log(err);
        res.redirect('back');
      }
    });
  }
);

// edit
router.get(
  '/:student_id/edit',
  middleware.checkStudentOwnership,
  async (req, res) => {
    let foundGrade = await Grade.findById(req.params.id);
    Student.findById(req.params.student_id, (err, foundStudent) => {
      try {
        res.render('students/edit', {
          student: foundStudent,
          grade: foundGrade,
        });
      } catch (err) {
        console.log(err);
        res.redirect('back');
      }
    });
  }
);

// update
router.put(
  '/:student_id',
  middleware.checkStudentOwnership,
  async (req, res) => {
    Student.findByIdAndUpdate(
      req.params.student_id,
      req.body.student,
      (err, foundStudent) => {
        try {
          req.flash('success', 'Student updated');
          res.redirect(
            '/grades/' +
              req.params.id +
              '/students/' +
              req.params.student_id +
              '/show'
          );
        } catch (err) {
          console.log(err);
          res.redirect('back');
        }
      }
    );
  }
);

//destroy
router.delete('/:student_id', middleware.checkStudentOwnership, (req, res) => {
  Student.findByIdAndRemove(req.params.student_id, (err) => {
    try {
      req.flash('success', 'Student deleted');
      res.redirect('/grades/' + req.params.id);
    } catch (err) {
      console.log(err);
      res.redirect('back');
    }
  });
});

module.exports = router;
