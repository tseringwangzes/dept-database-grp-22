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
        collection: "stAwardDetails",
        timestamps: true
    }
);

const stAwardDetails = mongoose.model("stAwardDetails", stschema);
module.exports = stAwardDetails;