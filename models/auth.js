const mongoose = require("mongoose");
const { Schema } = mongoose;

const auth = new Schema({
    LoginId : {
        type : String,
        trim : true,
        required : true 
    },

    password : {
        type : String,
        trim : true,
        required : true
    }
});

module.exports = mongoose.model("Auth", auth);