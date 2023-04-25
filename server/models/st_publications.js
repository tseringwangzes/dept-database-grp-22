const mongoose = require("mongoose");

const stpublica = new mongoose.Schema({
    faculty_name:String,
    student_name:String,
    topic: String,
    published_date: Date,
    accepted_date: Date,
    collaboration: String,
    no_of_students: String,
    status: String,
    
},
    {
        collection: "stpublication",
        timestamps: true
    }
);

const stpublication = mongoose.model("stpublication", stpublica);
module.exports = stpublication;