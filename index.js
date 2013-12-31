process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT     = process.env.port || 3000;
process.env.SECRET   = process.env.SECRET || 'abrahadbra';

require('mongoose').connect('mongodb://127.0.0.1/koarecipe');
require('./app').listen(process.env.PORT, function() {
  console.log('listening on %d', process.env.PORT);
});