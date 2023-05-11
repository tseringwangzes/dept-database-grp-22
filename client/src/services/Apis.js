import { commonrequest } from "./ApiCall";
import {BACKEND_URL} from "./helper";


export const registerfunction = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/register`,data)
}

export const sentOtpFunction = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/sendotp`,data)
}

export const sentApprovalFunction = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/sendApproval`,data)
}

export const userVerify = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/login`,data)
}

export const usergetfunc = async()=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/details`,"");
}
export const userfunc = async(email)=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/getall?email=${email}`);
}
export const deptgetallinfo = async()=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/deptgetallinfo`,"");
}

export const editdeptinfo = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/editdeptinfo`,data)
}
export const getfaculty = async(email)=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/getfaculty?email=${email}`);
}
export const st_ach = async()=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/stachievem`,"");
}
export const st_semi = async()=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/stsemi`,"");
}

export const st_publi = async(email)=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/stpubli?email=${email}`);
}

export const stforvisits = async(email)=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/stforvisits?email=${email}`);
}
export const stproj = async(email)=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/stproj?email=${email}`);
}

export const st_award_csv = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/insert_csv`,data)
}

export const addmorefunction = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/adddata`,data)
}

export const ftDept = async () => {
    return await commonrequest("GET", `${BACKEND_URL}/staff/dept`)
}
export const ft_home = async (email) => {
    return await commonrequest("GET", `${BACKEND_URL}/user/faculty/home?email=${email}`);
  }
  export const deptprogram = async (email) => {
    return await commonrequest("GET", `${BACKEND_URL}/user/deptprogram?email=${email}`);
  }
  export const deptall = async () => {
    return await commonrequest("GET", `${BACKEND_URL}/user/deptall`);
  }


  export const ft_home_post = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/user/faculty/home_post`, data);
  }

  export const st_home = async (email) => {
    return await commonrequest("GET", `${BACKEND_URL}/user/student/home?email=${email}`);
  }

  export const st_home_post = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/user/student/home_post`, data);
  }

//   export const st_per_det = async (email) => {
//     return await commonrequest("GET", `${BACKEND_URL}/user/student/details?email=${email}`);
//   }
  

export const ft_awards = async(email)=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/faculty/awards?email=${email}`);
}

export const ft_achievements = async(email)=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/faculty/achievements?email=${email}`);
}

export const ft_seminars = async(email)=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/faculty/seminars?email=${email}`);
}

export const ft_foreign = async(email)=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/faculty/foreign?email=${email}`);
}

export const ft_publications = async(email)=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/faculty/publications?email=${email}`);
}

export const ft_projects = async(email)=>{
    return await commonrequest("GET",`${BACKEND_URL}/user/faculty/projects?email=${email}`);
}

export const FtyAddAwards = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/faculty/addawards`,data)
}

export const fty_award_csv = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/fty_award_csv`,data)
}

export const fty_seminar_csv = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/fty_seminar_csv`,data)
}
export const fty_foreign_csv = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/fty_foreign_csv`,data)
}
export const fty_publication_csv = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/fty_publication_csv`,data)
}
export const fty_achievement_csv = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/fty_achievement_csv`,data)
}
export const fty_project_csv = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/fty_project_csv`,data)
}

export const achievementEdit = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/editachievements`,data)
}

export const foreignEdit = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/editforeign`,data)
}

export const seminarEdit = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/editseminar`,data)
}

export const publicationEdit = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/editpublication`,data)
}

export const projectEdit = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/editproject`,data)
}

export const FtyEditAchievements = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/faculty/editachievements`,data)
}

export const FtyEditSeminars = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/faculty/editseminars`,data)
}

export const FtyEditForeign = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/faculty/editforeign`,data)
}

export const FtyEditPublications = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/faculty/editpublication`,data)
}

export const FtyEditProjects = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/faculty/editproject`,data)
}

export const send_reminder = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/st_reminder`,data)
}

export const stt_award_csv = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/st_award_csv`,data)
}
export const st_achievement_csv = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/st_achievement_csv`,data)
}
export const st_seminar_csv = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/st_seminar_csv`,data)
}
export const st_foreign_csv = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/st_foreign_csv`,data)
}
export const st_publication_csv = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/st_publication_csv`,data)
}
export const st_project_csv = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/st_project_csv`,data)
}