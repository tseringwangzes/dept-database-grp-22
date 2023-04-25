const mongoose = require("mongoose");

const ftschema = new mongoose.Schema({
    faculty_name:String,
    type: String,
    title: String,
    date: String,
    venue: String,
    chief_guest: String,
    mode: String,
    collaborator: String,
},
    {
        collection: "ft_seminars",
        timestamps: true
    }
);

const ft_seminars = mongoose.model("ft_seminars", ftschema);
module.exports = ft_seminars;