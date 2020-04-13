var mongoose = require('mongoose');

// 业务的表结构

module.exports = new mongoose.Schema({
    //编号
    code: Number,
    //业务线名称
    value: String,
})