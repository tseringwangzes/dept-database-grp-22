const mongoose = require("mongoose");

const ftschema = new mongoose.Schema({
    faculty_name:String,
    award_name: String,
    date: String,
    shared_with: String,
    created_At: Date,
    additional_info:String,
},
    {   
        timestamps: true,
        collection: "ft_award",
    }
);

const ft_awards = mongoose.model("ft_award", ftschema);
module.exports = ft_awards;