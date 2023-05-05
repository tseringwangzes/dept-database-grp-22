import React, { useRef } from "react";
import Sidebar from "../components/staffSide";
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import { useState } from "react";
function StaffHome() {
  let componentRef = useRef();
  const [startDate, setstartDate] = useState('');
  const [EndDate, setendDate] = useState('');

  var handleStartDateChange = (event) => {
    setstartDate(event.target.value);
  };
  console.log(startDate)
  var handleEndDateChange = (event) => {
    setendDate(event.target.value);
  };
  return (
    <>

      <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
        <Sidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="mt-4">
            Choose Start Date 
          {/* </div> */}

          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="ml-2 rounded-md px-4 py-2 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
<br></br>
<br></br>
Choose End Date
          <input
            type="date"
            value={EndDate}
            onChange={handleEndDateChange}
            className="ml-2 rounded-md px-4 py-2 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* <div className="mt-4"> */}
            <ReactToPrint
              trigger={() => <button>Print this out!</button>}
              content={() => componentRef.current}
              documentTitle="BOG MEETING DATA"
            />
            {/* <div className="hidden"> */}
            <ComponentToPrint ref={componentRef} startDate={startDate} EndDate={EndDate}/>
            {/* </div> */}
          </div>
        </main>
      </div>
      <div className="w-1/2 bg-gray-100 text-gray-900"></div>
    </>

  );
}

export default StaffHome;
