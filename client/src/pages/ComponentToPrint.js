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

export const ComponentToPrint = React.forwardRef(({startDate,endDate}, ref) => {
  console.log(`Chosen start date: ${startDate}\nChosen end date: ${endDate}`);
  const Date1 = new Date(startDate);
  const Date2 = new Date(endDate);
  const email = "admin"


  const [data, setUserData] = useState([]);
  // let sortedData = data;
  const userGet = async () => {
    const response = await ft_awards(email);
    if (response.status === 200) {
      setUserData(response.data)
      console.log(response.data)
      // sortedData = data.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
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
  // let sortedData2 = data;
  const userGet2 = async () => {
    const response = await userfunc(email);
    if (response.status === 200) {
      setUserData2(response.data)
      // sortedData2 = data.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
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
    const response = await ft_seminars(email);
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
    const response = await ft_achievements(email);
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


  // const [data5, setUserData5] = useState([]);
  // const userGet5 = async () => {
  //   const response = await st_semi();
  //   if (response.status === 200) {
  //     setUserData5(response.data)
  //     console.log(response.data)
  //   } else {
  //     console.log("error for get user data")
  //   }
  // }
  // useEffect(() => {
  //   userGet5();
  //   setTimeout(() => {
  //   }, 1200)
  // }, [])

  // const [data6, setUserData6] = useState([]);
  // const userGet6 = async () => {
  //   const response = await stproj();
  //   if (response.status === 200) {
  //     setUserData6(response.data)
  //     console.log(response.data)
  //   } else {
  //     console.log("error for get user data")
  //   }
  // }
  // useEffect(() => {
  //   userGet6();
  //   setTimeout(() => {
  //   }, 1200)
  // }, [])

  // const [data7, setUserData7] = useState([]);
  // const userGet7 = async () => {
  //   const response = await ft_awards(data);
  //   if (response.status === 200) {
  //     setUserData7(response.data)
  //     console.log(response.data)
  //   } else {
  //     console.log("error for get user data")
  //   }
  // }
  // useEffect(() => {
  //   userGet7();
  //   setTimeout(() => {
  //   }, 1200)
  // }, [])

  // const [data8, setUserData8] = useState([]);
  // const userGet8 = async () => {
  //   const response = await ft_achievements(data);
  //   if (response.status === 200) {
  //     setUserData8(response.data)
  //     console.log(response.data)
  //   } else {
  //     console.log("error for get user data")
  //   }
  // }
  // useEffect(() => {
  //   userGet8();
  //   setTimeout(() => {
  //   }, 1200)
  // }, [])

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

  // const [data10, setUserData10] = useState([]);
  // const userGet10 = async () => {
  //   const response = await ft_projects();
  //   if (response.status === 200) {
  //     setUserData10(response.data)
  //     console.log(response.data)
  //   } else {
  //     console.log("error for get user data")
  //   }
  // }
  // useEffect(() => {
  //   userGet10();
  //   setTimeout(() => {
  //   }, 1200)
  // }, [])

  // const [data11, setUserData11] = useState([]);
  // const userGet11 = async () => {
  //   const response = await ft_publications();
  //   if (response.status === 200) {
  //     setUserData11(response.data)
  //     console.log(response.data)
  //   } else {
  //     console.log("error for get user data")
  //   }
  // }
  // useEffect(() => {
  //   userGet11();
  //   setTimeout(() => {
  //   }, 1200)
  // }, [])

  // const [data12, setUserData12] = useState([]);
  // const userGet12 = async () => {
  //   const response = await ft_seminars(data);
  //   if (response.status === 200) {
  //     setUserData12(response.data)
  //     console.log(response.data)
  //   } else {
  //     console.log("error for get user data")
  //   }
  // }
  // useEffect(() => {
  //   userGet12();
  //   setTimeout(() => {
  //   }, 1200)
  // }, [])

  const Filtered = data.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  const Filtered2 = data2.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  const Filtered3 = data3.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  const Filtered4 = data4.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  // const Filtered5 = data5.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  // const Filtered6 = data6.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  // const Filtered7 = data7.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  // const Filtered8 = data8.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
   const Filtered9 = data9.filter(item=>new Date(item.start_date) >= Date1 && new Date(item.start_date)<=Date2)
  // const Filtered10 = data10.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  // const Filtered11 = data11.filter(item=>new Date(item.published_date) >= Date1 && new Date(item.published_date)<=Date2)
  // const Filtered12 = data12.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)


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
        BOG Meeting Data of CSE Department
      </div>
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
        Faculty Awards and Honors
      </div>
      <br></br>
      {/* <TableStudentAwards data={data} columns={columns}/> */}
      {/* <div class="d-flex justify-content-center"> */}
      <table>
        <thead>
          <tr>
          <th class="border border-black p-2">Sr. No.</th>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Award Details</th>
            <th class="border border-black p-2">Additional Information</th>
          </tr>
        </thead>
        <tbody>
          {Filtered.map((item,index) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {index+1}</td>
              <td class="border border-black p-2"> {item.faculty_name}</td>
              <td class="border border-black p-2">{item.award_name}</td>
              <td class="border border-black p-2">{item.additional_info}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* </div> */}
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
      Students Awards and Honors
      </div>
      <br></br>
      {/* <div class="d-flex justify-content-center"> */}
      <table>
        <thead>
          <tr>
          <th class="border border-black p-2">Sr. No.</th>
            <th class="border border-black p-2">Student Name</th>
            <th class="border border-black p-2">Award Details</th>
            <th class="border border-black p-2">Additional Information</th>
          </tr>
        </thead>
        <tbody>
          {Filtered2.map((item,index) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2">{index+1}</td>
              <td class="border border-black p-2"> {item.student_name}</td>
              <td class="border border-black p-2">{item.award_name}</td>
              <td class="border border-black p-2">{item.additional_info}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* </div> */}
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
        Workshops/Seminars/Conferences Organized by Department
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
          <th class="border border-black p-2">Sr. No.</th>
            <th class="border border-black p-2">Name of Speaker/Chief Guest</th>
            <th class="border border-black p-2">Title/ abstract of Workshop/conference/seminar</th>
            <th class="border border-black p-2">Date</th>
            <th class="border border-black p-2">Venue</th>
            <th class="border border-black p-2">Number of Participants</th>
            <th class="border border-black p-2">Additional Information</th>
          </tr>
        </thead>
        <tbody>
          {Filtered3.map((item,index) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {index+1}</td>
              <td class="border border-black p-2">{item.speaker}</td>
              <td class="border border-black p-2">{item.title}</td>
              <td class="border border-black p-2">{item.date}</td>
              <td class="border border-black p-2">{item.venue}</td>
              <td class="border border-black p-2">{item.num_participant}</td>
              <td class="border border-black p-2">{item.additional_info}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
      Faculty participation as invited speaker/ session chair
      </div>
      <br></br>
      <table>
        <thead>
          <tr>

          <th class="border border-black p-2">Sr. No.</th>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Lecture Title</th>
            <th class="border border-black p-2">Department</th>
            <th class="border border-black p-2">Institute</th>
            <th class="border border-black p-2">Date</th>

          </tr>
        </thead>
        <tbody>
          {Filtered4.map((item,index) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {index+1}</td>
              <td class="border border-black p-2">{item.faculty_name}</td>
              <td class="border border-black p-2">{item.title}</td>
              <td class="border border-black p-2">{item.dept}</td>
              <td class="border border-black p-2">{item.institute}</td>     
              <td class="border border-black p-2">{item.date}</td>         
            </tr>
          ))}
        </tbody>
      </table>  
      <br></br>   
      <h6>This Data is from - {startDate} to {endDate}</h6> 
    </div>
  );
});