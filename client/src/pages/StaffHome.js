import React, { useRef } from "react";
import Sidebar from "../components/staffSide";
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import { useState } from "react";

function StaffHome() {
  let componentRef = useRef();
  const [startDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  var handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  var handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  var handleDownloadPDFToDOC = async () => {
    try {
      const conversionResponse = await fetch(
        `https://api.cloudconvert.com/v2/convert`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_CLOUDCONVERT_API_KEY",
          },
          body: JSON.stringify({
            inputformat: "pdf",
            outputformat: "doc",
            input: "upload",
            file: "YOUR_PDF_FILE_URL",
          }),
        }
      );

      const conversionData = await conversionResponse.json();

      if (conversionData.id) {
        const downloadResponse = await fetch(
          `https://api.cloudconvert.com/v2/convert/${conversionData.id}/download`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer YOUR_CLOUDCONVERT_API_KEY",
            },
          }
        );

        const blob = await downloadResponse.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "converted_file.doc";
        link.click();
        URL.revokeObjectURL(url);
      } else {
        console.error("Error converting PDF to DOC:", conversionData.error);
      }
    } catch (error) {
      console.error("Error converting PDF to DOC:", error);
    }
  };

  return (
    <>
      <div className="absolute right-0 w-3/4 bg-gray-100 text-gray-900">
        <Sidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="mt-4 flex flex-col">
            Choose Start Date 

         <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="ml-2 rounded-md px-4 py-2 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        <br></br>
       Choose End Date
          <input
            type="date"
            value={EndDate}
            onChange={handleEndDateChange}
            className="ml-2 rounded-md px-4 py-2 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          </div>
          <br></br>
          {/* <div className="mt-4"> */}
            <ReactToPrint
              trigger={() => <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full mb-3">Print this out!</button>}
              content={() => componentRef.current}
              documentTitle="BOG_MEETING_DATA"
            />
            <ComponentToPrint ref={componentRef} startDate={startDate} endDate={EndDate} />
            {/* <button onClick={handleDownloadPDFToDOC}>
            </button> */}
        </main>
      </div>
    </>
  );
}

export default StaffHome;
