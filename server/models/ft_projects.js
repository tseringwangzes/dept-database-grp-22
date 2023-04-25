const mongoose = require("mongoose");

const ftprojects = new mongoose.Schema({
    faculty_name: String,
    topic: String,
    date: String,
    granted_money: String,
    status: String,
},
    {
        collection: "ft_projects",
        timestamps: true
    }
);

const ft_projects = mongoose.model("ft_projects", ftprojects);
module.exports = ft_projects;