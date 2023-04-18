const mongoose = require("mongoose");

const ft_achieve = new mongoose.Schema({
    faculty_name:String,
    Achievements: String,
    date: Date,
    shared_with: String,    
},
    {
        collection: "ft_achievements",
    }
);

const ft_achievements = mongoose.model("ft_achievements", ft_achieve);
module.exports = ft_achievements;