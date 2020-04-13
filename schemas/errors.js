var mongoose = require('mongoose');

//部门的表结构

module.exports = new mongoose.Schema({
    //编号
    id: Number,
    //业务
    business: String,
    //工程
    project: String,
    //异常信息
    errorContent: String,
    //文件路径
    filePath: String,
    // 异常行号
    errorRow: String,
    // 异常列号
    errorColumn: String,
    // 时间
    time: String,
})