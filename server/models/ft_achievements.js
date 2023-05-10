const mongoose = require("mongoose");

const ft_achieve = new mongoose.Schema({
    faculty_name:String,
    title: String,
    date: String,
    institute: String,    
    dept: String,
    additional_info:String,
},
    {
        collection: "ft_achievements",
        timestamps: true
    }
);

const ft_achievements = mongoose.model("ft_achievements", ft_achieve);
module.exports = ft_achievements;