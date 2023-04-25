import { userfunc } from '../services/Apis'
import React, { useEffect, useState } from "react";
import { st_ach } from '../services/Apis'
import { st_publi } from '../services/Apis'
import { st_semi } from '../services/Apis'
import { stproj } from '../services/Apis'
import { stforvisits } from '../services/Apis'
import { ft_awards } from '../services/Apis';
import { ft_achievements } from '../services/Apis';
import { ft_foreign } from '../services/Apis';
import { ft_projects } from '../services/Apis';
import { ft_publications } from '../services/Apis';
import { ft_seminars } from '../services/Apis';

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const [data, setUserData] = useState([]);
  const userGet = async () => {
    const response = await userfunc(data);
    // window.location.reload();
    if (response.status === 200) {
      setUserData(response.data)
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet();
    setTimeout(() => {
    }, 1200)
  }, [])

  const [data2, setUserData2] = useState([]);
  const userGet2 = async () => {
    const response = await st_ach();
    if (response.status === 200) {
      setUserData2(response.data)
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet2();
    setTimeout(() => {
    }, 1200)
  }, [])

  const [data3, setUserData3] = useState([]);
  const userGet3 = async () => {
    const response = await st_publi();
    if (response.status === 200) {
      setUserData3(response.data)
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet3();
    setTimeout(() => {
    }, 1200)
  }, [])


  const [data4, setUserData4] = useState([]);
  const userGet4 = async () => {
    const response = await stforvisits();
    if (response.status === 200) {
      setUserData4(response.data)
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet4();
    setTimeout(() => {
    }, 1200)
  }, [])


  const [data5, setUserData5] = useState([]);
  const userGet5 = async () => {
    const response = await st_semi();
    if (response.status === 200) {
      setUserData5(response.data)
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
    const response = await stproj();
    if (response.status === 200) {
      setUserData6(response.data)
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
    const response = await ft_awards(data);
    if (response.status === 200) {
      setUserData7(response.data)
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
    const response = await ft_achievements(data);
    if (response.status === 200) {
      setUserData8(response.data)
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

  const [data9, setUserData9] = useState([]);
  const userGet9 = async () => {
      const response = await ft_foreign();
      if (response.status === 200) {
          setUserData9(response.data)
          console.log(response.data)
      } else {
          console.log("error for get user data")
      }
  }
  useEffect(() => {
      userGet9();
      setTimeout(() => {
      }, 1200)
  }, [])

  const [data10, setUserData10] = useState([]);
  const userGet10 = async () => {
    const response = await ft_projects();
    if (response.status === 200) {
      setUserData10(response.data)
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet10();
    setTimeout(() => {
    }, 1200)
  }, [])

  const [data11, setUserData11] = useState([]);
  const userGet11 = async () => {
    const response = await ft_publications();
    if (response.status === 200) {
      setUserData11(response.data)
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet11();
    setTimeout(() => {
    }, 1200)
  }, [])

  const [data12, setUserData12] = useState([]);
  const userGet12 = async () => {
    const response = await ft_seminars(data);
    if (response.status === 200) {
      setUserData12(response.data)
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet12();
    setTimeout(() => {
    }, 1200)
  }, [])


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
        Tele:+91-1881-235101, email:cs@iitrpr.ac.in
      </div>
      <hr className="w-4/5 border-black mx-auto align-center" />
      <div className="bg-indigo-100 text-center text-l font-semibold">
        BOG Meeting Data of CSE Department
      </div>
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
        STUDENTS AWARDS
      </div>
      <br></br>
      {/* <TableStudentAwards data={data} columns={columns}/> */}
      <table>
        <thead>
          <tr>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Student Name</th>
            <th class="border border-black p-2">Award Name</th>
            <th class="border border-black p-2">Award Reason</th>
            <th class="border border-black p-2">Date</th>
            <th class="border border-black p-2">Shared With</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.student_name}</td>
              <td class="border border-black p-2">{item.award_name}</td>
              <td class="border border-black p-2">{item.award_reason}</td>
              <td class="border border-black p-2">{item.date}</td>
              <td class="border border-black p-2">{item.shared_with}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
        STUDENTS ACHIEVEMENTS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Student Name</th>
            <th class="border border-black p-2">Achievement Name</th>
            <th class="border border-black p-2">Date</th>
            <th class="border border-black p-2">Shared With</th>
          </tr>
        </thead>
        <tbody>
          {data2.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.student_name}</td>
              <td class="border border-black p-2">{item.achievements}</td>
              <td class="border border-black p-2">{item.date}</td>
              <td class="border border-black p-2">{item.shared_with}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
        STUDENT PUBLICATIONS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Student Name</th>
            <th class="border border-black p-2">Publication Topic</th>
            <th class="border border-black p-2">Publish Date</th>
            <th class="border border-black p-2">Accept Date</th>
            <th class="border border-black p-2">Collaboration With</th>
            <th class="border border-black p-2">No. of Students</th>
            <th class="border border-black p-2">Publication Status</th>

          </tr>
        </thead>
        <tbody>
          {data3.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.student_name}</td>
              <td class="border border-black p-2">{item.topic}</td>
              <td class="border border-black p-2">{item.published_date}</td>
              <td class="border border-black p-2">{item.accepted_date}</td>
              <td class="border border-black p-2">{item.collaboration}</td>
              <td class="border border-black p-2">{item.no_of_students}</td>
              <td class="border border-black p-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
        STUDENTS FOREIGN VISITS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Student Name</th>
            <th class="border border-black p-2">Topic of Meet</th>
            <th class="border border-black p-2">Start Date</th>
            <th class="border border-black p-2">End Date</th>
            <th class="border border-black p-2">Country</th>
            <th class="border border-black p-2">Faculty Accompanied</th>
          </tr>
        </thead>
        <tbody>
          {data4.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.student_name}</td>
              <td class="border border-black p-2">{item.topic}</td>
              <td class="border border-black p-2">{item.start_date}</td>
              <td class="border border-black p-2">{item.end_date}</td>
              <td class="border border-black p-2">{item.country}</td>
              <td class="border border-black p-2">{item.faculty_name}</td>                  
            </tr>
          ))}
        </tbody>
      </table>  
      <br></br>    
      <div className="bg-indigo-100 text-center text-l font-semibold">
        STUDENTS PROJECT GRANTS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Student Name</th>
            <th class="border border-black p-2">Project Topic</th>
            <th class="border border-black p-2">Project Start Date</th>
            <th class="border border-black p-2">Granted Money</th>
            <th class="border border-black p-2">Project Description</th>
            <th class="border border-black p-2">Project Collaborators</th>            
          </tr>
        </thead>
        <tbody>
          {data6.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.student_name}</td>
              <td class="border border-black p-2">{item.topic}</td>
              <td class="border border-black p-2">{item.date}</td>
              <td class="border border-black p-2">{item.granted_money}</td>
              <td class="border border-black p-2">{item.description}</td>
              <td class="border border-black p-2">{item.collaboration}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
        STUDENTS WORKSHOPS/SEMINARS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Student Name</th>
            <th class="border border-black p-2">Workshop/Seminar Type</th>
            <th class="border border-black p-2">Title</th>
            <th class="border border-black p-2">Date</th>
            <th class="border border-black p-2">Venue</th>
            <th class="border border-black p-2">Chief Guest</th>
            <th class="border border-black p-2">Mode</th>
            <th class="border border-black p-2">Collaborators</th>            
          </tr>
        </thead>
        <tbody>
          {data5.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.student_name}</td>
              <td class="border border-black p-2">{item.type}</td>
              <td class="border border-black p-2">{item.title}</td>
              <td class="border border-black p-2">{item.date}</td>
              <td class="border border-black p-2">{item.venue}</td>
              <td class="border border-black p-2">{item.chief_guest}</td>
              <td class="border border-black p-2">{item.mode}</td>
              <td class="border border-black p-2">{item.collaborator}</td>                                          
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
       FACULTY AWARDS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
          <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Award Name</th>
            <th class="border border-black p-2">Award Reason</th>
            <th class="border border-black p-2">Date</th>
            <th class="border border-black p-2">Shared With</th>      
          </tr>
        </thead>
        <tbody>
          {data7.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.award_name}</td>
              <td class="border border-black p-2">{item.award_reason}</td>
              <td class="border border-black p-2">{item.date}</td>
              <td class="border border-black p-2">{item.shared_with}</td>                                       
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
       FACULTY ACHIEVEMENTS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
          <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Achievement Name</th>
            <th class="border border-black p-2">Date</th>
            <th class="border border-black p-2">Shared With</th>
          </tr>
        </thead>
        <tbody>
          {data8.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.Achievements}</td>
              <td class="border border-black p-2">{item.date}</td>
              <td class="border border-black p-2">{item.shared_with}</td>                                       
            </tr>
          ))}
        </tbody>
      </table>

      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
      FACULTY FOREIGN VISITS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Topic of Meet</th>
            <th class="border border-black p-2">Start Date</th>
            <th class="border border-black p-2">End Date</th>
            <th class="border border-black p-2">Country</th>
          </tr>
        </thead>
        <tbody>
          {data9.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.topic}</td>
              <td class="border border-black p-2">{item.start_date}</td>
              <td class="border border-black p-2">{item.end_date}</td>
              <td class="border border-black p-2">{item.country}</td>                
            </tr>
          ))}
        </tbody>
      </table>  

      <div className="bg-indigo-100 text-center text-l font-semibold">
      FACULTY PROJECT GRANTS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Project Topic</th>
            <th class="border border-black p-2">Project Start Date</th>
            <th class="border border-black p-2">Granted Money</th>
            <th class="border border-black p-2">Project Description</th>        
          </tr>
        </thead>
        <tbody>
          {data10.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.topic}</td>
              <td class="border border-black p-2">{item.date}</td>
              <td class="border border-black p-2">{item.granted_money}</td>
              <td class="border border-black p-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
        FACULTY PUBLICATIONS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Publication Topic</th>
            <th class="border border-black p-2">Publish Date</th>
            <th class="border border-black p-2">Accept Date</th>
            <th class="border border-black p-2">Collaboration With</th>
            {/* <th class="border border-black p-2">Publication Status</th> */}

          </tr>
        </thead>
        <tbody>
          {data11.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.topic}</td>
              <td class="border border-black p-2">{item.published_date}</td>
              <td class="border border-black p-2">{item.accepted_date}</td>
              <td class="border border-black p-2">{item.collaboration}</td>
              {/* <td class="border border-black p-2">{item.no_of_students}</td> */}
              {/* <td class="border border-black p-2">{item.status}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
      FACULTY FOREIGN VISITS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Student Name</th>
            <th class="border border-black p-2">Topic of Meet</th>
            <th class="border border-black p-2">Start Date</th>
            <th class="border border-black p-2">End Date</th>
            <th class="border border-black p-2">Country</th>
            <th class="border border-black p-2">Faculty Accompanied</th>
          </tr>
        </thead>
        <tbody>
          {data4.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.student_name}</td>
              <td class="border border-black p-2">{item.topic}</td>
              <td class="border border-black p-2">{item.start_date}</td>
              <td class="border border-black p-2">{item.end_date}</td>
              <td class="border border-black p-2">{item.country}</td>
              <td class="border border-black p-2">{item.faculty_name}</td>                  
            </tr>
          ))}
        </tbody>
      </table>  
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
        FACULTY WORKSHOPS/SEMINARS
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Workshop/Seminar Type</th>
            <th class="border border-black p-2">Title</th>
            <th class="border border-black p-2">Date</th>
            <th class="border border-black p-2">Venue</th>
            <th class="border border-black p-2">Chief Guest</th>
            <th class="border border-black p-2">Mode</th>
            <th class="border border-black p-2">Collaborators</th>            
          </tr>
        </thead>
        <tbody>
          {data12.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.type}</td>
              <td class="border border-black p-2">{item.title}</td>
              <td class="border border-black p-2">{item.date}</td>
              <td class="border border-black p-2">{item.venue}</td>
              <td class="border border-black p-2">{item.chief_guest}</td>
              <td class="border border-black p-2">{item.mode}</td>
              <td class="border border-black p-2">{item.collaborator}</td>                                          
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});