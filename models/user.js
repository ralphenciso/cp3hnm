const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    firstname: String,
    lastname:String,
    password: String,
    role: String,
});

UserSchema.methods.isAdmin = function(){
    return this.role === 'admin'
}

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);