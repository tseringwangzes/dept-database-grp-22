const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
    email_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        default: ""
    },
    webLink: {
        type: String,
        trim: true,
        default: "personal-link.com"
    },
    subjects: {
        type: [String],
        trim: true,
        default: []
    },
    research: {
        type: String,
        trim: true,
        default: "Nothing to Show Here"
    },
    education: {
        type: String,
        trim: true,
        default: "Nothing to Show Here"
    }
});

// Creating model
const StPersonalDetails = mongoose.model("StPersonalDetails", detailsSchema);

module.exports = StPersonalDetails;
