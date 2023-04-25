const mongoose = require("mongoose");

const staforeign = new mongoose.Schema({
    faculty_name:String,
    student_name:String,
    topic: String,
    start_date: String,
    end_date: String,
    country: String,
    status: String
    
},
    {
        collection: "stforeign",
        timestamps: true
    }
);

const stforeign = mongoose.model("stforeign", staforeign);
module.exports = stforeign;