
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
+
* User
*
* Id: int
* name: String
* email: String
* nickname: String
* supervisor_id : String
* */

var UserSchema = new Schema({
    name: String,
    email: String,
    nickname: String,
    supervisorId : String,
    lastAccess : Date
});
module.exports = mongoose.model('users', UserSchema);

