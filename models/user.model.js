const Mongoose = require("mongoose"); 

const UserSchema = new Mongoose.Schema({
    user_name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
    },
    password: {
        type: String, 
        required: true
    }, 
    created: {
        type: Date, 
        default: Date.now, 
    }
}); 

const User = Mongoose.model("User", UserSchema); 

module.exports = User; 