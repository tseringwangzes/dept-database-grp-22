import { userfunc } from '../services/Apis'
import React, { useEffect, useState } from "react";
import { st_ach,st_publi,st_semi,stproj,stforvisits,ft_awards,ft_achievements,ft_foreign,ft_publications,ft_seminars,st_home,ft_home } from '../services/Apis'
import { useAsyncError } from 'react-router-dom';


export const ComponentToPrint = React.forwardRef(({startDate,EndDate}, ref) => {
  const Date1 = new Date(startDate);
  const Date2 = new Date(EndDate);

  const [data, setUserData] = useState([]);
  var handleModifyArray = (myArr) => {
    const modifiedArray = myArr.map((item) => {
      return {
        ...item, 
        faculty_name:  getFName(item.faculty_name),
        student_name:  getSName(item.student_name)
      };
    })

    return modifiedArray
  }

  var handleFArray = (myArr) => {
    const fArray = myArr.map((item) => {
      return {
        ...item, 
        faculty_name: getFName(item.faculty_name),
        //student_name: getSName(item.student_name)
      };
    })

    return fArray
  }
  const userGet = async () => {
    const email = "admin"
    const response = await userfunc(email);
    // window.location.reload();
    if (response.status === 200) {
      const filteredData = response.data
      // .filter(item=>item.date>={startDate} && item.date<={EndDate});
      setUserData(handleModifyArray(filteredData))
      //console.log(filteredData)
      //data.student_name = await getSName(data.student_name)
      //data.faculty_name = await getFName(data.faculty_name)

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
      setUserData2(handleModifyArray(response.data))
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
      setUserData3(handleModifyArray(response.data))
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
      setUserData4(handleModifyArray(response.data))
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
      setUserData5(handleModifyArray(response.data))
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
      setUserData6(handleModifyArray(response.data))
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
      setUserData7(handleModifyArray(response.data))
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
      setUserData8(handleFArray(response.data))
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
        setUserData9(handleFArray(response.data))
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

  
  const [data11, setUserData11] = useState([]);
  const userGet11 = async () => {
    const response = await ft_publications();
    if (response.status === 200) {
      setUserData11(handleFArray(response.data))
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
      setUserData12(handleFArray(response.data))
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

  const [myName,setMyName] = useState([]);

  var getSName = async (emailID) => {
    
    const data = {
      email: emailID
    }

    const res = await st_home(data);
    setMyName(res.data)
    return myName[6];

  }

  var getFName = async (emailID) => {
    
    const data = {
      email: emailID
    }

    const res = await ft_home(data);
    setMyName(res.data)
    return myName[6];

  }

  const Filtered = data.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  const Filtered2 = data2.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  const Filtered3 = data3.filter(item=>new Date(item.published_date) >= Date1 && new Date(item.published_date)<=Date2)
  const Filtered4 = data4.filter(item=>new Date(item.start_date) >= Date1 && new Date(item.start_date)<=Date2)
  const Filtered5 = data5.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  const Filtered6 = data6.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  const Filtered7 = data7.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  const Filtered8 = data8.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  const Filtered9 = data9.filter(item=>new Date(item.start_date) >= Date1 && new Date(item.start_date)<=Date2)
  // const Filtered10 = data10.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  const Filtered11 = data11.filter(item=>new Date(item.published_date) >= Date1 && new Date(item.published_date)<=Date2)
  const Filtered12 = data12.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)


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
          {Filtered.map((item) => (
           
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
          {Filtered2.map((item) => (
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
          {Filtered3.map((item) => (
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
          {Filtered4.map((item) => (
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
          {Filtered6.map((item) => (
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
          {Filtered5.map((item) => (
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
          {Filtered7.map((item) => (
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
          {Filtered8.map((item) => (
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
          {Filtered9.map((item) => (
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
          {/* {Filtered10.map((item) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.topic}</td>
              <td class="border border-black p-2">{item.date}</td>
              <td class="border border-black p-2">{item.granted_money}</td>
              <td class="border border-black p-2">{item.status}</td>
            </tr>
          ))} */}
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
          {Filtered11.map((item) => (
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
          {Filtered12.map((item) => (
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