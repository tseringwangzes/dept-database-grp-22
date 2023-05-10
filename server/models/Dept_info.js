const mongoose = require("mongoose");

const dept = new mongoose.Schema({

    programs_offered: String,
    st_num_btech:String,
    st_num_mtech:String,
    st_num_ms:String,
    st_num_phd:String,
    hod:String,
    ft_num:String,
    staff_postdoc:String,
    staff_tech:String,
    staff_admin:String,
    thrust: String,
    num_ug_lab:String,
    num_pg_lab:String,
    num_research_lab:String,

}
,
    {
        collection: "dept_info",
    }

);

// Creating model
const dept_info = mongoose.model("dept_info", dept);

module.exports = dept_info;