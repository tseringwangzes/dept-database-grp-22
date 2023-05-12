import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { st_publi } from '../services/Apis'
import TablesPublications, { StatusPill } from "../tables/TablesPublications";
import Sidebar from "../components/Sidebar";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {st_home} from '../services/Apis';
import {BACKEND_URL} from "../services/helper";

function Publications() {
  const navigate = useNavigate();

  const utype = "0";

  const [showModal, setShowModal] = useState(false);
  const [showModaldelete, setShowModaldelete] = useState(false);
  const [did, setdid] = useState("");
  const [data, setUserData] = useState([]);
  const [stData, setData] = useState([]);
  var email = localStorage.getItem('email');

  const url='https://dep-t22-iitropar-department-databas.netlify.app/Sample_St_Publication_Header.csv'

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
    // let result= await fetch(`${BACKEND_URL}/user/deletepublicationid/${id}`,{
    //   method:"Delete"});
    //  // result=await result.json()
      // window.location.reload();
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


  const userGet = async () => {
    const response = await st_publi(email);
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
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./PublicationsEdit.js/"+original._id, {
              state: {
                id:original._id,
                faculty_name:original.faculty_name,
                student_name:original.student_name,
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
                status:original.status,
                utype:utype
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
      fname=data[0].faculty_name;
  }
    navigate("./StPublicationCsv" ,{state:{
      utype: utype,
      fname: fname,
      email:email,
   }})
   }

  function uploadbulk(){
    if(data.length===0){
      fname="puneet@iitrpr.ac.in"
  }
  else{
      fname=data[0].faculty_name;
  }

    const aTag=document.createElement("a");
    aTag.href=url;
    aTag.setAttribute("download","Sample_Student_Publications");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    
     navigate("./StPublicationCsv" ,{state:{
      utype: utype,
      fname: fname,
      email:email,
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
    
    const columns = [["Title", "Authors","Conference Name","Title Of Journal","Page/Issue/Patent No.", "Accepted Date","Published Date","DOI/ISBN/Assignee","Impact Factor"]];
    const filteredData = data.filter(item => item.student_name === email);

const rows = filteredData.map(user=>[user.title,user.author,user.type,user.title_publish,user.patent_no,user.accepted_date,user.published_date,user.assignee,user.impact_factor]);
    doc.autoTable({
      head: columns,
      body: rows,
      startY: 80,
    });
    //doc.save('my-document.pdf');
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
  
    // save PDF with formatted date in filename
    const filename = `${formattedDate}-${stData[6]}-Publications.pdf`;
    doc.save(filename);
    // add image to PDF here
  });
  }

  //  console.log(data);


  return (
    <>

      <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
        <Sidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={generatePDF}>Generate PDF</button>
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full " onClick={ () => setShowModal(true)} >Upload Data in Bulk</button>
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
            <h1 className="text-center bg-indigo-100  text-xl font-semibold">Your Publications/Patents/Journals</h1>
          </div>
          <div className="mt-4">
            <TablesPublications columns={columns} data={data} utype={utype}/>
          </div>
        </main>
      </div>
      <div className="w-1/2 bg-gray-100 text-gray-900"></div>
    </>

  );
}

export default Publications;