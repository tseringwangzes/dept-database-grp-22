const mongoose = require("mongoose");

const ftforeign = new mongoose.Schema({
    faculty_name:String,
    topic: String,
    start_date: Date,
    end_date: Date,
    country: String,
    
},
    {
        collection: "ft_foreign",
    }
);

const ft_foreign = mongoose.model("ft_foreign", ftforeign);
module.exports = ft_foreign;