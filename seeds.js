var mongoose = require('mongoose'),
  Grade = require('./models/grades'),
  Student = require('./models/students');

var seeds = [
  {
    std: '10',
    division: 'A',
    year: '2020',
  },
  {
    std: '9',
    division: 'B',
    year: '2019',
  },
  {
    std: '8',
    division: 'E',
    year: '2018',
  },
];

async function seedDB() {
  try {
    // removing all classes and students
    await Grade.deleteMany({});
    console.log('CLASSES REMOVED!');
    await Student.deleteMany({});
    console.log('STUDENTS REMOVED!');
    // adding few classes
    for (const seed of seeds) {
      let grade = await Grade.create(seed);
      let student = await Student.create({
        name: 'sravan ss',
        gender: 'Boy',
        adNo: '12345',
        dateOfBirth: '2012-12-05',
        father: {
          name: 'Surendren',
          occupation: 'Teaching',
          income: '600000',
        },
        mother: {
          name: 'Sheeja',
          occupation: 'Teaching',
          income: '600000',
        },
        phoneNo: '7902415779',
        religion: 'Hindu',
        caste: 'Thiyya',
        category: 'OBC',
        dateOfAdmission: '2020-12-12',
        bloodGroup: 'O+ve',
        address: {
          streetAddress: 'Saranga Edakkulam Koilandy',
          city: 'Calicut',
          PIN: '673306',
        },
        adharNo: '1234567890',
        bank: {
          accNo: '1234567890',
          IFSC: '12345',
        },
      });
      grade.students.push(student);
      grade.save();
      console.log('SEEDS ADDED!');
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = seedDB;
