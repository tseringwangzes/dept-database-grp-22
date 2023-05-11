import { userfunc } from '../services/Apis'
import React, { useEffect, useState } from "react";
import { ft_awards } from '../services/Apis';
import { ft_achievements } from '../services/Apis';
import { ft_foreign } from '../services/Apis';
import { ft_projects } from '../services/Apis';
import { ft_publications } from '../services/Apis';
import { ft_seminars } from '../services/Apis';

export const ComponentToPrint = React.forwardRef(({startDate,endDate,Ftyemail}, ref) => {
    console.log(`Chosen start date: ${startDate}\nChosen end date: ${endDate}`);
    

  const Date1 = new Date(startDate);
  const Date2 = new Date(endDate);
  const email = Ftyemail


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
    const response = await ft_achievements(email);
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
      const response = await ft_foreign(email);
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
  const response = await ft_projects(email);
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
    const response = await ft_publications(email);
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

  const Filtered = data.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  const Filtered2 = data2.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
 const Filtered3 = data3.filter(item=>new Date(item.date) >= Date1 && new Date(item.date)<=Date2)
  const Filtered4 = data4.filter(item=>new Date(item.start_date) >= Date1 && new Date(item.start_date)<=Date2)
 const Filtered5 = data5.filter(item=>new Date(item.start_date) >= Date1 && new Date(item.start_date)<=Date2)
   const Filtered6 = data6.filter(item=>new Date(item.published_date) >= Date1 && new Date(item.published_date)<=Date2)
 

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
        Combined Data of Faculty
      </div>
      <br></br>
      <div className="bg-indigo-100 text-center text-l font-semibold">
        Your Awards and Honors
      </div>
      <br></br>
      {/* <TableStudentAwards data={data} columns={columns}/> */}
      {/* <div class="d-flex justify-content-center"> */}
      <table>
        <thead>
          <tr>
          <th class="border border-black p-2">Sr. No.</th>
            
            <th class="border border-black p-2">Award Details</th>
            <th class="border border-black p-2">Additional Information</th>
            <th class="border border-black p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {Filtered.map((item,index) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {index+1}</td>
              
              <td class="border border-black p-2">{item.award_name}</td>
              <td class="border border-black p-2">{item.additional_info}</td>
              <td class="border border-black p-2"> {item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* </div> */}
      <br></br>
    

     

      <div className="bg-indigo-100 text-center text-l font-semibold">
       Participated as invited speaker/ session chair
      </div>
      <br></br>
      <table>
        <thead>
          <tr>

          <th class="border border-black p-2">Sr. No.</th>
            <th class="border border-black p-2">Lecture Title</th>
            <th class="border border-black p-2">Department</th>
            <th class="border border-black p-2">Institute</th>
            <th class="border border-black p-2">Date</th>

          </tr>
        </thead>
        <tbody>
          {Filtered3.map((item,index) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {index+1}</td>
              <td class="border border-black p-2">{item.title}</td>
              <td class="border border-black p-2">{item.dept}</td>
              <td class="border border-black p-2">{item.institute}</td>     
              <td class="border border-black p-2">{item.date}</td>         
            </tr>
          ))}
        </tbody>
      </table>  
      <br></br>  

      <div className="bg-indigo-100 text-center text-l font-semibold">
        Your Foreign Visits
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
          <th class="border border-black p-2">Sr. No.</th>
            <th class="border border-black p-2">Start Date</th>
            <th class="border border-black p-2">End Date</th>
            <th class="border border-black p-2">Country</th>
            <th class="border border-black p-2">Visit Details</th>
          </tr>
        </thead>
        <tbody>
          {Filtered4.map((item,index) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {index+1}</td>
              <td class="border border-black p-2">{item.start_date}</td>
              <td class="border border-black p-2">{item.end_date}</td>
              <td class="border border-black p-2">{item.country}</td>
              <td class="border border-black p-2">{item.visit_details}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>

       <div className="bg-indigo-100 text-center text-l font-semibold">
        Your Publications/Patents/Journals
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
          <th class="border border-black p-2">Sr. No.</th>
            <th class="border border-black p-2">Title of Publications/Patents</th>
            <th class="border border-black p-2">Authors</th>
            <th class="border border-black p-2">Conference Name</th>
            <th class="border border-black p-2">Title of Journal</th>
            <th class="border border-black p-2">Page/Issue/Patent No</th>
            <th class="border border-black p-2">Accepted Date</th>
            <th class="border border-black p-2">Published Date</th>
            <th class="border border-black p-2">DOI/ISBN/Assignee</th>
            <th class="border border-black p-2">Impact Factor</th>
          </tr>
        </thead>
        <tbody>
          {Filtered6.map((item,index) => (
            <tr key={item.patent_no}>
              <td class="border border-black p-2"> {index+1}</td>
              <td class="border border-black p-2">{item.title}</td>
              <td class="border border-black p-2">{item.author}</td>
              <td class="border border-black p-2">{item.type}</td>
              <td class="border border-black p-2">{item.title_publish}</td>
              <td class="border border-black p-2">{item.patent_no}</td> 
              <td class="border border-black p-2">{item.accepted_date}</td>
              <td class="border border-black p-2">{item.published_date}</td>
              <td class="border border-black p-2">{item.assignee}</td>
              <td class="border border-black p-2">{item.impact_factor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>  
      
      <div className="bg-indigo-100 text-center text-l font-semibold">
         Your Research Projects
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
          <th class="border border-black p-2">Sr. No.</th>
            <th class="border border-black p-2">Project Title</th>
            <th class="border border-black p-2">Start Date</th>
            <th class="border border-black p-2">Department</th>
            <th class="border border-black p-2">Funding Agency</th>
            <th class="border border-black p-2">Funds Granted</th>
          </tr>
        </thead>
        <tbody>
          {Filtered5.map((item,index) => (
            <tr key={item.faculty_name}>
              <td class="border border-black p-2"> {index+1}</td>
              <td class="border border-black p-2">{item.title}</td>
              <td class="border border-black p-2">{item.start_date}</td>
              <td class="border border-black p-2">{item.dept}</td>
              <td class="border border-black p-2">{item.funding_agency}</td>
              <td class="border border-black p-2">{item.funds}</td>
            </tr>
          ))}
        </tbody>
      </table>
     
      <br></br>  
      
      
      <h6>This Data is from - {startDate} to {endDate}</h6>
      
     
    </div>
  );
});