var mongoose = require('mongoose');
var errorsSchema = require('../schemas/errors');

module.exports = mongoose.model('Error',errorsSchema)