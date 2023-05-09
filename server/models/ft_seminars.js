const mongoose = require("mongoose");

const ftschema = new mongoose.Schema({
    speaker: String,
    title: String,
    designation: String,
    institute: String,
    venue: String,
    num_participant: String,
    date: String,
    dept: String,
    additional_info: String,
},
    {
        collection: "ft_seminars",
        timestamps: true
    }
);

const ft_seminars = mongoose.model("ft_seminars", ftschema);
module.exports = ft_seminars;