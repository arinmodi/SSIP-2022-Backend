const mongoose = require("mongoose");
const { Schema } = mongoose;

const issueSchema = new Schema({

    title : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    medias : [{
        url : {
            type : String,
            required : true
        },

        type : {
            type : String,
            required : true
        }
    }],

    area : {
        type : String,
        required : true
    },

    location : {
        type: { type: String },
        coordinates: [Number],
    },

    contact : {
        type : String,
        required : true
    },

    status : {
        type : String,
        default : "0"
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

issueSchema.index({ "location" :  "2dsphere" });

module.exports = mongoose.model("Issues", issueSchema);