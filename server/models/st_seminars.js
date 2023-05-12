const mongoose = require("mongoose");

const stseminar = new mongoose.Schema({
    faculty_name:String,
    title: String,
    institute: String,
    dept: String,
    date: String,
    additional_info: String,
 
    
},
    {
        collection: "staseminars",
        timestamps: true
    }
);

const staseminars = mongoose.model("staseminars", stseminar);
module.exports = staseminars;