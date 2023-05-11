import { deptgetallinfo, ft_projects, ft_publications } from '../services/Apis'
import { st_home, ft_home } from '../services/Apis'
import React, { useEffect, useState } from "react";
import { ft_awards } from '../services/Apis';
import { userfunc } from '../services/Apis'
import { ft_achievements } from '../services/Apis';
import { ft_seminars, ft_foreign, stforvisits } from '../services/Apis';
// import FacDetails from './FacDetails';
import { ftDept } from '../services/Apis';


export const InfoToPrint = React.forwardRef(({ startDate, endDate }, ref) => {
  const Date1 = new Date(startDate);
  const Date2 = new Date(endDate);
  const email = "admin"


  const handleFArray = async (myArr) => {
    const modifiedArray = await Promise.all(
      myArr.map(async (item) => {
        if (item.faculty_name) {
          const facultyName = await getFName(item.faculty_name);
          return {
            ...item,
            faculty_name: facultyName
          };
        } else {
          return item;
        }
      })
    );

    return modifiedArray;
  };

  const handleSArray = async (myArr) => {
    const modifiedArray = await Promise.all(
      myArr.map(async (item) => {
        if (item.student_name) {
          const studentName = await getSName(item.student_name);
          return {
            ...item,
            student_name: studentName
          };
        } else {
          return item;
        }
      })
    );

    return modifiedArray;
  };


  const getFName = async (emailID) => {
    console.log('email=', emailID);

    // Check if emailID is a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailID)) {
      console.log('Invalid email address');
      return emailID;
    }

    const res = await ft_home(emailID);
    const myName = res.data[6];
    console.log('my name is ', myName);
    return myName;
  };

  const getSName = async (emailID) => {
    console.log('email=', emailID);

    // Check if emailID is a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailID)) {
      console.log('Invalid email address');
      return emailID;
    }
    console.log('email=', emailID)
    const res = await st_home(emailID);
    const myName = res.data[6];
    console.log('stu name ', myName);
    return myName;
  };

  const [data, setUserData] = useState([]);

  const getdeptinfo = async () => {

    const response = await deptgetallinfo();
    // window.location.reload();
    if (response.status === 200) {
      setUserData(response.data)
      console.log(data)
    } else {
      console.log("error for get user data")
    }
  };
  useEffect(() => {
    getdeptinfo();
    setTimeout(() => {
    }, 1200)
  }, []);
  const program = data.map((item) => item.programs_offered)
  const btech = data.map((item) => item.st_num_btech)
  const mtech = data.map((item) => item.st_num_mtech)
  const ms = data.map((item) => item.st_num_ms)
  const phd = data.map((item) => item.st_num_phd)
  const hod = data.map((item) => item.hod)
  const staff_postdoc = data.map((item) => item.staff_postdoc)
  const staff_tech = data.map((item) => item.staff_tech)
  const staff_admin = data.map((item) => item.staff_admin)
  const thrust = data.map((item) => item.thrust)
  const ug = data.map((item) => item.num_ug_lab)
  const pg = data.map((item) => item.num_pg_lab)
  const re = data.map((item) => item.num_research_lab)
  var ftycount
  var pubcount
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await ftDept();
        setDocuments(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);
  ftycount=documents.length;
  console.log(ftycount);
  const [data1, setUserData1] = useState([]);
  let sortedData1 = data;
  const userGet1 = async () => {
    const response = await ft_awards(email);
    if (response.status === 200) {
      const temp = response.data;
      const temp2 = await handleFArray(temp);
      setUserData1(temp2);
      sortedData1 = data.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      console.log("error for get user data");
    }
  };
  useEffect(() => {
    userGet1();
  }, []);

  const [data2, setUserData2] = useState([]);
  let sortedData2 = data;
  const userGet2 = async () => {
    const response = await userfunc(email);
    if (response.status === 200) {
      const temp = response.data;
      const temp2 = await handleSArray(temp);
      setUserData2(temp2);
      sortedData2 = data.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      console.log("error for get user data");
    }
  };
  useEffect(() => {
    userGet2();
  }, []);

  const [data4, setUserData4] = useState([]);
  const userGet4 = async () => {
    const response = await ft_achievements(email);
    if (response.status === 200) {
      const temp = response.data;
      const temp2 = await handleFArray(temp);
      setUserData4(temp2);
      //console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet4();
    setTimeout(() => {
    }, 1200)
  }, [])

  const [data3, setUserData3] = useState([]);
  const userGet3 = async () => {
    const response = await ft_seminars(email);
    if (response.status === 200) {
      setUserData3(response.data)
      //console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet3();
    setTimeout(() => {
    }, 1200)
  }, [])

  const [data5, setUserData5] = useState([]);
  const userGet5 = async () => {
    const response = await ft_foreign(email);
    if (response.status === 200) {
      const temp = response.data;
      const temp2 = await handleFArray(temp);
      setUserData5(temp2);
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet5();
    setTimeout(() => {
    }, 1200)
  }, [])

  const [data6, setUserData6] = useState([]);
  const userGet6 = async () => {
    const response = await stforvisits(email);
    if (response.status === 200) {
      const temp = response.data;
      const temp2 = await handleSArray(temp);
      setUserData6(temp2);
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet6();
    setTimeout(() => {
    }, 1200)
  }, [])

  const [data7, setUserData7] = useState([]);
  const userGet7 = async () => {
    const response = await ft_projects(email);
    if (response.status === 200) {
      const temp = response.data;
      const temp2 = await handleFArray(temp);
      setUserData7(temp2);
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet7();
    setTimeout(() => {
    }, 1200)
  }, [])

  const [data8, setUserData8] = useState([]);
  const userGet8 = async () => {
    const response = await ft_publications(email);
    if (response.status === 200) {
      const temp = response.data;
      const temp2 = await handleFArray(temp);
      setUserData8(temp2);
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet8();
    setTimeout(() => {
    }, 1200)
  }, [])
  const Filtered1 = data1.filter(item => new Date(item.date) >= Date1 && new Date(item.date) <= Date2)
  const Filtered2 = data2.filter(item => new Date(item.date) >= Date1 && new Date(item.date) <= Date2)
  const Filtered4 = data4.filter(item => new Date(item.date) >= Date1 && new Date(item.date) <= Date2)
  const Filtered3 = data3.filter(item => new Date(item.date) >= Date1 && new Date(item.date) <= Date2)
  const Filtered5 = data5.filter(item => new Date(item.start_date) >= Date1 && new Date(item.start_date) <= Date2)
  const Filtered6 = data6.filter(item => new Date(item.start_date) >= Date1 && new Date(item.start_date) <= Date2)
  const Filtered7 = data7.filter(item => new Date(item.start_date) >= Date1 && new Date(item.start_date) <= Date2)
  const Filtered8 = data8.filter(item => new Date(item.accepted_date) >= Date1 && new Date(item.accepted_date) <= Date2)
  pubcount = Filtered8.length;
  return (
    <div ref={ref} class="border border-black p-3">
      <br></br>
      <div className="text-center text-2xl font-bold">
        INDIAN INSTITUTE OF TECHNOLOGY, ROPAR
      </div>
      <div className="text-center text-xl font-semibold">
        Rupnagar,Punjab
      </div>
      <div className="text-center text-xl font-semibold">
        Tele:+91-1881-242123, email:office-cse-1@iitrpr.ac.in
      </div>
      <hr className="w-4/5 border-black mx-auto align-center" />
      <div className="bg-indigo-100 text-center text-l font-semibold">
        DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
      </div>
      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">Programs offered</div>
        <div class="col-md-8">: {program}</div>
      </div>
      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">No. of Students</div>
        <div class="col-md-8">: B.Tech. :{btech}</div>
      </div>

      <div class="row">
        <div class="col-md-4 font-bold"></div>
        <div class="col-md-8">: M.Tech. :{mtech}</div>
      </div>

      <div class="row">
        <div class="col-md-4 font-weight-bold"></div>
        <div class="col-md-8">: MS (R). :{ms}</div>
      </div>

      <div class="row">
        <div class="col-md-4 font-weight-bold"></div>
        <div class="col-md-8">: PhD. :{phd}</div>
      </div>

      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">Head of the Department</div>
        <div class="col-md-8">: {hod}</div>
      </div>
      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">Number of Faculty Members</div>
        <div class="col-md-8">: {ftycount}</div>
      </div>
      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">Number of Staff Members</div>
        <div class="col-md-8">: Postdoc Fellow:{staff_postdoc}</div>
      </div>
      <div class="row">
        <div class="col-md-4 font-bold"></div>
        <div class="col-md-8">: Technical Staff :{staff_tech}</div>
      </div>
      <div class="row">
        <div class="col-md-4 font-bold"></div>
        <div class="col-md-8">: Administrative Staff :{staff_admin}</div>
      </div>
      <div class="row">
        <div class="col-md-4 font-bold">Thrust Area:</div>
      </div>
      <div class="col-md-8">{thrust}</div>
      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">No. Of Publications</div>
        <div class="col-md-8">: {pubcount}</div>
      </div>
      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">FACULTY MEMBERS </div>
        <div class="col-md-8">(Attached photographs separately)</div>
      </div>
      <br></br>
      

      <div className='container'>
      <ul>
        {documents.map((document) => (
          <li key={document._id} className="my-4 card">
            <div className='row'>
            <div className="col-md-6 align-items-center justify-content-center">
            <img
                src={document.image}
                alt={document.fname}
                className="w-32 h-32 mt-4 mx-auto my-auto"
              />
              </div>
              <div className="col-md-6">
              <p className="text-blue-500">
                Weblink: <a href={document.webLink}>{document.webLink}</a>
              </p>
              <p className="text-gray-600">Email: {document.email_id}</p>
              <p className="text-gray-600">PhD: {document.phD}</p>
              <p className="text-gray-600">Research: {document.research}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

      {/* <div className="container">
        <div className="row">
          <div className="col-md-6 align-items-center justify-content-center">
            <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="Faculty Photograph" className="my-auto" />
          </div>
          <div className="col-md-6">
            <h2>Faculty Name</h2>
            <p>Email:</p>
            <p>Ph.D.:</p>
            <p>Research Interests:</p>
          </div>
        </div>
      </div> */}
      <br></br>
      <div class="font-bold">Ongoing Activities</div>
      <div>Teaching and Research in various aspects of Computer Science and Engineering.</div>
      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">No. Of Labs</div>
        <div class="col-md-8">: UG:{ug} </div>
      </div>

      <div class="row">
        <div class="col-md-4 font-bold"></div>
        <div class="col-md-8">: PG:{pg} </div>
      </div>

      <div class="row">
        <div class="col-md-4 font-bold"></div>
        <div class="col-md-8">: Research:{re} </div>
      </div>

      <br></br>
      <div className="bg-indigo-100 text-l font-semibold">
        AWARDS AND HONORS (faculty)
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th className="border border-black p-2">Sr. No.</th>
            <th className="border border-black p-2">Faculty Name</th>
            <th className="border border-black p-2">Award Details</th>
            <th className="border border-black p-2">Additional Information</th>
          </tr>
        </thead>
        <tbody>
          {Filtered1.map((item, index) => (
            <tr key={index}>
              <td className="border border-black p-2"> {index + 1}</td>
              <td className="border border-black p-2"> {item.faculty_name}</td>
              <td className="border border-black p-2">{item.award_name}</td>
              <td className="border border-black p-2">{item.additional_info}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br></br>
      <div className="bg-indigo-100 text-l font-semibold">
        AWARDS AND HONORS (students)
      </div>
      <br></br>
      {/* <div className="d-flex justify-content-center"> */}
      <table>
        <thead>
          <tr>
            <th className="border border-black p-2">Sr. No.</th>
            <th className="border border-black p-2">Student Name</th>
            <th className="border border-black p-2">Award Details</th>
            <th className="border border-black p-2">Additional Information</th>
          </tr>
        </thead>
        <tbody>
          {Filtered2.map((item, index) => (
            <tr key={index}>
              <td className="border border-black p-2">{index + 1}</td>
              <td className="border border-black p-2"> {item.student_name}</td>
              <td className="border border-black p-2">{item.award_name}</td>
              <td className="border border-black p-2">{item.additional_info}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br></br>
      <div className="bg-indigo-100 text-l font-semibold">
        INVITED LECTURES BY FACULTY
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th className="border border-black p-2">Sr. No.</th>
            <th className="border border-black p-2">Faculty Name</th>
            <th className="border border-black p-2">Lecture Title</th>
            <th className="border border-black p-2">Department</th>
            <th className="border border-black p-2">Institute</th>
            <th className="border border-black p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {Filtered4.map((item, index) => (
            <tr key={index}>
              <td className="border border-black p-2"> {index + 1}</td>
              <td className="border border-black p-2">{item.faculty_name}</td>
              <td className="border border-black p-2">{item.title}</td>
              <td className="border border-black p-2">{item.dept}</td>
              <td className="border border-black p-2">{item.institute}</td>
              <td className="border border-black p-2">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="bg-indigo-100 text-l font-semibold">
        LECTURES BY VISITING EXPERTS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th className="border border-black p-2">Sr. No.</th>
            <th className='border border-black p-2'>Name of the department</th>
            <th className="border border-black p-2">Name of visitor,designation and institute/organization</th>
            <th className="border border-black p-2">Purpose</th>
            <th className="border border-black p-2">Date</th>
            <th className="border border-black p-2">Additional Information</th>
          </tr>
        </thead>
        <tbody>
          {Filtered3.map((item, index) => (
            <tr key={index}>
              <td className="border border-black p-2"> {index + 1}</td>
              <td className="border border-black p-2">{item.dept}</td>
              <td className="border border-black p-2">{item.speaker},{item.designation},{item.institute}</td>
              <td className="border border-black p-2">{item.title}</td>
              <td className="border border-black p-2">{item.date}</td>
              <td className="border border-black p-2">{item.additional_info}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br></br>
      <div className="bg-indigo-100 text-l font-semibold">
        FOREIGN VISITS BY FACULTY
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th className="border border-black p-2">Sr. No.</th>
            <th className='border border-black p-2'>Name of the faculty member</th>
            <th className="border border-black p-2">Country</th>
            <th className="border border-black p-2">Detail of visit with date</th>
          </tr>
        </thead>
        <tbody>
          {Filtered5.map((item, index) => (
            <tr key={index}>
              <td className="border border-black p-2"> {index + 1}</td>
              <td className="border border-black p-2">{item.faculty_name}</td>
              <td className="border border-black p-2">{item.country}</td>
              <td className="border border-black p-2">{item.visit_details}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="bg-indigo-100 text-l font-semibold">
        FOREIGN VISITS BY STUDENTS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th className="border border-black p-2">Sr. No.</th>
            <th className='border border-black p-2'>Name of the Student</th>
            <th className="border border-black p-2">Country</th>
            <th className="border border-black p-2">Detail of visit with date</th>
          </tr>
        </thead>
        <tbody>
          {Filtered6.map((item, index) => (
            <tr key={index}>
              <td className="border border-black p-2"> {index + 1}</td>
              <td className="border border-black p-2">{item.student_name}</td>
              <td className="border border-black p-2">{item.country}</td>
              <td className="border border-black p-2">{item.visit_details},from {item.start_date} to {item.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="bg-indigo-100 text-l font-semibold">
        MAJOR RESEARCH PROJECTS (Ongoing/Completed)
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th className="border border-black p-2">Sr. No.</th>
            <th className='border border-black p-2'>Funding Agency</th>
            <th className="border border-black p-2">Name of Faculty Member</th>
            <th className="border border-black p-2">Department</th>
            <th className="border border-black p-2">Title of Project</th>
            <th className="border border-black p-2">Funds</th>
          </tr>
        </thead>
        <tbody>
          {Filtered7.map((item, index) => (
            <tr key={index}>
              <td className="border border-black p-2"> {index + 1}</td>
              <td className="border border-black p-2">{item.funding_agency}</td>
              <td className="border border-black p-2">{item.faculty_name}</td>
              <td className="border border-black p-2">{item.dept}</td>
              <td className="border border-black p-2">{item.title}</td>
              <td className="border border-black p-2">{item.funds}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="bg-indigo-100 text-l font-semibold">
        PUBLICATIONS/CONFERENCES/JOURNALS/BOOKS PUBLISHED/BOOKS EDITED IN IEEE FORMAT
      </div>
      <br></br>
      <div>
        <ul>
          {Filtered8.map((row, index) => (
            <li key={index}>{index+1}. {row.author}, {row.title},{row.type},{row.title_publish}, (patent no.={row.patent_no},impact factor={row.impact_factor},DOI number={row.assignee})
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
});