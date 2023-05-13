import React, { Fragment,Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userfunc } from '../services/Apis'
import TablesAwards, { StatusPill } from "../tables/TablesAwards";
import Sidebar from "../components/Sidebar";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {st_home} from '../services/Apis';
import {BACKEND_URL} from "../services/helper";

function Awards() {
  const navigate = useNavigate();
  var email = localStorage.getItem('email');
  // console.log(email)
  const utype = "0";
  const [showModal, setShowModal] = useState(false);
  const [showModaldelete, setShowModaldelete] = useState(false);
  const [did, setdid] = useState("");
  const [stData, setData] = useState([]);

  const url='https://dep-t22-iitropar-department-databas.netlify.app/Sample_St_Award_Header.csv'

  useEffect(() => {
    const fetchData = async (e) => {
      try {
        
        const response = await st_home(email);
        
        setData(response.data)
        //console.log(response.data);
        //console.log(ftData);
       // console.log('react');
      } catch (error) {
        console.error(error);
      }
    };
    if (email) {
      fetchData();
    }
    fetchData();
  }, [email]);

  const deleteRow=async (id)=>{
    setShowModaldelete(true);
    setdid(id);
    // let result= await fetch(`${BACKEND_URL}/user/deleteid/${id}`,{
    //   method:"Delete"});
    //  // result=await result.json()
    //   window.location.reload();
  }
  
  const deleteRowyes=async ()=>{
  
    let result= await fetch(`${BACKEND_URL}/user/deleteid/${did}`,{
      method:"Delete"});
     // result=await result.json()
     setShowModaldelete(false);
      window.location.reload();
  }

  function canceldelete(){
    setShowModaldelete(false);

  }

  const [data, setUserData] = useState([]);
  let sortedData = data;
  const userGet = async () => {
    const response = await userfunc(email);
    if (response.status === 200) {
      setUserData(response.data)
      sortedData = data.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet();
    setTimeout(() => {
    }, 1200)
  }, [])

  console.log(data.length);


  const columns = React.useMemo(
    () => [
      {
        Header: "Award/Achievement Name",
        accessor: "award_name",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Shared With",
        accessor: "shared_with",
      },
      {
        Header: "Attached Link For Reference",
        accessor: "award_link",
      },
      {
        Header: "Additional Informatio  (If Any) ",
        accessor: "additional_info",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },

      {
        Header: 'Edit',
        Cell: props => {
          const { original } = props.cell.row;
          return (<div>

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./Home.js/" + original._id, {
              state: {
                faculty_name: original.faculty_name,
                student_name: original.student_name,
                award_name: original.award_name,
                date: original.date,
                shared_with: original.shared_with,
                award_link:original.award_link,
                additional_info:original.additional_info,
                id: original._id,
                link:original.link,
                utype: utype,
              }
            })}>Edit</button>
          </div>);


        }
      },
      {
        Header: 'Delete',
        Cell: props => {
          const { original } = props.cell.row;
          return (<div>

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() =>deleteRow(original._id)}>Delete</button>
          </div>);


        }
      }
    ],
    []
  );

var fname="";



 function uploadbulk2(){
  if(data.length===0){
    fname="puneet@iitrpr.ac.in"
  }
  else{
    fname=data[0].faculty_name
  }
  navigate("./StAwardCsv" ,{state:{
    utype: utype,
    fname: fname,
    email: email,
 }})
 }

 

function uploadbulk(){
 

 
    const aTag=document.createElement("a");
aTag.href=url;
aTag.setAttribute("download","Sample_Student_Awards");
document.body.appendChild(aTag);
aTag.click();
aTag.remove();

if(data.length===0){
  fname="puneet@iitrpr.ac.in"
}
else{
  fname=data[0].faculty_name
}
  
console.log(fname);

  navigate("./StAwardCsv" ,{state:{
    utype: utype,
    fname: fname,
    email: email,
 }})

}

  function generatePDF() {
    const doc = new jsPDF();
    fetch('https://akm-img-a-in.tosshub.com/aajtak/images/story/201502/iit_ropar_650_022415062015.jpg?size=948:533')
  .then(response => response.blob())
  .then(blob => {
    const imgUrl = URL.createObjectURL(blob);
    const imageWidth = 46;
    const imageHeight = 26;
    const xPos = 10;
    const yPos = 10;
    const pageWidth =
    doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    doc.addImage(imgUrl, 'PNG', xPos, yPos, imageWidth, imageHeight);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Indian Institute of Technology, Ropar", pageWidth / 2, 16, {
      align: "center"
    });
  
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Rupnagar,Punjab-140001", pageWidth / 2, 22, { align: "center" });
    doc.text("Tele:+91-1881-242123, email:office-cse-1@iitrpr.ac.in", pageWidth / 2, 28, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(10, 38, pageWidth - 10, 38);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("AWARDS/ACHIEVEMENTS LIST", pageWidth / 2, 45, {
      align: "center"
    });
    doc.setLineWidth(0.2);
    doc.line(90, 46, pageWidth - 90, 46);
    doc.setFont("helvetica", "bold");
    doc.text("Student Name", 20, 60);
    doc.text(":", 70, 60);
    doc.setFont("helvetica", "normal");
    doc.text(stData[6], 72, 60);
    doc.setFont("helvetica", "bold");
    doc.text("Student Email", 20, 65);
    doc.text(": ", 70, 65);
    doc.setFont("helvetica", "normal");
    doc.text(email, 72, 65);
    doc.setFont("helvetica", "bold");
    doc.text("Student Programme", 20, 70);
    doc.text(": ", 70, 70);
    doc.setFont("helvetica", "normal");
    doc.text("PhD, CSE", 72, 70);
    
    const columns = [["Award Name", "Date", "Shared With","Additional Information","Status"]];
    const filteredData = data.filter(item => item.student_name === email);
    const rows = filteredData.map(user=>[user.award_name,user.date,user.shared_with,user.additional_info,user.status]);
    doc.autoTable({
      head: columns,
      body: rows,
      startY: 80,
    });
   // doc.save('my-document.pdf');
   const today = new Date();
   const year = today.getFullYear();
   const month = today.getMonth() + 1;
   const day = today.getDate();
   const formattedMonth = month < 10 ? `0${month}` : month;
   const formattedDay = day < 10 ? `0${day}` : day;
   const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
 
   // save PDF with formatted date in filename
   const filename = `${formattedDate}-${stData[6]}-Awards.pdf`;
   doc.save(filename);

    // add image to PDF here
  });
  }
  return (
    <>

      <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
        <Sidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={generatePDF}>Generate PDF</button>
            {/* <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={() => navigate("./StAwardCsv" ,{state:{
               utype: utype,
            }})} >Upload Data in Bulk</button> */}
             <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={ () => setShowModal(true)} >Upload Data in Bulk</button>
          </div>

          {showModal ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setShowModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-1 py-8">
                            <div className="relative w-90 max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                              
                                    
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                       
                                        <p className="mt-2 text-[20px] leading-relaxed text-gray-500">
                                          Do you want to download a sample file?
                                        </p>
                                        <div className="items-center gap-4 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-1.5 flex-1 text-white bg-blue-600 rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2"
                                                onClick={uploadbulk2}  >
                                                Not Now
                                            </button>
                                            <button
                                                className="w-full mt-2 p-1.5 flex-1 text-white  bg-green-600 rounded-md outline-none border ring-offset-2 ring-green-600 focus:ring-2"
                                                onClick={ uploadbulk }  >
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                </>
            ) : null}
        


        {showModaldelete ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setShowModaldelete(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-90 max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                <div className="mt-3 sm:flex">
                                    <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-red-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                       
                                        <p className="mt-2 text-[20px] leading-relaxed text-gray-500">
                                            Do you want to delete this?
                                        </p>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                                onClick={() =>
                                                  deleteRowyes()
                                                }
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    canceldelete()
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

       
          <div className="">
          <br />
            <h2 className="text-center bg-indigo-100 text-xl font-semibold">Your Awards/Achievements</h2>
          </div>
          <div className="mt-4">
            <TablesAwards columns={columns} data={data} utype={utype} />
          </div>
        </main>
      </div>
      <div className="w-1/2 bg-gray-100 text-gray-900"></div>
    </>

  );
}

export default Awards;