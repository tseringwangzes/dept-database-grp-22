const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");
const st_schema = require("../models/st_schema");
const stAwardDetail = require("../models/stAwardDetails");
const st_achievements = require("../models/st_achievements");
const st_seminar = require("../models/st_seminars");
const st_for_visits = require("../models/st_foreign");
const st_publi = require("../models/st_publications");
const st_project = require("../models/st_projects");
const csv = require('csvtojson');
const ft_awards = require("../models/ft_awards");
const ft_achievements = require("../models/ft_achievements");
const ft_seminars = require("../models/ft_seminars");
const ft_foreign = require("../models/ft_foreign");
const ft_publications = require("../models/ft_publications");
const ft_projects = require("../models/ft_projects");
const student_award = require("../models/st_award_table");
const personalDetails = require("../models/stu_personal_details");
const ftDetails = require("../models/ft_personal_details");
const dept_info = require("../models/Dept_info");
const deptFaculty = require("../models/deptFaculty")
//var stAwardDetail

const tarnsporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }

})
exports.getFData = async (req,res) => {
    const allData = await deptFaculty.find();
            console.log(allData);
      try {
          
          res.status(200).json(allData)
      
      } catch (error) {
        res.status(400).json(error)
      }
        
     
}

exports.getfaculty = async (req, res) => {
    const email = req.query.email;
    console.log(email)
    try {
        const femail = await users.find({ email: email });
        // const allUser = await stdetails.find().sort({updatedAt: -1});;
        console.log(femail.faculty_name)
        res.status(200).json(femail)
    } catch (error) {
        res.status(401).json(error)
    }
}



exports.userregister = async (req, res) => {
    const { fname, email, usertype } = req.body;

    if (!fname || !email || !usertype) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }

    try {
        const presuer = await users.findOne({ email: email });

        if (presuer) {
            res.status(400).json({ error: "This User Already exist in our db" })
        } else {
            const userregister = new users({
                fname, email, usertype
            });

            // here password hasing

            const storeData = await userregister.save();
            res.status(200).json(storeData);
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};



// user send otp
exports.userOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: "Please Enter Your Email" })
    }


    try {
        const presuer = await users.findOne({ email: email });

        if (presuer) {
            const OTP = Math.floor(100000 + Math.random() * 900000);
            //const OTP = 123456;

            const existEmail = await userotp.findOne({ email: email });


            if (existEmail) {
                const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, {
                    otp: OTP
                }, { new: true }
                );
                await updateData.save();

                const mailOptions = {
                    from: `"Department Database" <${process.env.EMAIL}>`,
                    to: email,
                    subject: "Welcome to Department Database",
                    text: `OTP to login:- ${OTP}`
                }


                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "Email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })
                res.status(200).json({ message: "Email sent Successfully" })//remove this

            } else {

                const saveOtpData = new userotp({
                    email, otp: OTP

                });

                await saveOtpData.save();
                const mailOptions = {
                    from: `"Department Database" <${process.env.EMAIL}>`,
                    to: email,
                    subject: "Welcome to Department Database",
                    text: `OTP to login:- ${OTP}`
                }


                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })
                res.status(200).json({ message: "Email sent Successfully" })//remove this
            }
        } else {
            res.status(400).json({ error: "User Does Not Exist" })
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
};



exports.userApprovalSend = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    if (!email) {
        res.status(400).json({ error: "Please Enter Your Email" })
        return;
    }


    try {
        const presuer = await users.findOne({ email: email });

        if (presuer) {
            const existEmail = await users.findOne({ email: email });
            const myText = "Your Data Approved by faculty Advisor";
            if (existEmail) {
                const mailOptions = {
                    from: `"Department Database" <${process.env.EMAIL}>`,
                    to: email,
                    subject: "Approval Done!",
                    text: myText
                }


                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "Email not send" })
                        return;
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                        return;
                    }
                })

            } else {

                // const saveOtpData = new userotp({
                //     email, otp: OTP
                // });

                // await saveOtpData.save();
                // const mailOptions = {
                //     from: process.env.EMAIL,
                //     to: email,
                //     subject: "Sending Email For Otp Validation",
                //     text: `OTP:- ${OTP}`
                // }

                // tarnsporter.sendMail(mailOptions, (error, info) => {
                //     if (error) {
                //         console.log("error", error);
                //         res.status(400).json({ error: "email not send" })
                //     } else {
                //         console.log("Email sent", info.response);
                //         res.status(200).json({ message: "Email sent Successfully" })
                //     }
                // })
            }
        } else {
            res.status(400).json({ error: "This User Not Exist In our Db" })
            return;
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
        return;
    }
};





exports.userLogin = async (req, res) => {
    const { email, otp, type } = req.body;
    console.log(req.body.otp)

    if (!otp || !email) {
        res.status(400).json({ error: "Please Enter Your OTP and email" })
    }

    try {
        const otpverification = await userotp.findOne({ email: email });
        // console.log(typeverification[0].usertype)
        // console.log(type)
        if (otpverification.otp === otp) {
            var typeverification = await users.find({ email: email, usertype: type });
            if (!typeverification[0]) {
                res.status(400).json({ error: "Invalid User" })
            }
            else if (typeverification && typeverification[0].usertype === type) {
                const preuser = await users.findOne({ email: email });
                // token generate
                const token = await preuser.generateAuthtoken();
                res.status(200).json({ message: "User Login Succesfully Done", userToken: token });
            }
        } else {
            res.status(400).json({ error: "Invalid Otp" })
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
}

exports.userget = async (req, res) => {
    try {
        const usersdata = await st_schema.find();
        res.status(200).json(usersdata)
    } catch (error) {
        res.status(401).json(error)
    }
}

// exports.usergetall = async (req, res) => {
//    const email=req.query.email;
//    console.log(email)
//     try {
//         const allUser = await stdetails.find({student_name:email});

//       //  console.log(allUser)
//         res.status(200).json(allUser)
//     } catch (error) {
//         res.status(401).json(error)
//     }
// }
exports.usergetall = async (req, res) => {
    const email = req.query.email;
    // console.log(email)
    try {
        var allUser
        if (email === "admin") {
            allUser = await stAwardDetail.find().sort({ updatedAt: -1 });
        }
        else {
            allUser = await stAwardDetail.find({ student_name: email }).sort({ updatedAt: -1 });
        }
        // const allUser = await stdetails.find().sort({updatedAt: -1});;
        //  console.log(allUser)
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.deptgetall = async (req, res) => {
        try {
            const allUser = await dept_info.find();
            console.log(allUser)
            res.status(200).json(allUser)
            return res;
        } catch (error) {
            res.status(401).json(error)
            console.log(error)
            return;
        }
    }

exports.stachievem = async (req, res) => {
    try {
        const allUser = await st_achievements.find().sort({ updatedAt: -1 });
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.stsemi = async (req, res) => {
    try {
        const allUser = await st_seminar.find().sort({ updatedAt: -1 });
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.stforvisits = async (req, res) => {
    const email = req.query.email;
    try {
        var allUser
        if (email === "admin") {
            allUser = await st_for_visits.find().sort({ updatedAt: -1 });
        }
        else {
            allUser = await st_for_visits.find({ student_name: email }).sort({ updatedAt: -1 });
        }
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.stpubli = async (req, res) => {
    const email = req.query.email;
    try {
        var allUser
        if (email === "admin") {
            allUser = await st_publi.find().sort({ updatedAt: -1 });
        }
        else {
            allUser = await st_publi.find({ student_name: email }).sort({ updatedAt: -1 });
        }
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.stproj = async (req, res) => {
    const email = req.query.email;
    try {
        var allUser
        if(email==="admin"){
        allUser = await st_project.find().sort({ updatedAt: -1 });
        }
        else{
            allUser = await st_project.find({student_name:email}).sort({ updatedAt: -1 });
        }
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.insert_csv = async (req, res) => {

    const data = req.body;

    for (const entry of data) {
        try {
            // console.log(entry);
            const existingEntry = await stAwardDetail.findOne(entry);
            //console.log(existingEntry);
            if (existingEntry === null) {
                await stAwardDetail.create(entry)
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }

}

exports.st_achievement_csv = async (req, res) => {


    // try {
    //     //console.log(req);
    //     await st_achievements.insertMany(req.body);
    //     res.status(200).json({ message: 'Data successfully inserted' });
    // } catch ( error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'An error occurred while inserting data' });
    // }

    const data = req.body;

    for (const entry of data) {
        try {
            // console.log(entry);
            const existingEntry = await st_achievements.findOne(entry);
            //console.log(existingEntry);
            if (existingEntry === null) {
                await st_achievements.create(entry)
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};

exports.st_project_csv = async (req, res) => {



    const data = req.body;

    for (const entry of data) {
        console.log(data.student_name)
        try {
            console.log(entry);
            const existingEntry = await st_project.findOne(entry);
            //console.log(existingEntry);
            if (existingEntry === null) {
                await st_project.create(entry)
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }


};

exports.st_seminar_csv = async (req, res) => {


    // try {
    //     //console.log(req);
    //     await st_seminar.insertMany(req.body);
    //     res.status(200).json({ message: 'Data successfully inserted' });
    // } catch ( error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'An error occurred while inserting data' });
    // }
    const data = req.body;

    for (const entry of data) {
        try {
            console.log(entry);
            const existingEntry = await st_seminar.findOne(entry);
            // console.log(existingEntry);
            if (existingEntry === null) {
                await st_seminar.create(entry)
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};

exports.st_foreign_csv = async (req, res) => {


    const data = req.body;

    for (const entry of data) {
        console.log(data.student_name)
        try {
            console.log(entry);
            const existingEntry = await st_for_visits.findOne(entry);
            //console.log(existingEntry);
            if (existingEntry === null) {
                await st_for_visits.create(entry)
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};

exports.st_publication_csv = async (req, res) => {



    const data = req.body;

    for (const entry of data) {
        console.log(data.student_name)
        try {
            // console.log(entry);
            const existingEntry = await st_publi.findOne(entry);
            //console.log(existingEntry);
            if (existingEntry === null) {
                await st_publi.create(entry)
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }

};





exports.editdeptinfo = async (req, res) => {
  
const  {programs_offered,
    st_num_btech,
    st_num_mtech,
    st_num_ms,
    st_num_phd,
    hod,
    ft_num,
    staff_postdoc,
    staff_tech,
    staff_admin,
    thrust,}=req.body;
    const data=req.body;
    try {
        const newdeptinfo = new dept_info(data);
        console.log(newdeptinfo);
       
      
        const storeData = await newdeptinfo.save();
        res.status(200).json(storeData);
        
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })

    }
      
          
    
       
 }


exports.useraddmore = async (req, res) => {
    const { award_name, date, shared_with, award_link, additional_info, status, faculty_name, student_name } = req.body;


    // if (!award_name || !date || !status) {
    //     res.status(400).json({ error: "Please Enter All Input Data" })
    // }

    if(shared_with!==""){
        console.log("not null")

        const student_name2 = shared_with.split(',');
     

       
       for(const shared_each_email of student_name2) {
        const shareddata =shared_with.split(',');
           // console.log(student_name2);
            const array=shareddata;
            var index = array.indexOf(shared_each_email)
            array.splice(index, 1);
             array.push(student_name)
           // console.log(array);

            const nshw2=array.toString()
            console.log(nshw2);
            const shareduseraddmore = new stAwardDetail({
                award_name, date, "shared_with": nshw2, status, faculty_name, "student_name": shared_each_email, award_link, additional_info
            });
            // console.log(shareduseraddmore);

            const findAward = await stAwardDetail.findOne({ student_name: shared_each_email, award_name: award_name, date: date, award_link: award_link, additional_info: additional_info })
            // console.log(findAward);
            if (!findAward) {
                const storeData = await shareduseraddmore.save();

            }



        }
    }
    




    try {

        // const femail = await users.findOne({email:student_name});
        // console.log(femail)
        const useraddmore = new stAwardDetail({
            award_name, date, shared_with, status, faculty_name, student_name, award_link, additional_info
        });

        const findAward = await stAwardDetail.findOne({ student_name: student_name, award_name: award_name, date: date, shared_with: shared_with, award_link: award_link, additional_info: additional_info })
        console.log(findAward);
        if (!findAward) {
            const storeData = await useraddmore.save();
            res.status(200).json(storeData);
        }
        else {
            res.status(400).json({ error: "Data already exist" })
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};

exports.st_award_csv = async (req, res) => {

    let data = req.body;
    console.log("student is "+ data.student_name);

    for (const entry of data) {
        try {

            //console.log(entry.status);
            const existingEntry = await stAwardDetail.findOne(entry);
            //console.log(existingEntry);
            if (existingEntry === null) {
                await stAwardDetail.create(entry)
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};

exports.studentHome = async (req, res) => {
    var count = new Array(12);

    var email = req.query.email;
    console.log('student email ', email)

    try {

        const promises = [
            stAwardDetail.countDocuments({ student_name: email }),
            st_achievements.countDocuments({ student_name: email }),
            st_for_visits.countDocuments({ student_name: email }),
            st_project.countDocuments({ student_name: email }),
            st_publi.countDocuments({ student_name: email }),
            st_seminar.countDocuments({ student_name: email }),

        ];

        const results = await Promise.all(promises);

        for (let i = 0; i < results.length; i++) {
            count[i] = results[i];
        }
        const doc = await users.findOne({ email: email })
        let name
        if (doc) {
             name = doc.fname
        } else {
             name = email
        }
        

        count[6] = name;
        //console.log(count);

        const temp = await personalDetails.findOne({ email_id: email })

        if (temp) {
            count[7] = temp.webLink
            count[8] = temp.subjects
            count[9] = temp.research
            count[10] = temp.education
        }

        const det = await personalDetails.findOneAndUpdate(
            { email_id: email },
            { email_id: email },
            { upsert: true, new: true }
        );

        // console.log(count);
        res.status(200).json(count);

    } catch (error) {
        console.log(error);
    }

}

exports.homePost = async (req, res) => {
    const type = req.body.type;
    const myEmail = req.body.email
    //console.log(req.body);

    try {
        if (type === 'List') {

            var myList = req.body.subList
            const document = await personalDetails.findOneAndUpdate({ email_id: myEmail }, { subjects: myList });
            //console.log(document);
            res.status(200).json({ message: 'Items Added Successfully' });

        } else if (type === 'Research') {
            var myMsg = req.body.msg
            await personalDetails.findOneAndUpdate({ email_id: myEmail }, { research: myMsg });
            res.status(200).json({ message: 'Items Added Successfully' });

        } else if (type === 'Education') {


            var myMsg = req.body.msg
            await personalDetails.findOneAndUpdate({ email_id: myEmail }, { education: myMsg });
            res.status(200).json({ message: 'Items Added Successfully' });
        } else if (type === 'Link') {
            var myMsg = req.body.edit
            await personalDetails.findOneAndUpdate({ email_id: myEmail }, { webLink: myMsg });
            res.status(200).json({ message: 'Items Added Successfully' });
        }


    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

exports.ftHomePost = async (req, res) => {

    const type = req.body.type;
    const myEmail = req.body.email
    console.log(req.body);

    try {
        if (type === 'List') {

            var myList = req.body.subList
            const document = await ftDetails.findOneAndUpdate({ email_id: myEmail }, { studentsUnder: myList });
            //console.log(document);
            res.status(200).json({ message: 'Items Added Successfully' });

        } else if (type === 'Research') {
            var myMsg = req.body.msg
            await ftDetails.findOneAndUpdate({ email_id: myEmail }, { research: myMsg });

            res.status(200).json({ message: 'Items Added Successfully' });

        } else if (type === 'Education') {


            var myMsg = req.body.msg
            await ftDetails.findOneAndUpdate({ email_id: myEmail }, { education: myMsg });
            res.status(200).json({ message: 'Items Added Successfully' });
        } else if (type === 'Link') {
            var myMsg = req.body.edit
            await ftDetails.findOneAndUpdate({ email_id: myEmail }, { webLink: myMsg });
            res.status(200).json({ message: 'Items Added Successfully' });
        }


    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }


}


exports.facultyHome = async (req, res) => {

    var count = new Array(12);
    var email = req.query.email;
    //console.log(email);

    try {

        const promises = [
            ft_awards.countDocuments({ faculty_name: email }),
            ft_achievements.countDocuments({ faculty_name: email }),
            ft_foreign.countDocuments({ faculty_name: email }),
            ft_projects.countDocuments({ faculty_name: email }),
            ft_publications.countDocuments({ faculty_name: email }),
            ft_seminars.countDocuments({ faculty_name: email })
        ];

        const results = await Promise.all(promises);

        for (let i = 0; i < results.length; i++) {
            count[i] = results[i];
        }

        const doc = await users.findOne({ email: email })
        let name
        if (doc) {
             name = doc.fname
        } else {
             name = email
        }

        count[6] = name;
        //console.log(count);

        const temp = await ftDetails.findOne({ email_id: email })

        if (temp) {
            count[7] = temp.webLink
            count[8] = temp.studentsUnder
            count[9] = temp.research
            count[10] = temp.education
        }

        const det = await ftDetails.findOneAndUpdate(
            { email_id: email },
            { email_id: email },
            { upsert: true, new: true }
        );

        res.status(200).json(count);





    } catch (error) {
        console.log(error);
    }
}

exports.facultygetawards = async (req, res) => {
    const email = req.query.email;
    try {
        var allUser
        if (email === "admin") {
            allUser = await ft_awards.find().sort({ updatedAt: -1 });
        }
        else {
            allUser = await ft_awards.find({ faculty_name: email }).sort({ updatedAt: -1 });
        }
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}


exports.facultygetachievements = async (req, res) => {
    const email = req.query.email;
    try {
        var allUser
        if (email === "admin") {
            allUser = await ft_achievements.find().sort({ updatedAt: -1 });
        }
        else {
            allUser = await ft_achievements.find({ faculty_name: email }).sort({ updatedAt: -1 });
        }
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.facultygetseminars = async (req, res) => {
    const email = req.query.email;
    try {
        var allUser
        if(email === "admin"){
        allUser = await ft_seminars.find().sort({ updatedAt: -1 });
        }
        else{
            allUser = await ft_seminars.find({faculty_name:email}).sort({ updatedAt: -1 });
        }
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.facultygetforeign = async (req, res) => {
    const email = req.query.email;
    try {
        var allUser
        if (email === "admin") {
            allUser = await ft_foreign.find().sort({ updatedAt: -1 });
        }
        else {
            allUser = await ft_foreign.find({ faculty_name: email }).sort({ updatedAt: -1 });
        }
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.facultygetpublications = async (req, res) => {
    const email = req.query.email;
    try {
        var allUser
        if (email === "admin") {
            allUser = await ft_publications.find().sort({ updatedAt: -1 });
        }
        else {
            allUser = await ft_publications.find({ faculty_name: email }).sort({ updatedAt: -1 });
        }
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.facultygetprojects = async (req, res) => {
    const email=req.query.email;
    try {
        var allUser
        if(email==="admin"){
        allUser = await ft_projects.find().sort({ updatedAt: -1 });
        }
        else{
        allUser = await ft_projects.find({faculty_name:email}).sort({ updatedAt: -1 });
        }
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.facultyaddawards = async (req, res) => {
    const { award_name, award_reason, date, shared_with, faculty_name, additional_info } = req.body;

    // if (!award_name || !date || !shared_with || !faculty_name || !additional_info) {
    //     res.status(400).json({ error: "Please Enter All Input Data" })
    // }

if(shared_with!==""){

    const student_name2 = shared_with.split(',');
    for(const shared_each_email of student_name2) {
    
        const shareddata =shared_with.split(',');

    
        const array=shareddata;
        var index = array.indexOf(shared_each_email)
        array.splice(index, 1);
         array.push(faculty_name)
       // console.log(array);

        const nshw2=array.toString()

        const facultyaddawards = new ft_awards({
            award_name, award_reason, date, "shared_with":nshw2, "faculty_name":shared_each_email, additional_info
        });
        const findAward = await ft_awards.findOne({ award_name:award_name, award_reason:award_reason, date:date, shared_with:shared_with, faculty_name:faculty_name, additional_info:additional_info })
        if (!findAward) {
            const storeData = await facultyaddawards.save();
           // res.status(200).json(storeData);
           // return;
        }
    
    }

}


    try {
        const facultyaddawards = new ft_awards({
            award_name, award_reason, date, shared_with, faculty_name, additional_info
        });

        const findAward = await ft_awards.findOne({ award_name:award_name, award_reason:award_reason, date:date, shared_with:shared_with, faculty_name:faculty_name, additional_info:additional_info })
        if (!findAward) {
            const storeData = await facultyaddawards.save();
            res.status(200).json(storeData);
            return;
        }
        else {
            res.status(400).json({ error: "Data already exist" });
            return;
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error });
        return;
    }

};

exports.editachievements = async (req, res) => {
    const { achievements, date, shared_with, status, faculty_name, student_name } = req.body;
    console.log(req.body)
    // if (!achievements || !date || !shared_with || !status || !faculty_name || !student_name) {
    //     res.status(400).json({ error: "Please Enter All Input Data" })
    // }
    try {
        const editachievements = new st_achievements({
            achievements, date, shared_with, status, faculty_name, student_name
        });
        const findAchievement = await st_achievements.findOne({ achievements: achievements, date: date, shared_with: shared_with })
        if (!findAchievement) {
            const storeData = await editachievements.save();
            res.status(200).json(storeData);
            return;
        }
        else {
            res.status(400).json({ error: "Data already exist" });
            return;
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error });
        return;
    }

};

exports.editforeign = async (req, res) => {
    const { start_date, end_date, country, visit_details, visit_link, status, faculty_name, student_name } = req.body;

    // if (!start_date || !end_date || !country || !visit_details || !visit_link || !status || !faculty_name || !student_name) {
    //     res.status(400).json({ error: "Please Enter All Input Data" })
    // }
    try {
        const editforeign = new st_for_visits({
            start_date, end_date, country, visit_details, visit_link, status, faculty_name, student_name
        });
        const findforeign = await st_for_visits.findOne({ start_date: start_date, end_date: end_date, country: country, visit_details: visit_details, visit_link: visit_link })
        if (!findforeign) {
            const storeData = await editforeign.save();
            res.status(200).json(storeData);
            return;
        }
        else {
            res.status(400).json({ error: "Data already exist" });
            return;
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error });
        return;
    }

};

exports.editseminar = async (req, res) => {
    const { title, type, date, venue, chief_guest, mode, collaborator, status, faculty_name, student_name } = req.body;
    console.log(req.body)
    // if (!title || !type || !date || !venue || !chief_guest || !mode || !collaborator || !status || !faculty_name || !student_name) {
    //     res.status(400).json({ error: "Please Enter All Input Data" })
    // }
    try {
        const editseminar = new st_seminar({
            title, type, date, venue, chief_guest, mode, collaborator, status, faculty_name, student_name
        });
        const findSeminar = await st_seminar.findOne({ title: title, type: type, date: date, venue: venue, chief_guest: chief_guest, mode: mode, collaborator: collaborator })
        if (!findSeminar) {
            const storeData = await editseminar.save();
            res.status(200).json(storeData);
            return;
        }
        else {
            res.status(400).json({ error: "Data already exist" });
            return;
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
        return;
    }

};

exports.editpublication = async (req, res) => {
    const { title,author,type,title_publish,patent_no,accepted_date,published_date,assignee,impact_factor,additional_info,link,status,faculty_name,student_name} = req.body;

    // if (!title || !author || !type || !title_publish || !patent_no || !accepted_date || !published_date || !assignee || !impact_factor || !additional_info || !link || !status || !faculty_name || !student_name) {
    //     res.status(400).json({ error: "Please Enter All Input Data" })
    // }
    try {            
            const editpublication = new st_publi({
                title,author,type,title_publish,patent_no,accepted_date,published_date,assignee,impact_factor,
                additional_info,link,status,faculty_name,student_name
            });
            const findAward = await st_publi.findOne({title:title,author:author,type:type,title_publish:title_publish,patent_no:patent_no,
                accepted_date:accepted_date,published_date:published_date,assignee:assignee,impact_factor:impact_factor,additional_info:additional_info,
                link:link,status:status,faculty_name:faculty_name,student_name:student_name})
            if(!findAward){
            const storeData = await editpublication.save();
            res.status(200).json(storeData);
            return;
        }
        else {
            res.status(400).json({ error: "Data already exist" })
            return;
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
        return;
    }

};

exports.editproject = async (req, res) => {
    const { title, start_date, dept, faculty_name, student_name, funding_agency, funds, ongoing, link, status } = req.body;

    // if (!title || !start_date || !dept || !faculty_name || !student_name || !funding_agency || !funds || !ongoing || !link || !status) {
    //     res.status(400).json({ error: "Please Enter All Input Data" })
    // }
    try {
        const editproject = new st_project({
            title, start_date, dept, faculty_name, student_name, funding_agency, funds, ongoing, link, status
        });
        const findAward = await st_project.findOne({ title: title, start_date: start_date, dept: dept, faculty_name: faculty_name, student_name: student_name, funding_agency: funding_agency, funds: funds, ongoing: ongoing, link: link, status: status })
        if (!findAward) {
            const storeData = await editproject.save();
            res.status(200).json(storeData);
            return;
        }
        else {
            res.status(400).json({ error: "Data already exist" });
            return;
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
        return;
    }

};



exports.facultyeditachievements = async (req, res) => {
    const { title, date, dept, faculty_name, additional_info, institute } = req.body;
    // if (!title || !date || !dept || !faculty_name || !institute) {
    //     res.status(400).json({ error: "Please Enter All Input Data" })
    //     return;
    // }
    try {
        const facultyeditachievements = new ft_achievements({
            title, date, dept, faculty_name, additional_info, institute
        });
        const findAward = await ft_achievements.findOne({ title: title, date: date, dept: dept, additional_info: additional_info, institute: institute })
        if (!findAward) {
            const storeData = await facultyeditachievements.save();
            res.status(200).json(storeData);
            return;
        }
        else {
            res.status(400).json({ error: "Data already exist" })
            return;
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
        return;
    }

};


exports.facultyeditseminars = async (req, res) => {
    const { title, speaker, date, venue, dept, designation, institute, additional_info, num_participant } = req.body;

    // if (!title || !speaker || !date || !venue || !dept || !designation || !institute || !num_participant) {
    //     res.status(400).json({ error: "Please Enter All Input Data" })
    // }
    try {
        const facultyeditseminars = new ft_seminars({
            title, speaker, date, venue, dept, designation, institute, additional_info, num_participant
        });
        const findAward = await ft_seminars.findOne({ title:title, speaker:speaker, date:date, venue:venue, dept:dept, designation:designation, institute:institute, additional_info:additional_info, num_participant:num_participant })
        if (!findAward) {
            const storeData = await facultyeditseminars.save();
            res.status(200).json(storeData);
            return;
        }
        else {
            res.status(400).json({ error: "Data already exist" })
            return;
        }

    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};

exports.facultyeditforeign = async (req, res) => {
    const { start_date, end_date, country, visit_details, faculty_name } = req.body;

    // if (!start_date || !end_date || !country || !visit_details || !faculty_name) {
    //     res.status(400).json({ error: "Please Enter All Input Data" })
    // }
    try {
        const facultyeditforeign = new ft_foreign({
            start_date, end_date, country, faculty_name, visit_details
        });
        const findAward = await ft_foreign.findOne({ start_date: start_date, end_date: end_date, country: country, faculty_name: faculty_name, visit_details: visit_details })
        if (!findAward) {
            const storeData = await facultyeditforeign.save();
            res.status(200).json(storeData);
            return;
        }
        else {
            res.status(400).json({ error: "Data already exist" })
            return;
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
};

exports.fty_award_csv = async (req, res) => {


    // try {
    //     //console.log(req);
    //     await ft_awards.insertMany(req.body);
    //     res.status(200).json({ message: 'Data successfully inserted' });
    // } catch ( error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'An error occurred while inserting data' });
    // }

    const data = req.body;

    for (const entry of data) {
        try {
            //console.log(entry);
            const existingEntry = await ft_awards.findOne(entry);
            //console.log(existingEntry);
            if (existingEntry === null) {
                await ft_awards.create(entry)
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};

exports.fty_project_csv = async (req, res) => {

    const data = req.body;

    for (const entry of data) {
        try {
            // console.log(entry);
            const existingEntry = await ft_projects.findOne(entry);
            //console.log(existingEntry);
            if (existingEntry === null) {
                await ft_projects.create(entry)
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};

exports.fty_achievement_csv = async (req, res) => {


    // try {
    //     //console.log(req);
    //     await ft_achievements.insertMany(req.body);
    //     res.status(200).json({ message: 'Data successfully inserted' });
    // } catch ( error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'An error occurred while inserting data' });
    // }

    const data = req.body;

    for (const entry of data) {
        try {
            // console.log(entry);
            const existingEntry = await ft_achievements.findOne(entry);
            //console.log(existingEntry);
            if (existingEntry === null) {
                await ft_achievements.create(entry)
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};

exports.fty_seminar_csv = async (req, res) => {


    // try {
    //     //console.log(req);
    //     await ft_seminars.insertMany(req.body);
    //     res.status(200).json({ message: 'Data successfully inserted' });
    // } catch ( error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'An error occurred while inserting data' });
    // }

    const data = req.body;

    for (const entry of data) {
        try {
            console.log(entry);
            const existingEntry = await ft_seminars.findOne(entry);
            //console.log(existingEntry);
            if (existingEntry === null) {
                await ft_seminars.create(entry)
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};
exports.fty_foreign_csv = async (req, res) => {


    // try {
    //     //console.log(req);
    //     await ft_foreign.insertMany(req.body);
    //     res.status(200).json({ message: 'Data successfully inserted' });
    // } catch ( error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'An error occurred while inserting data' });
    // }

    const data = req.body;

    for (const entry of data) {
        try {
            // console.log(entry);
            const existingEntry = await ft_foreign.findOne(entry);
            //console.log(existingEntry);
            if (existingEntry === null) {
                await ft_foreign.create(entry)
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};
exports.fty_publication_csv = async (req, res) => {


    // try {
    //     //console.log(req);
    //     await ft_publications.insertMany(req.body);
    //     res.status(200).json({ message: 'Data successfully inserted' });
    // } catch ( error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'An error occurred while inserting data' });
    // }

    const data = req.body;

    for (const entry of data) {
        try {
            // console.log(entry);
            const existingEntry = await ft_publications.findOne(entry);
            //console.log(existingEntry);
            if (existingEntry === null) {
                await ft_publications.create(entry)
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};

exports.facultyeditpublication = async (req, res) => {
    const { title,author,type,title_publish,patent_no,accepted_date,published_date,assignee,impact_factor,additional_info,link,faculty_name} = req.body;

    // if (!title || !author || !type || !title_publish || !patent_no || !accepted_date || !published_date || !assignee || !impact_factor || !additional_info || !faculty_name) {
    //     res.status(400).json({ error: "Please Enter All Input Data" })
    // }
    try {            
            const facultyeditpublication = new ft_publications({
                title,author,type,title_publish,patent_no,accepted_date,published_date,assignee,impact_factor,
                additional_info,link,faculty_name
            });
            const findAward = await ft_publications.findOne({title:title,author:author,type:type,title_publish:title_publish,patent_no:patent_no,
                accepted_date:accepted_date,published_date:published_date,assignee:assignee,impact_factor:impact_factor,additional_info:additional_info,
                link:link,faculty_name:faculty_name})
            if(!findAward){
            const storeData = await facultyeditpublication.save();
            res.status(200).json(storeData);
            return;
        }
        else {
            res.status(400).json({ error: "Data already exist" })
            return;
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};

exports.facultyeditproject = async (req, res) => {
    const { title, start_date, dept, faculty_name, funding_agency, funds, ongoing, link } = req.body;

 //   if (!title || !start_date || !dept || !faculty_name || !funding_agency || !funds || !ongoing || !link) {
   //     res.status(400).json({ error: "Please Enter All Input Data" })
    //}
    try {
        const facultyeditproject = new ft_projects({
            title, start_date, dept, faculty_name, funding_agency, funds, ongoing, link
        });
        
        const findProject= await ft_projects.findOne({  title:title, start_date:start_date, dept:dept, faculty_name:faculty_name, funding_agency:funding_agency, funds:funds, ongoing:ongoing, link:link })
        if (!findProject) {
            const storeData = await facultyeditproject.save();
            res.status(200).json(storeData);
            return;
        }
        else {
            res.status(400).json({ error: "Data already exist" })
            return;
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};


exports.send_mail = async (req, res) => {
    try {

        const { emailSubject, emailContent, sendToFaculty, sendToStudents } = req.body.data;
        //   console.log(emailSubject, emailContent, sendToFaculty, sendToStudents);

        let mes = '';

        // let recepient = sendToFaculty.toString();
        // console.log(recepient);

        if (!emailContent) {
            mes = "Please Enter Your Email Content";
        }

        if (!emailSubject) {
            mes = "Please Enter Your Email Subject";
        }

        if (!sendToFaculty && !sendToStudents) {
            mes = "Please Select at least one recepient";
        }

        if (mes) {
            res.status(400).json({ message: mes });
            console.log('1');
            return;
        }

        let allUsers = '';

        if (sendToFaculty && !sendToStudents) {
            allUsers = await users.find({ usertype: '2' }).select('email');
        }

        if (sendToStudents && !sendToFaculty) {
            allUsers = await users.find({ usertype: '1' }).select('email');
        }

        if (sendToFaculty && sendToStudents) {
            allUsers = await users.find({ usertype: { $in: ['1', '2'] } }).select('email');

        }

        
    // const allUsers = await users.find().select('email'); 
     //console.log(allUsers);
    allUsers.forEach(user => {
        const userEmail = user.email;
        const mailOptions = {
            from: `"Office Staff [Department Database]" <${process.env.EMAIL}>`,            
            to: userEmail,
            subject: emailSubject,
            text: emailContent
        }  
        
        tarnsporter.sendMail(mailOptions, (error,info) => {
            if (error) {
                console.log("error sending mail", error);
            } else {
                console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
            }
        })
      });
      
        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while sending email.' });
    }
};
