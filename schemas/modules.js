var mongoose = require('mongoose');

// 业务的表结构

module.exports = new mongoose.Schema({
    //应用名称
    app_name: String,
    //业务线
    business: String,
    //应用负责人
    oprator: String,
    // 创建时间
    create_time: String
})