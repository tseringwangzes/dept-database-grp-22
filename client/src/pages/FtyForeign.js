import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ft_foreign } from '../services/Apis'
import FtyTablesForeigns, { StatusPill } from "../tables/FtyTablesForeigns";
import FtySidebar from "../components/FtySidebar";
import jsPDF from 'jspdf';
import {ft_home} from '../services/Apis';
import {BACKEND_URL} from "../services/helper";

function FtyForeign() {
    const utype = "0";
    const navigate = useNavigate();
    var email = localStorage.getItem('email');

    const [showModal, setShowModal] = useState(false);
    const [showModaldelete, setShowModaldelete] = useState(false);
    const [did, setdid] = useState("");
    const [stData, setData] = useState([]);
    const url='https://dep-t22-iitropar-department-databas.netlify.app/Sample_Fty_Foreign_Header.csv'

    useEffect(() => {
        const fetchData = async (e) => {
          try {
            
            const response = await ft_home(email);
            
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
        // let result = await fetch(`${BACKEND_URL}/user/ftydeleteforeign/${id}`, {
        //   method:"Delete"});
        //  // result=await result.json()
        //   window.location.reload();
      }

      const deleteRowyes=async ()=>{
        let result = await fetch(`${BACKEND_URL}/user/ftydeleteforeign/${did}`, {
          method:"Delete"});
         // result=await result.json()
         setShowModaldelete(false);
          window.location.reload();
      }
    
      function canceldelete(){
        setShowModaldelete(false);
    
      }


    const [data, setUserData] = useState([]);
    const userGet = async () => {
        const data = {
            email:email
          }
        const response = await ft_foreign(email);
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
                Header: "Start-Date",
                accessor: "start_date",
            },
            {
                Header: "End-date",
                accessor: "end_date",
            },
            {
                Header: "Country",
                accessor: "country",
            },
            {
                Header: "Visit Details",
                accessor: "visit_details",
            },
            {
                Header: 'Edit',
                Cell: props => {
                    const { original } = props.cell.row;
          
                    return (<div>
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtyForeignEdit.js/" + original._id, {
                        state: {
                            faculty_name:original.faculty_name,
                         
                          start_date: original.start_date,
                          end_date: original.end_date,
                          country: original.country,
                          visit_details:original.visit_details,
                          id: original._id,
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

    function uploadbulk2(){
      navigate("./FtyForeignCsv" ,{state:{
        utype: utype,
        email:email,

     }})
     }

    function uploadbulk(){

      const aTag=document.createElement("a");
      aTag.href=url;
      aTag.setAttribute("download","Sample_Faculty_Foreign_visits");
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
     
      
    navigate("./FtyForeignCsv" ,{state:{
        utype: utype,
        email:email,

     }})
      
      }

    //  console.log(data);

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
      doc.text("FOREIGN VISITS LIST", pageWidth / 2, 45, {
        align: "center"
      });
      doc.setLineWidth(0.2);
      doc.line(80, 46, pageWidth - 80, 46);
      doc.setFont("helvetica", "bold");
      doc.text("Faculty Name", 20, 60);
      doc.text(":", 70, 60);
      doc.setFont("helvetica", "normal");
      doc.text(stData[6], 72, 60);
      doc.setFont("helvetica", "bold");
      doc.text("Faculty Email", 20, 65);
      doc.text(": ", 70, 65);
      doc.setFont("helvetica", "normal");
      doc.text(email, 72, 65);
      doc.setFont("helvetica", "bold");
      doc.text("Faculty Department", 20, 70);
      doc.text(": ", 70, 70);
      doc.setFont("helvetica", "normal");
      doc.text("CSE", 72, 70);
      
      const columns = [["Start Date","End Date","Country Visited","Visit Details"]];
      const filteredData = data.filter(item => item.faculty_name === email);
  
  const rows = filteredData.map(user=>[user.start_date,user.end_date,user.country,user.visit_details]);
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
   const filename = `${formattedDate}_${stData[6]}_ForeignVisits.pdf`;
   doc.save(filename);
      // add image to PDF here
    });
    }


    return (
        <>

            <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
                <FtySidebar />
                <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={generatePDF}>Generate PDF</button>
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

  

          
          <br />
                 
                    <div className="">
                        <h1 className="text-center bg-indigo-100 text-xl font-semibold">Your Foreign Visits</h1>
                    </div>
                    <div className="mt-4">
                        <FtyTablesForeigns columns={columns} data={data} utype = {utype}/>
                    </div>
                </main>
            </div>
            <div className="w-1/2 bg-gray-100 text-gray-900"></div>
        </>

    );
}

export default FtyForeign;