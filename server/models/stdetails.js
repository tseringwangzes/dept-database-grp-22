const mongoose = require("mongoose");

const stschema = new mongoose.Schema({
    faculty_name:String,
    student_name:String,
    award_name: String,
    date: String,
    shared_with: String,
    award_link: String,
    additional_info:String,
    status: String,
    
},
    {
        collection: "phdstudents",
    }
);

const phdstudents = mongoose.model("phdstudents", stschema);
module.exports = phdstudents;