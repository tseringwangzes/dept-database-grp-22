const mongoose = require("mongoose");

const detailing = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        default: "Faculty Name"
    },
    webLink: {
        type: String,
        trim: true,
        default: "personal-link.com"
    },
    email_id: {
        type: String,
        trim: true,
        default: "id@iitrpr.ac.in"
    },
    phD: {
        type: String,
        trim: true,
        default: "University"
    },
    research: {
        type: String,
        trim: true,
        default: "Computer Science"
    },
    image: {
        type: String, 
        trim: true,
        default: "default-image-url.com"
    }
});

// Creating model
const deptFaculty = mongoose.model("deptFaculty", detailing);

module.exports = deptFaculty;
