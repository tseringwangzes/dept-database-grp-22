const mongoose = require("mongoose");

const ftschema = new mongoose.Schema({
    faculty_name:String,
    award_name: String,
    date: String,
    shared_with: String,
    additional_info:String,
    created_At: Date
    
},
    {   
        timestamps: true,
        collection: "ft_award",
    }
);

const ft_awards = mongoose.model("ft_award", ftschema);
module.exports = ft_awards;