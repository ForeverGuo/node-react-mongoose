var mongoose = require('mongoose');
var modulesSchema = require('../schemas/modules');

module.exports = mongoose.model('Module',modulesSchema)