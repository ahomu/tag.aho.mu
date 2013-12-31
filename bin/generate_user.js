/**
 * Dependencies
 */
var mongoose = require('mongoose');
var inquirer = require("inquirer");

/**
 * Initialization
 */
var User  = require('../app/admin/models/user');
mongoose.connect('mongodb://127.0.0.1/koarecipe');

var questions = [
  {
    type: 'text',
    name: 'email',
    message: 'Please input user\'s e-mail address'
  },
  {
    type: 'list',
    name: 'role',
    message: 'Please select  user\'s role',
    choices: ['admin', 'member']
  },
  {
    type: 'password',
    name: 'password',
    message: 'Please input user\'s password'
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Is it OK?'
  }
];

inquirer.prompt(questions, function(answers) {
  User.create({
    email: answers.email,
    role: answers.role,
    password: answers.password
  }, function(err) {
    if (err) {
      console.log('error!!');
    } else {
      console.log(answers.email + ' created!');
    }
    process.exit(0);
  });
});