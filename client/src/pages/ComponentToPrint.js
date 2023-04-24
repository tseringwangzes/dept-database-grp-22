import { ClassNames } from "@emotion/react";
import { userfunc } from '../services/Apis'
import React, { Component, useEffect, useState } from "react";
import TablesAwards, { StatusPill } from "../tables/TablesAwards";

// Using a class component, everything works without issue  
// Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
// the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
export const ComponentToPrint = React.forwardRef((props, ref) => {
    const [data, setUserData] = useState([]);
    const utype="1"
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

    return (
        <div ref={ref}>
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
            <table classname="border border-black">
        <thead>
          <tr>
            <th className="border border-black p-2">Faculty Name</th>
            <th className="border border-black p-2">Student Name</th>
            <th className="border border-black p-2">Award Name</th>
            <th className="border border-black p-2">Award Reason</th>
            <th className="border border-black p-2">Date</th>
            <th className="border border-black p-2">Shared With</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.faculty_name}>
            <td className="border border-black p-2"> {item.faculty_name}</td>
              <td className="border border-black p-2">{item.student_name}</td>
              <td className="border border-black p-2">{item.award_name}</td>
              <td className="border border-black p-2">{item.award_reason}</td>
              <td className="border border-black p-2">{item.date}</td>
              <td className="border border-black p-2">{item.shared_with}</td>
            </tr>
          ))}
        </tbody>
      </table>
            <br></br>
            <div className="bg-indigo-100 text-center text-l font-semibold">
                FACULTY AWARDS
            </div>
            <br></br>
            <div className="bg-indigo-100 text-center text-l font-semibold">
                STUDENTS ACHIEVEMENTS
            </div>
            <br></br>
            <div className="bg-indigo-100 text-center text-l font-semibold">
                FACULTY ACHIEVEMENTS
            </div>
            <br></br>
            <div className="bg-indigo-100 text-center text-l font-semibold">
                STUDENT PUBLICATIONS
            </div>
            <br></br>
            <div className="bg-indigo-100 text-center text-l font-semibold">
                FACULTY PUBLICATIONS
            </div>
            <br></br>
            <div className="bg-indigo-100 text-center text-l font-semibold">
                STUDENTS AWARDS
            </div>
            <br></br>
            <div className="bg-indigo-100 text-center text-l font-semibold">
                STUDENTS AWARDS
            </div>
            <br></br>
            <div className="bg-indigo-100 text-center text-l font-semibold">
                STUDENTS AWARDS
            </div>
            <br></br>
            <div className="bg-indigo-100 text-center text-l font-semibold">
                STUDENTS AWARDS
            </div>

            <div>
                
            </div>
            </div>
    );
});