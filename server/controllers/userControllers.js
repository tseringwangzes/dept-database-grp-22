const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");
const st_schema = require("../models/st_schema");
const stdetails = require("../models/stdetails");
const st_achievements = require("../models/st_achievements");
const st_seminar = require("../models/st_seminars");
const st_for_visits = require("../models/st_foreign");
const st_publi = require("../models/st_publications");
const st_project = require("../models/st_projects");
const st_csv = require("../models/st_award_table");
const csv = require('csvtojson');
const ft_awards = require("../models/ft_awards");
const ft_achievements = require("../models/ft_achievements");
const ft_seminars = require("../models/ft_seminars");
const ft_foreign = require("../models/ft_foreign");
const ft_publications = require("../models/ft_publications");
const ft_projects = require("../models/ft_projects")

const tarnsporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }

})



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

            const existEmail = await userotp.findOne({ email: email });


            if (existEmail) {
                const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, {
                    otp: OTP
                }, { new: true }
                );
                await updateData.save();

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Email For Otp Validation",
                    text: `Your OTP is :- ${OTP}`
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

            } else {

                const saveOtpData = new userotp({
                    email, otp: OTP
                });

                await saveOtpData.save();
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Email For Otp Validation",
                    text: `OTP:- ${OTP}`
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
            }
        } else {
            res.status(400).json({ error: "This User Not Exist In our Db" })
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
                    from: process.env.EMAIL,
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
    const { email, otp,type } = req.body;

    if (!otp || !email) {
        res.status(400).json({ error: "Please Enter Your OTP and email" })
    }

    try {
        const otpverification = await userotp.findOne({ email: email });
        // console.log(typeverification[0].usertype)
        // console.log(type)
        if (otpverification.otp === otp) {
            var typeverification = await users.find({email:email,usertype:type});
            if(!typeverification[0]){
                res.status(400).json({ error: "Invalid User" })
            }
            else if(typeverification && typeverification[0].usertype === type){
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

exports.usergetall = async (req, res) => {
   const {email}=req.body;
    console.log(req.body)
    try {
        const allUser = await stdetails.find();
        console.log(allUser)
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.stachievem = async (req, res) => {
    try {
        const allUser = await st_achievements.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.stsemi = async (req, res) => {
    try {
        const allUser = await st_seminar.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.stforvisits = async (req, res) => {
    try {
        const allUser = await st_for_visits.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.stpubli = async (req, res) => {
    try {
        const allUser = await st_publi.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.stproj = async (req, res) => {
    try {
        const allUser = await st_project.find();
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
            const existingEntry = await stdetails.findOne(entry);
            //console.log(existingEntry);
            if ( existingEntry === null) {
                await stdetails.create(entry)
            } 
           
           
        }  catch ( error) {
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
            if ( existingEntry === null) {
                await st_achievements.create(entry)
            } 
           
           
        }  catch ( error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};

exports.st_project_csv = async (req, res) => {
    
     
    // try {
    //     //console.log(req);
    //     await st_project.insertMany(req.body);
    //     res.status(200).json({ message: 'Data successfully inserted' });
    // } catch ( error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'An error occurred while inserting data' });
    // }

    const data = req.body;

    for (const entry of data) {
        try {
           // console.log(entry);
            const existingEntry = await st_project.findOne(entry);
            //console.log(existingEntry);
            if ( existingEntry === null) {
                await st_project.create(entry)
            } 
           
           
        }  catch ( error) {
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
           // console.log(entry);
            const existingEntry = await st_seminar.findOne(entry);
            //console.log(existingEntry);
            if ( existingEntry === null) {
                await st_seminar.create(entry)
            } 
           
           
        }  catch ( error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};

exports.st_foreign_csv = async (req, res) => {
    
     
    // try {
    //     //console.log(req);
    //     await st_for_visits.insertMany(req.body);
    //     res.status(200).json({ message: 'Data successfully inserted' });
    // } catch ( error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'An error occurred while inserting data' });
    // }
    const data = req.body;

    for (const entry of data) {
        try {
           // console.log(entry);
            const existingEntry = await st_for_visits.findOne(entry);
            //console.log(existingEntry);
            if ( existingEntry === null) {
                await st_for_visits.create(entry)
            } 
           
           
        }  catch ( error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};

exports.st_publication_csv = async (req, res) => {
    
     
    // try {
    //     //console.log(req);
    //     await st_publi.insertMany(req.body);
    //     res.status(200).json({ message: 'Data successfully inserted' });
    // } catch ( error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'An error occurred while inserting data' });
    // }

    const data = req.body;

    for (const entry of data) {
        try {
           // console.log(entry);
            const existingEntry = await st_publi.findOne(entry);
            //console.log(existingEntry);
            if ( existingEntry === null) {
                await st_publi.create(entry)
            } 
           
           
        }  catch ( error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }

};


exports.useraddmore = async (req, res) => {
    const { award_name,award_reason,date,shared_with,status,faculty_name,student_name} = req.body;

    if (!award_name || !award_reason || !date || !shared_with || !status || !faculty_name || !student_name) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }

    try {
        //const presuer = await users.findOne({ email: email });

        // if (presuer) {
        //     res.status(400).json({ error: "This User Already exist in our db" })
        // } else {
            const useraddmore = new stdetails({
                award_name,award_reason,date,shared_with,status,faculty_name,student_name
            });

            const findAward = await stdetails.findOne({award_name:award_name,award_reason:award_reason,date:date,shared_with:shared_with})
            console.log(findAward);
            if(!findAward){
            const storeData = await useraddmore.save();
            res.status(200).json(storeData);
            }
            else{
                res.status(400).json({error:"Data already exist"})
            }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};

exports.st_award_csv = async (req, res) => {
    
    // const { award_name,award_reason,date,shared_with,status,faculty_name,student_name} = req.body;
    // try {
    //     await stdetails.insertMany(req.body);
    //     res.status(200).json({ message: 'Data successfully inserted' });
    // } catch ( error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'An error occurred while inserting data' });
    // }

    const data = req.body;

    for (const entry of data) {
        try {
           // console.log(entry);
            const existingEntry = await stdetails.findOne(entry);
            //console.log(existingEntry);
            if ( existingEntry === null) {
                await stdetails.create(entry)
            } 
           
           
        }  catch ( error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};

exports.facultygetawards = async(req,res)=>{
    // const {email} = req.body;
    try {
        const allUser=await ft_awards.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.facultygetachievements = async(req,res)=>{
    // const {email} = req.body;
    try {
        const allUser=await ft_achievements.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.facultygetseminars = async(req,res)=>{
    // const {email} = req.body;
    try {
        const allUser=await ft_seminars.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.facultygetforeign = async(req,res)=>{
    try {
        const allUser=await ft_foreign.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.facultygetpublications = async(req,res)=>{
    try {
        const allUser=await ft_publications.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.facultygetprojects = async(req,res)=>{
    try {
        const allUser=await ft_projects.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.facultyaddawards = async (req, res) => {
    const { award_name,award_reason,date,shared_with,faculty_name} = req.body;

    if (!award_name || !award_reason || !date || !shared_with || !faculty_name) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }
    try {            
            const facultyaddawards = new ft_awards({
                award_name,award_reason,date,shared_with,faculty_name
            });

            const storeData = await facultyaddawards.save();
            res.status(200).json(storeData);
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};

exports.editachievements = async (req, res) => {
    const { achievements,date,shared_with,status,faculty_name,student_name} = req.body;

    if (!achievements || !date || !shared_with || !status || !faculty_name || !student_name) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }
    try {            
            const editachievements = new st_achievements({
                achievements,date,shared_with,status,faculty_name,student_name
            });
            const findAchievement = await st_achievements.findOne({achievements:achievements,date:date,shared_with:shared_with})
            if(!findAchievement){
            const storeData = await editachievements.save();
            res.status(200).json(storeData);
            }
            else{
                res.status(400).json({error:"Data already exist"})
            }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};

exports.editforeign = async (req, res) => {
    const { topic,start_date,end_date,country,status,faculty_name,student_name} = req.body;

    if (!topic || !start_date || !end_date || !country || !status || !faculty_name|| !student_name) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }
    try {            
            const editforeign = new st_for_visits({
                topic,start_date,end_date,country,status,faculty_name,student_name
            });
            const findforeign = await st_for_visits.findOne({topic:topic,start_date:start_date,end_date:end_date,country:country})
            if(!findforeign){
            const storeData = await editforeign.save();
            res.status(200).json(storeData);
            }
            else{
                res.status(400).json({error:"Data already exist"})
            }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};

exports.editseminar = async (req, res) => {
    const { title, type, date, venue, chief_guest, mode, collaborator, status,faculty_name,student_name} = req.body;

    if (!title || !type || !date || !venue || !chief_guest || !mode || !collaborator || !status || !faculty_name || !student_name) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }
    try {            
            const editseminar = new st_seminar({
                title, type, date, venue, chief_guest, mode, collaborator, status,faculty_name,student_name
            });
            const findSeminar = await st_seminar.findOne({title:title, type:type, year:year, date:date, venue:venue, chief_guest:chief_guest, mode:mode, collaborator:collaborator})
            if(!findSeminar){
            const storeData = await editseminar.save();
            res.status(200).json(storeData);
            }
            else{
                res.status(400).json({error:"Data already exist"})
            }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};

exports.editpublication = async (req, res) => {
    const { topic, year, date, collaboration, no_of_students, status,faculty_name,student_name} = req.body;

    if (!topic || !year || !date || !collaboration || !no_of_students || !status || !faculty_name || !student_name) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }
    try {            
            const editpublication = new st_publi({
                topic, year, date, collaboration, no_of_students, status,faculty_name,student_name
            });
            const findAward = await st_publi.findOne({ topic:topic, year:year, date:date, collaboration:collaboration, no_of_students:no_of_students})
            if(!findAward){
            const storeData = await editpublication.save();
            res.status(200).json(storeData);
            }
            else{
                res.status(400).json({error:"Data already exist"})  
            }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};

exports.editproject = async (req, res) => {
    const {topic, year, date, collaboration, granted_money,description, status,faculty_name,student_name} = req.body;

    if (!topic || !year || !date || !collaboration || !granted_money || !description || !status || !faculty_name || !student_name) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }
    try {            
            const editproject = new st_project({
                topic, year, date, collaboration, granted_money,description, status,faculty_name,student_name
            });
            const findAward = await st_project.findOne({topic:topic, year:year, date:date, collaboration:collaboration, granted_money:granted_money,description:description})
            if(!findAward){
            const storeData = await editproject.save();
            res.status(200).json(storeData);
            }
            else{
                res.status(400).json({error:"Data already exist"})  
            }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};



exports.facultyeditachievements = async (req, res) => {
    const { Achievements,date,shared_with,faculty_name} = req.body;

    if (!Achievements || !date || !shared_with || !faculty_name) {
        res.status(400).json({ error: "Please Enter All Input Data" })
        return;
    }
    try {            
            const facultyeditachievements = new ft_achievements({
                Achievements,date,shared_with,faculty_name
            });
            const findAward = await ft_achievements.findOne({Achievements:Achievements,date:date,shared_with:shared_with})
            if(!findAward){
            const storeData = await facultyeditachievements.save();
            res.status(200).json(storeData);
            return;
            }
            else{
                res.status(400).json({error:"Data already exist"})  
                return;
            }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
        return;
    }

};

exports.facultyeditseminars = async (req, res) => {
    const { title,type,year,date,venue,chief_guest,mode,collaborator,faculty_name} = req.body;

    if (!title||!type || !year || !date || !venue || !chief_guest || !mode || !collaborator || !faculty_name) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }
    try {            
            const facultyeditseminars = new ft_seminars({
                title,type,year,date,venue,chief_guest,mode,collaborator,faculty_name
            });

            const storeData = await facultyeditseminars.save();
            res.status(200).json(storeData);
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};

exports.facultyeditforeign = async (req, res) => {
    const { topic,start_date,end_date,country,faculty_name} = req.body;

    if (!topic||!start_date || !end_date || !country || !faculty_name) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }
    try {            
            const facultyeditforeign = new ft_foreign({
                topic,start_date,end_date,country,faculty_name
            });

            const storeData = await facultyeditforeign.save();
            res.status(200).json(storeData);
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
           // console.log(entry);
            const existingEntry = await ft_awards.findOne(entry);
            //console.log(existingEntry);
            if ( existingEntry === null) {
                await ft_awards.create(entry)
            } 
           
           
        }  catch ( error) {
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
            if ( existingEntry === null) {
                await ft_projects.create(entry)
            } 
           
           
        }  catch ( error) {
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
            if ( existingEntry === null) {
                await ft_achievements.create(entry)
            } 
           
           
        }  catch ( error) {
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
           // console.log(entry);
            const existingEntry = await ft_seminars.findOne(entry);
            //console.log(existingEntry);
            if ( existingEntry === null) {
                await ft_seminars.create(entry)
            } 
           
           
        }  catch ( error) {
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
            if ( existingEntry === null) {
                await ft_foreign.create(entry)
            } 
           
           
        }  catch ( error) {
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
            if ( existingEntry === null) {
                await ft_publications.create(entry)
            } 
           
           
        }  catch ( error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking data' });
            return;
        }
    }
};

exports.facultyeditpublication = async (req, res) => {
    const { topic,year, date, collaboration,faculty_name} = req.body;

    if (!topic || !year || !date || !collaboration || !faculty_name) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }
    try {            
            const facultyeditpublication = new ft_publications({
                topic,year, date, collaboration,faculty_name
            });

            const storeData = await facultyeditpublication.save();
            res.status(200).json(storeData);
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};

exports.facultyeditproject = async (req, res) => {
    const { topic,year, date,granted_money,status,faculty_name} = req.body;

    if (!topic || !year || !date || !granted_money || !status || !faculty_name) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }
    try {            
            const facultyeditproject = new ft_projects({
                topic,year, date,granted_money,status,faculty_name
            });

            const storeData = await facultyeditproject.save();
            res.status(200).json(storeData);
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};


exports.send_mail = async (req, res) => {
    try {
       
        const { emailSubject, emailContent, sendToFaculty, sendToStudents } = req.body.data;
        console.log(emailSubject, emailContent, sendToFaculty, sendToStudents);
        
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
            allUsers = await users.find({usertype: '2'}).select('email');
        }

        if (sendToStudents && !sendToFaculty) {
            allUsers = await users.find({usertype: '1'}).select('email');
        }

        if ( sendToFaculty && sendToStudents) {
            allUsers = await users.find({usertype: {$in: ['1', '2']}}).select('email');

        }

        
    // const allUsers = await users.find().select('email'); 
     //console.log(allUsers);
    allUsers.forEach(user => {
        const userEmail = user.email;
        const mailOptions = {
            from: `"Office Staff" <${process.env.EMAIL}>`,            
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
