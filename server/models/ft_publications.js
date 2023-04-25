const mongoose = require("mongoose");

const ftpublications = new mongoose.Schema({
    faculty_name:String,
    topic: String,
    date: String,
    collaboration: String,
    
},
    {
        collection: "ft_publications",
        timestamps: true
    }
);

const ft_publications = mongoose.model("ft_publications", ftpublications);
module.exports = ft_publications;