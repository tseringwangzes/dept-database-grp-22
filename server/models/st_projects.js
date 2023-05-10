const mongoose = require("mongoose");

const stprojects = new mongoose.Schema({
    title: String,
    start_date: String,
    dept:String,
    faculty_name:String,    
    student_name:String,
    funding_agency: String,
    funds: String,    
    ongoing: String,
    link: String,
    status: String,   
},
    {
        collection: "stprojects",
        timestamps: true
    }
);

const st_projects = mongoose.model("stprojects", stprojects);
module.exports = st_projects;