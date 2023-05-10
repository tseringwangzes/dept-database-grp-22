const mongoose = require("mongoose");

const stpublica = new mongoose.Schema({
    faculty_name:String,
    student_name:String,
    title: String,
    author: String,
    type: String,
    title_publish:String,
    patent_no:String,
    accepted_date: String,
    published_date: String,
    assignee: String,
    impact_factor: String,
    additional_info: String,
    link: String,
    status: String,
    
    
},
    {
        collection: "stpublication",
        timestamps: true
    }
);

const stpublication = mongoose.model("stpublication", stpublica);
module.exports = stpublication;