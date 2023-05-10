const mongoose = require("mongoose");

const ftprojects = new mongoose.Schema({
    title: String,
    start_date: String,
    dept:String,
    faculty_name:String,    
    funding_agency: String,
    funds: String,    
    ongoing: String,
    link: String,
    status: String,   
},
    {
        collection: "ft_projects",
        timestamps: true
    }
);

const ft_projects = mongoose.model("ft_projects", ftprojects);
module.exports = ft_projects;