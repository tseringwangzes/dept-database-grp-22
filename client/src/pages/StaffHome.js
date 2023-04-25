import React, { useRef } from "react";
import Sidebar from "../components/staffSide";
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";

function StaffHome() {
  let componentRef = useRef();

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
              documentTitle="BOG MEETING DATA"
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
