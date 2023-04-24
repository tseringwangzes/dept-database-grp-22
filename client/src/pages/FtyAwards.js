import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ft_awards } from '../services/Apis'
import FtyTablesAwards, { StatusPill } from "../tables/FtyTablesAwards";
import FtySidebar from "../components/FtySidebar";
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';


function FtyAwards() {
  const utype= "0";
  const navigate = useNavigate();
  var email = localStorage.getItem('email');
  console.log(email)


  const deleteRow=async (id)=>{
    let result= await fetch(`http://localhost:4002/user/ftydeleteaward/${id}`,{
      method:"Delete"});
     // result=await result.json()
      window.location.reload();
  }


  const [data, setUserData] = useState([]);
  let sortedData = data;
  const userGet = async () => {
    const data = {
      email:email
    }
    console.log(data);
    const response = await ft_awards(data);
    if (response.status === 200) {
      setUserData(response.data)
      console.log(response.data)
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


  const columns = React.useMemo(
    () => [

      {
        Header: "Award Name",
        accessor: "award_name",
      },
      {
        Header: "Award Reason",
        accessor: "award_reason",
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
        Header: 'Edit',
        Cell: props => {
          const { original } = props.cell.row;
          return (<div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtyAwardsEdit.js/" + original._id, {
              state: {
                faculty_name:original.faculty_name,
                award_name: original.award_name,
                award_reason: original.award_reason,
                date: original.date,
                shared_with: original.shared_with,
                id: original._id,
                utype:utype,
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
    [data]
  )
  


  //  console.log(data);




  function generatePDF() {
    
  }


  return (
    <>

      <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
        <FtySidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={generatePDF}>Generate PDF</button>
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={() => navigate("./FtyAwardCsv" ,{state:{
               utype: utype,
            }})} >Upload Data in Bulk</button>
          </div>
          <br></br>
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Your Awards</h1>
          </div>
          <div className="mt-4">
         

            <FtyTablesAwards columns={columns} data={data} utype={utype}/>
          </div>
        </main>
      </div>
      <div className="w-1/2 bg-gray-100 text-gray-900"></div>
    </>

  );
}

export default FtyAwards;