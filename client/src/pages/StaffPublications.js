import React, { Component, useEffect, useState } from "react";
import Sidebar from "../components/staffSide";
import { useNavigate } from "react-router-dom";
import { st_publi } from '../services/Apis'
import { ft_publications } from '../services/Apis'

import Table, { StatusPill } from "./Table";
import TablesPublications from "../tables/TablesPublications";
import FtyTablesPublications from "../tables/FtyTablesPublications";
import jsPDF from 'jspdf';
import {BACKEND_URL} from "../services/helper";

export default function StaffStudent() {
  const navigate = useNavigate();
  const utype = "1";
const email = localStorage.getItem('email');
  const url2='https://dep-t22-iitropar-department-databas.netlify.app/Sample_Staff_Fty_Publication_Header.csv'
  const url='https://dep-t22-iitropar-department-databas.netlify.app/Sample_Staff_St_Publication_Header.csv'


  const [showModal, setShowModal] = useState(false);
  const [showModaldelete, setShowModaldelete] = useState(false);
  const [did, setdid] = useState("");

  const [ftshowModal, ftsetShowModal] = useState(false);
  const [ftshowModaldelete, ftsetShowModaldelete] = useState(false);
  const [ftdid, ftsetdid] = useState("");


  function stuploadbulk2(){
    navigate("/Profile/Publications/StPublicationCsv",{state:{utype:utype}} )

   }
  function uploadbulk(){

    const aTag=document.createElement("a");
    aTag.href=url;
    aTag.setAttribute("download","Sample_Student_Publications");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
   
    
    navigate("/Profile/Publications/StPublicationCsv",{state:{utype:utype}} )
    
    }
    function ftuploadbulk2(){
     
      navigate("/faculty/Publications/FtyPublicationCsv",{state:{utype:utype}} )

     }


  function uploadbulk2(){

    const aTag=document.createElement("a");
    aTag.href=url2;
    aTag.setAttribute("download","Sample_Faculty_Publications");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
   
    
    navigate("/faculty/Publications/FtyPublicationCsv",{state:{utype:utype}} )
    
    }
  const deleteRow=async (id)=>{
    ftsetShowModaldelete(true);
    ftsetdid(id);
    // let result = await fetch(`${BACKEND_URL}/user/ftydeletepublication/${id}`, {
    //   method:"Delete"});
    //  // result=await result.json()
    //   window.location.reload();
  }
  const ftdeleteRowyes=async ()=>{
  
   let result = await fetch(`${BACKEND_URL}/user/ftydeletepublication/${ftdid}`, {
      method:"Delete"});
     // result=await result.json()
  ftsetShowModaldelete(false);
   window.location.reload();
}

  const stdeleteRow=async (id)=>{
    setShowModaldelete(true);
    setdid(id);
    // let result= await fetch(`${BACKEND_URL}/user/deletepublicationid/${id}`,{
    //   method:"Delete"});
    //  // result=await result.json()
    //   window.location.reload();
  }
  const deleteRowyes=async ()=>{
  
  let result= await fetch(`${BACKEND_URL}/user/deletepublicationid/${did}`,{
      method:"Delete"});
     // result=await result.json()
     setShowModaldelete(false);
      window.location.reload();
  }

  function canceldelete(){
    setShowModaldelete(false);

  }
  function ftcanceldelete(){
    ftsetShowModaldelete(false);

  }


  const [data, setUserData] = useState([]);
  const userGet = async () => {
    const response = await st_publi("admin");
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


  const columns = React.useMemo(
    () => [
      {
        Header: " Student Email Id",
        accessor: "student_name",
      },

      {
        Header: "Faculty Email Id",
        accessor: "faculty_name",
      },
      {
        Header: "Title of Articles/Publications/Patents",
        accessor: "title",
      },
      {
        Header: "Authors",
        accessor: "author",
      },
      {
        Header: "Conference Name",
        accessor: "type",
      },
      {
        Header: "Title of Journal",
        accessor: "title_publish",
      },
      {
        Header: "Page/Issue/Patent No.",
        accessor: "patent_no",
      },
      {
        Header: "Accepted Date",
        accessor: "accepted_date",
      },
     
      {
        Header: "Publish Date",
        accessor: "published_date",
       
      },
      {
        Header: "DOI/ISBN/Assignee",
        accessor: "assignee",
      },
      {
        Header: "Impact Factor",
        accessor: "impact_factor",
      },
      {
        Header: "Additional Information",
        accessor: "additional_info",
      },
      {
        Header: "Attached Link",
        accessor: "link",
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

          return (
            <div>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./PublicationsEdit.js/" + original._id, {
                state: {
                  faculty_name: original.faculty_name,
                  student_name: original.student_name,
                  title:original.title,
                  author:original.author,
                  type:original.type,
                  title_publish:original.title_publish,
                  patent_no:original.patent_no,
                  accepted_date:original.accepted_date,
                  published_date:original.published_date,
                  assignee:original.assignee,
                  impact_factor:original.impact_factor,
                  additional_info:original.additional_info,
                  link:original.link,
                  id: original._id,
                  utype: utype
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

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() =>stdeleteRow(original._id)}>Delete</button>
          </div>);


        }
      }
    ],
    []
  );

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
          doc.text("Tele:+91-1881-235101, email:cs@iitrpr.ac.in", pageWidth / 2, 28, { align: "center" });
          doc.setLineWidth(0.5);
          doc.line(10, 38, pageWidth - 10, 38);
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.text("PUBLICATIONS LIST", pageWidth / 2, 45, {
            align: "center"
          });
          doc.setLineWidth(0.2);
          doc.line(85, 46, pageWidth - 85, 46);
          doc.setFont("helvetica", "bold");
          doc.text("Staff Name", 20, 60);
          doc.text(":", 70, 60);
          doc.setFont("helvetica", "normal");
          doc.text("XYZ", 72, 60);
          doc.setFont("helvetica", "bold");
          doc.text("Staff Email", 20, 65);
          doc.text(": ", 70, 65);
          doc.setFont("helvetica", "normal");
          doc.text(email, 72, 65);
          doc.setFont("helvetica", "bold");
          doc.text("Department", 20, 70);
          doc.text(": ", 70, 70);
          doc.setFont("helvetica", "normal");
          doc.text("CSE", 72, 70);

          const columns = [["Student Name", "Topic", "Published Date", "Accepted Date", "Collaboration with", "No. Of Students", "Status"]];

          const rows = data.map(user => [user.student_name, user.topic, user.published_date, user.accepted_date, user.collaboration, user.no_of_students, user.status]);
          doc.autoTable({
            head: columns,
            body: rows,
            startY: 80,
          });
          doc.save('my-document.pdf');

          // add image to PDF here
        });
  }

  const [data2, setUserData2] = useState([]);
  const userGet2 = async () => {
    const response = await ft_publications("admin");
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


  const columns2 = React.useMemo(
    () => [
      {
        Header: "Faculty Email Id",
        accessor: "faculty_name",
      },
      {
        Header: "Title of Articles/Publications/Patents",
        accessor: "title",
      },
      {
        Header: "Authors",
        accessor: "author",
      },
      {
        Header: "Publications/Journals/Patents",
        accessor: "type",
      },
      {
        Header: "Title of Journal",
        accessor: "title_publish",
      },
      {
        Header: "Volume/Issue/Patent No.",
        accessor: "patent_no",
      },
      {
        Header: "Accepted Date",
        accessor: "accepted_date",
      },
     
      {
        Header: "Published Date",
        accessor: "published_date",
       
      },
      {
        Header: "DOI/ISBN/Assignee",
        accessor: "assignee",
      },
      {
        Header: "Impact Factor",
        accessor: "impact_factor",
      },
      {
        Header: "Additional Information",
        accessor: "additional_info",
      },
      {
        Header: "Attached Link",
        accessor: "link",
      },
      {
        Header: 'Edit',
        Cell: props => {
          const { original } = props.cell.row;
          return (<div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtyPublicationsEdit.js/" + original._id, {
              state: {
                faculty_name: original.faculty_name,
                title:original.title,
                author:original.author,
                type:original.type,
                title_publish:original.title_publish,
                patent_no:original.patent_no,
                accepted_date:original.accepted_date,
                published_date:original.published_date,
                assignee:original.assignee,
                impact_factor:original.impact_factor,
                additional_info:original.additional_info,
                link:original.link,
                id: original._id,
                utype: utype
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

  function FtygeneratePDF() {
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
        doc.text("Tele:+91-1881-235101, email:cs@iitrpr.ac.in", pageWidth / 2, 28, { align: "center" });
        doc.setLineWidth(0.5);
        doc.line(10, 38, pageWidth - 10, 38);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("PUBLICATIONS LIST", pageWidth / 2, 45, {
          align: "center"
        });
        doc.setLineWidth(0.2);
        doc.line(85, 46, pageWidth - 85, 46);
        doc.setFont("helvetica", "bold");
        doc.text("Staff Name", 20, 60);
        doc.text(":", 70, 60);
        doc.setFont("helvetica", "normal");
        doc.text("XYZ", 72, 60);
        doc.setFont("helvetica", "bold");
        doc.text("Staff Email", 20, 65);
        doc.text(": ", 70, 65);
        doc.setFont("helvetica", "normal");
        doc.text(email, 72, 65);
        doc.setFont("helvetica", "bold");
        doc.text("Department", 20, 70);
        doc.text(": ", 70, 70);
        doc.setFont("helvetica", "normal");
        doc.text("CSE", 72, 70);

        const columns = [["Faculty Name", "Topic", "Published Date", "Accepted Date", "Collaboration with"]];

        const rows = data2.map(user => [user.faculty_name, user.topic, user.published_date, user.accepted_date, user.collaboration]);
        doc.autoTable({
          head: columns,
          body: rows,
          startY: 80,
        });
        doc.save('my-document.pdf');

        // add image to PDF here
      });
  }

  return (
    <>

      <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
        <Sidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="">
            {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={generatePDF}>Generate PDF</button> */}
            <button class=" p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={()=>setShowModal(true) } >Upload Data in Bulk</button>
         <br />
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
                                                onClick={stuploadbulk2}  >
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

          <br></br>
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Student Publications/Patents/Journals</h1>
          </div>
          <div className="mt-4">
            <TablesPublications columns={columns} data={data} utype={utype} />
          </div>
          <br />
          <div className="">
            {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={FtygeneratePDF}>Generate PDF</button> */}
            <button class=" p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={()=>ftsetShowModal(true)} >Upload Data in Bulk</button>
<br />
          </div>

          {ftshowModal ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => ftsetShowModal(false)}
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
                                                onClick={ftuploadbulk2}  >
                                                Not Now
                                            </button>
                                            <button
                                                className="w-full mt-2 p-1.5 flex-1 text-white  bg-green-600 rounded-md outline-none border ring-offset-2 ring-green-600 focus:ring-2"
                                                onClick={ uploadbulk2}  >
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                </>
            ) : null}
        


        {ftshowModaldelete ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => ftsetShowModaldelete(false)}
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
                                                  ftdeleteRowyes()
                                                }
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    ftcanceldelete()
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

          <br></br>
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Faculty Publications/Patents/Journals</h1>
          </div>
          <div className="mt-4">
            <FtyTablesPublications columns={columns2} data={data2} utype={utype} />
          </div>


        </main>
      </div>
      <div className="w-1/2 bg-gray-100 text-gray-900"></div>
    </>

  );

}









