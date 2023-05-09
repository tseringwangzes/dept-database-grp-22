const mongoose = require("mongoose");

const stseminar = new mongoose.Schema({
    faculty_name:String,
    student_name:String,
    type: String,
    title: String,
    date: String,
    venue: String,
    chief_guest: String,
    mode: String,
    collaborator: String,
    link: String,
    status: String,
    
},
    {
        collection: "staseminars",
        timestamps: true
    }
);

const staseminars = mongoose.model("staseminars", stseminar);
module.exports = staseminars;