const mongoose = require("mongoose");

const stachieve = new mongoose.Schema({
    faculty_name:String,
    student_name:String,
    achievements: String,
    date: String,
    shared_with: String,
    link: String,
    status: String,
    
},
    {
        collection: "stachievements",
        timestamps: true
    }
);

const stachievements = mongoose.model("stachievements", stachieve);
module.exports = stachievements;