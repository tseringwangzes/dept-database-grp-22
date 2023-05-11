const mongoose = require("mongoose");

const ftpublications = new mongoose.Schema({
    faculty_name:String,
    title: String,
    author: String, 
    type: String, 
    title_publish:String,

    patent_no:String,

    accepted_date: String,
    published_date: String,

    assignee: String,

    impact_factor: String,
    
    additional_info: String,
    link: String,
   
    
},
    {
        collection: "ft_publications",
        timestamps: true
    }
);

const ft_publications = mongoose.model("ft_publications", ftpublications);
module.exports = ft_publications;

/*
 topic: String,
    published_date: String,
    accepted_date:String,
    collaboration: String,

 */