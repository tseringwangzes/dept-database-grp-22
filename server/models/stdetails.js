const mongoose = require("mongoose");

const stschema = new mongoose.Schema({
    faculty_name:String,
    student_name:String,
    award_name: String,
    award_reason: String,
    date: String,
    shared_with: String,
    link: String,
    status: String,
    
},
    {
        collection: "phdstudents",
    }
);

const phdstudents = mongoose.model("phdstudents", stschema);
module.exports = phdstudents;