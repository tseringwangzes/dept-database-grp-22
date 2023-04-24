import React, { Component, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userfunc } from '../services/Apis'
import Table, { StatusPill } from "./Table2";
import Sidebar from "../components/staffSide";
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
function StaffHome() {
  const navigate = useNavigate();
  let componentRef = useRef();

  //  console.log(data);

  // return (
  //   <div>
  //     <ReactToPrint
  //       trigger={() => <button>Print this out!</button>}
  //       content={() => componentRef.current}
  //     />
  //     <ComponentToPrint ref={componentRef} />
  //   </div>
  // );
  // };

  return (
    <>

      <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
        <Sidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="">
            <h1 className="text-xl font-semibold">This is staff home</h1>
          </div>
          <div className="mt-4">
            <ReactToPrint
              trigger={() => <button>Print this out!</button>}
              content={() => componentRef.current}
            />
            {/* <div className="hidden"> */}
          <ComponentToPrint ref={componentRef} />
            {/* </div> */}
          </div>
        </main>
      </div>
      <div className="w-1/2 bg-gray-100 text-gray-900"></div>
    </>

  );
}

export default StaffHome;
