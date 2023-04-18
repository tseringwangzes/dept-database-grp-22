const mongoose = require("mongoose");

const staforeign = new mongoose.Schema({
    faculty_name:String,
    student_name:String,
    topic: String,
    start_date: Date,
    end_date: Date,
    country: String,
    faculty_name: String,
    status: String
    
},
    {
        collection: "stforeign",
    }
);

const stforeign = mongoose.model("stforeign", staforeign);
module.exports = stforeign;