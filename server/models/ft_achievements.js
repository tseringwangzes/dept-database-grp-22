const mongoose = require("mongoose");

const ft_achieve = new mongoose.Schema({
    faculty_name:String,
    date: String,
    shared_with: String,    
    Achievements: String,
    additional_info:String,
},
    {
        collection: "ft_achievements",
        timestamps: true
    }
);

const ft_achievements = mongoose.model("ft_achievements", ft_achieve);
module.exports = ft_achievements;