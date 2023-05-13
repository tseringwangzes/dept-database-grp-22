import React, { Component, useEffect, useState } from "react";
import Sidebar from "../../components/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { st_semi } from '../../services/Apis'
import { ft_seminars } from '../../services/Apis'
import FtyTablesAchievements, { StatusPill } from "../../tables/FtyTablesAchievements";
import FtyTablesSeminars from "../../tables/FtyTablesSeminars";
import jsPDF from 'jspdf';
import { ft_achievements } from "../../services/Apis";
import {BACKEND_URL} from "../../services/helper";

function StaffSeminar() {
  const navigate = useNavigate();

  const utype = "4";
  const url='https://dep-t22-iitropar-department-databas.netlify.app/Sample_Staff_Lecture_Experts_Header.csv'
  const url2='https://dep-t22-iitropar-department-databas.netlify.app/Sample_Staff_Fty_Lecture_Experts_Header.csv'

  function uploadbulk(){

    const aTag=document.createElement("a");
    aTag.href=url;
    aTag.setAttribute("download","Student_Seminars");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    console.log(data[0].faculty_name)
    
   navigate("/Profile/Seminars/StSeminarCsv" ,{state:{
      utype: utype,
   }})
    
    }

    function uploadbulk2(){

      const aTag=document.createElement("a");
      aTag.href=url2;
      aTag.setAttribute("download","Faculty_Seminars");
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      console.log(data[0].faculty_name)
      
     navigate("/faculty/Seminars/FtySeminarCsv",{state:{utype:utype}} )
      
      }

      const deleteRow=async (id)=>{
        setShowModaldelete(true);
        setdid(id);
        // let result = await fetch(`${BACKEND_URL}/user/ftydeleteachievements/${id}`, {
        //   method:"Delete"});
        //  // result=await result.json()
        //   window.location.reload();
      }
        
    
      const deleteRowyes=async ()=>{
      
        let result = await fetch(`${BACKEND_URL}/user/ftydeleteachievements/${did}`, {
          method:"Delete"});
         // result=await result.json()
         setShowModaldelete(false);
          window.location.reload();
      }
    
      function canceldelete(){
        setShowModaldelete(false);
    
      }
  

  const [data, setUserData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showModaldelete, setShowModaldelete] = useState(false);
  const [did, setdid] = useState("");
  const userGet = async () => {
    const response = await ft_achievements("admin");
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
        Header:"Faculty Name",
        accessor:"faculty_name",
      },
      {
        Header: "Lecture Title",
        accessor: "title",
      },
      {
        Header: "Institute Where Lecture Was Given",
        accessor: "institute",
      },
      {
        Header: "Department",
        accessor: "dept",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header:"Additional information(if any)",
        accessor:"additional_info",
      },
      {
        Header: 'Edit',
        Cell: props => {
          const { original } = props.cell.row;
return(
          <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtyAchievementsEdit.js/"+original._id, {
              state: {
                faculty_name:original.faculty_name,
                title: original.title,
                date: original.date,
                dept: original.dept,
                id:original._id,
                additional_info:original.additional_info,
                institute: original.institute,
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

  


  


    const [data2, setUserData2] = useState([]);
    const userGet2 = async () => {
      const response = await ft_seminars("admin");
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
        Header: " Name of Speaker/Chief Guest",
        accessor: "speaker",
      },
      {
        Header: " Title",
        accessor: "title",
      },
      {
        Header: "Designation of speaker",
        accessor: "designation",
      },
      {
        Header: "Institute/Organisation of speaker",
        accessor: "institute",
      },
      {
        Header: "Date of visit",
        accessor: "date",
      },
      {
        Header: "Venue",
        accessor: "venue",
      },
      {
        Header: "Number of Participants",
        accessor: "num_participant",
      },
      {
        Header: "Department",
        accessor: "dept",
      },
      {
        Header: "Additional Information",
        accessor: "additional_info",
      },
      {
        Header: 'Edit',
        Cell: props => {
          const { original } = props.cell.row;

          return (<div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtySeminarsEdit.js/" + origin._id, {
              state: {
                speaker:original.speaker,
                title:original.title,
                designation: original.designation,
                date: original.date,
                venue: original.venue,
                institute: original.institute,
                dept: original.dept,
                additional_info: original.additional_info,
                num_participant:original.num_participant,
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


  return (
    <>
        <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
        <Sidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
            
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={uploadbulk} >Upload Data in Bulk</button>
            <br></br>
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


          <br></br>
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Lectures by faculty as visiting experts</h1>
          </div>
          <div className="mt-4">
            <FtyTablesAchievements columns={columns} data={data} utype={utype}/>
          </div>
          <br/>
          <div className="">
           
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={uploadbulk2} >Upload Data in Bulk</button>
            <br></br>

          </div>
          <br></br>
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Lectures by visiting experts</h1>
          </div>
          <div className="mt-4">
            <FtyTablesSeminars columns={columns2} data={data2} utype={utype}/>
          </div>


        </main>
      </div>
      <div className="w-1/2 bg-gray-100 text-gray-900"></div>
      
    </>

  );
}

export default StaffSeminar;







