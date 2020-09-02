// packages
var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  methodOverride = require('method-override'),
  seedDB = require('./seeds'),
  passport = require('passport'),
  localStrategy = require('passport-local'),
  flash = require('connect-flash'),
  passportLocalMongoose = require('passport-local-mongoose');

// routes
var studentRoutes = require('./routes/students'),
  gradeRoutes = require('./routes/grades'),
  indexRoutes = require('./routes/index');

// models
var Grade = require('./models/grades'),
  Students = require('./models/students'),
  User = require('./models/user');

// mongoose
mongoose
  .connect(
    'mongodb+srv://Sravan:saranga1999@cluster0.dtfet.mongodb.net/student_record?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log('DATABASE CONNECTED!'))
  .catch((err) => console.log('ERROR: ', err.message));

// express
app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

// passport config.
app.use(
  require('express-session')({
    secret: "I'm going down",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// express
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.path = req.path;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});
app.use((req, res, next) => {
  res.locals.capitalize = (input) => {
    if (input) {
      var words = input.split(' ');
      var CapitalizedWords = [];
      words.forEach((element) => {
        CapitalizedWords.push(
          element[0].toUpperCase() + element.slice(1, element.length)
        );
      });
      return CapitalizedWords.join(' ');
    }
  };

  next();
});

app.use('/grades/:id/students', studentRoutes);
app.use('/grades', gradeRoutes);
app.use(indexRoutes);

//seedDB();

// listener
app.listen(process.env.PORT || 3000, () => {
  console.log('PROJECT SERVER STARTED!');
});
