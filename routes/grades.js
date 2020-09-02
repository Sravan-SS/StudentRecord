const { isLoggedIn } = require('../middleware/index.js');
const { findById } = require('../models/grades');

var express = require('express'),
  router = express.Router(),
  middleware = require('../middleware/index.js'),
  Grade = require('../models/grades'),
  User = require('../models/user');

// index
router.get('/', middleware.isLoggedIn, async (req, res) => {
  Grade.find({}, async (err, grades) => {
    try {
      res.render('grades/index', {
        grades: grades,
      });
    } catch (err) {
      res.redirect('back');
      console.log(err);
    }
  });
});

// new
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('grades/new');
});

// create
router.post('/', middleware.isLoggedIn, async (req, res) => {
  let newGrade = {};
  newGrade = req.body.grade;
  newGrade.author = {
    id: req.user._id,
  };
  Grade.create(newGrade, (err, newGrade) => {
    try {
      res.redirect('/grades');
    } catch (err) {
      res.redirect('back');
      console.log(err);
    }
  });
});

// show
router.get('/:id', middleware.checkGradeOwnership, (req, res) => {
  Grade.findById(req.params.id)
    .populate('students')
    .exec((err, foundGrade) => {
      try {
        res.render('grades/show', { grade: foundGrade });
      } catch (err) {
        res.redirect('back');
        console.log(err);
      }
    });
});

// edit
router.get('/:id/edit', middleware.checkGradeOwnership, (req, res) => {
  Grade.findById(req.params.id, (err, foundGrade) => {
    try {
      res.render('grades/edit', { grade: foundGrade });
    } catch (err) {
      res.redirect('back');
      console.log(err);
    }
  });
});

// update
router.put('/:id', middleware.checkGradeOwnership, (req, res) => {
  Grade.findByIdAndUpdate(
    req.params.id,
    req.body.grade,
    (err, updatedGrade) => {
      try {
        res.redirect('/grades');
      } catch (err) {
        res.redirect('back');
        console.log(err);
      }
    }
  );
});

// destroy
router.delete('/:id', middleware.checkGradeOwnership, async (req, res) => {
  await Grade.findByIdAndRemove(req.params.id, (err) => {
    try {
      res.redirect('/grades');
    } catch (err) {
      res.redirect('/grades');
      console.log(err);
    }
  });
});

module.exports = router;
