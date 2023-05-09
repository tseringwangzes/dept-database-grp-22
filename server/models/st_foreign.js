const mongoose = require("mongoose");

const staforeign = new mongoose.Schema({
    faculty_name:String,
    student_name:String,
    start_date: String,
    end_date: String,
    country: String,
    visit_details: String,
    visit_link: String,
    status: String
    
},
    {
        collection: "stforeign",
        timestamps: true
    }
);

const stforeign = mongoose.model("stforeign", staforeign);
module.exports = stforeign;