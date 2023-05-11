const mongoose = require("mongoose");

const ftforeign = new mongoose.Schema({
    faculty_name:String,
    start_date: String,
    end_date: String,
    country: String,
    visit_details: String,
    
},
    {
        collection: "ft_foreign",
        timestamps: true
    }
);

const ft_foreign = mongoose.model("ft_foreign", ftforeign);
module.exports = ft_foreign;