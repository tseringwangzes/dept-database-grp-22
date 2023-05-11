const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userControllers");
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const { userInfo } = require("os");
const stdetails = require("../models/stAwardDetails");
const ft_awards = require("../models/ft_awards");
const stachievements = require("../models/st_achievements");
const ft_achievements = require("../models/ft_achievements");
const ft_seminars = require("../models/ft_seminars");
const ft_foreign = require("../models/ft_foreign");
const ft_publications = require("../models/ft_publications");
const ft_projects = require("../models/ft_projects");
const st_foreign = require("../models/st_foreign");
const st_seminar = require("../models/st_seminars");
const st_publications = require("../models/st_publications");
const st_projects = require("../models/st_projects");
const dept_info = require("../models/Dept_info");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, 'public')));

var storage =multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/uploads')

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var upload=multer({storage:storage});

// Routes
router.get("/user/student/home", controllers.studentHome)
router.post("/user/student/home_post", controllers.homePost);
router.post("/user/faculty/home_post", controllers.ftHomePost)
router.get("/user/deptgetallinfo", controllers.deptgetall)

router.post("/user/register", controllers.userregister);
router.post("/user/getfaculty", controllers.getfaculty);
router.post("/user/sendotp", controllers.userOtpSend);
router.post("/user/sendApproval", controllers.userApprovalSend);
router.post("/user/login", controllers.userLogin);
router.get("/user/details", controllers.userget);
router.get("/user/getall", controllers.usergetall);
router.get("/user/stachievem", controllers.stachievem);
router.get("/user/stsemi", controllers.stsemi);
router.get("/user/stforvisits", controllers.stforvisits);
router.get("/user/stpubli", controllers.stpubli);
router.get("/user/stproj", controllers.stproj);
router.post("/user/st_award_csv", controllers.st_award_csv);
router.post("/user/st_achievement_csv", controllers.st_achievement_csv);
router.post("/user/st_seminar_csv", controllers.st_seminar_csv);
router.post("/user/st_foreign_csv", controllers.st_foreign_csv);
router.post("/user/st_publication_csv", controllers.st_publication_csv);
router.post("/user/st_project_csv", controllers.st_project_csv);


router.get("/user/faculty/home", controllers.facultyHome);
router.get("/user/faculty/awards",controllers.facultygetawards);
router.get("/user/faculty/achievements",controllers.facultygetachievements);
router.get("/user/faculty/seminars",controllers.facultygetseminars);
router.get("/user/faculty/foreign",controllers.facultygetforeign);
router.get("/user/faculty/publications",controllers.facultygetpublications);
router.get("/user/faculty/projects",controllers.facultygetprojects);
router.post("/user/fty_award_csv", controllers.fty_award_csv);
router.post("/user/fty_achievement_csv", controllers.fty_achievement_csv);
router.post("/user/fty_seminar_csv", controllers.fty_seminar_csv);
router.post("/user/fty_publication_csv", controllers.fty_publication_csv);
router.post("/user/fty_foreign_csv", controllers.fty_foreign_csv);
router.post("/user/fty_project_csv", controllers.fty_project_csv);

router.post("/user/insert_csv", controllers.insert_csv);
router.post("/user/adddata",controllers.useraddmore);
router.post("/user/editdeptinfo",controllers.editdeptinfo);

router.delete("/user/deleteid/:id",async (req,resp)=>{
    const result = await stdetails.deleteOne({_id:req.params.id});
    resp.send(result);
});

router.delete("/user/deleteolddeptinfo/:id",async (req,resp)=>{
    const result = await dept_info.deleteOne({_id:req.params.id});
    resp.send(result);
});

router.delete("/user/ftydeleteaward/:id",async (req,resp)=>{
    const result = await ft_awards.deleteOne({_id:req.params.id});
    resp.send(result);
});

router.delete("/user/achdeleteid/:id",async (req,resp)=>{
    const result = await stachievements.deleteOne({_id:req.params.id});
    resp.send(result);
});

router.post("/user/faculty/addawards",controllers.facultyaddawards);

router.post("/user/editachievements",controllers.editachievements);

router.post("/user/editforeign",controllers.editforeign);

router.delete("/user/foreigndeleteid/:id",async (req,resp)=>{
    const result = await st_foreign.deleteOne({_id:req.params.id});
    resp.send(result);
});

router.post("/user/editseminar",controllers.editseminar);

router.delete("/user/deleteseminarid/:id",async (req,resp)=>{
    const result = await st_seminar.deleteOne({_id:req.params.id});
    resp.send(result);
});

router.post("/user/editpublication",controllers.editpublication);

router.delete("/user/deletepublicationid/:id",async (req,resp)=>{
    const result = await st_publications.deleteOne({_id:req.params.id});
    resp.send(result);
});

router.post("/user/editproject",controllers.editproject);

router.delete("/user/deleteprojectid/:id",async (req,resp)=>{
    const result = await st_projects.deleteOne({_id:req.params.id});
    resp.send(result);
});


router.delete("/user/ftydeleteachievements/:id",async (req,resp)=>{
    const result = await ft_achievements.deleteOne({_id:req.params.id});
    resp.send(result);
});

router.post("/user/faculty/editachievements",controllers.facultyeditachievements);
router.get("/staff/dept", controllers.getFData);
router.delete("/user/ftydeleteseminar/:id",async (req,resp)=>{
    const result = await ft_seminars.deleteOne({_id:req.params.id});
    resp.send(result);
});

router.post("/user/faculty/editseminars",controllers.facultyeditseminars);

router.delete("/user/ftydeleteforeign/:id",async (req,resp)=>{
    const result = await ft_foreign.deleteOne({_id:req.params.id});
    resp.send(result);
});

router.post("/user/faculty/editforeign",controllers.facultyeditforeign);

router.delete("/user/ftydeletepublication/:id",async (req,resp)=>{
    const result = await ft_publications.deleteOne({_id:req.params.id});
    resp.send(result);
});

router.post("/user/faculty/editpublication",controllers.facultyeditpublication);

router.delete("/user/ftydeleteproject/:id",async (req,resp)=>{
    const result = await ft_projects.deleteOne({_id:req.params.id});
    resp.send(result);
});

router.post("/user/faculty/editproject",controllers.facultyeditproject);

router.post("/user/st_reminder", controllers.send_mail);

router.put("/user/faculty/Approve/:id",async(req,resp)=>{
    let result=await stdetails.updateOne(
        { _id: req.params.id },
        {
            $set : req.body
        }
    )
    resp.send(result)
});

router.put("/user/faculty/ApproveAch/:id",async(req,resp)=>{
    let result=await stachievements.updateOne(
        { _id: req.params.id },
        {
            $set : req.body
        }
    )
    resp.send(result)
});

router.put("/user/faculty/ApprovePub/:id",async(req,resp)=>{
    let result=await st_publications.updateOne(
        { _id: req.params.id },
        {
            $set : req.body
        }
    )
    resp.send(result)
});

router.put("/user/faculty/ApproveFor/:id",async(req,resp)=>{
    let result=await st_foreign.updateOne(
        { _id: req.params.id },
        {
            $set : req.body
        }
    )
    resp.send(result)
});
router.put("/user/faculty/ApproveSemi/:id",async(req,resp)=>{
    let result=await st_seminar.updateOne(
        { _id: req.params.id },
        {
            $set : req.body
        }
    )
    resp.send(result)
});

router.put("/user/faculty/ApprovePro/:id",async(req,resp)=>{
    let result=await st_projects.updateOne(
        { _id: req.params.id },
        {
            $set : req.body
        }
    )
    resp.send(result)
});
module.exports = router;