import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ft_achievements } from '../services/Apis'
import FtyTablesAchievements, { StatusPill } from "../tables/FtyTablesAchievements";
import FtySidebar from "../components/FtySidebar";
import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";

function FtyAchievements() {
  const navigate = useNavigate();
  
  var email = localStorage.getItem('email');
  
  console.log(email)

  
  const deleteRow=async (id)=>{
    let result = await fetch(`http://localhost:4002/user/ftydeleteachievements/${id}`, {
      method:"Delete"});
     // result=await result.json()
      window.location.reload();
  }


  const utype = "0";
  const [data, setUserData] = useState([]);
  const userGet = async () => {
    const data = {
      email:email
    }
    const response = await ft_achievements(data);
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
        Header: " Achievements",
        accessor: "Achievements",
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
return(
          <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtyAchievementsEdit.js/"+original._id, {
              state: {
                faculty_name:original.faculty_name,
                Achievements: original.Achievements,
                date: original.date,
                shared_with: original.shared_with,
                id:original._id,
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


  function generatePDF() {
    const doc = new Document({
      sections: [
          {
              properties: {},
              children: [
                  new Paragraph({
                      children: [
                          new TextRun("Hello World"),
                          new TextRun({
                              text: "Foo Bar",
                              bold: true,
                          }),
                          new TextRun({
                              text: "\tGithub is the best",
                              bold: true,
                          }),
                      ],
                  }),
              ],
          },
      ],
  });
  
  // Used to export the file into a .docx file
  Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync("My Document.docx", buffer);
  });
  }


  //  console.log(data);


  return (
    <>

      <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
        <FtySidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      
        <div className="">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={generatePDF}>Generate PDF</button>
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={() => navigate("./FtyAchievementCsv" )} >Upload Data in Bulk</button>
          </div>
          <br />
      
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Your Achievements</h1>
          </div>
          <div className="mt-4">
            <FtyTablesAchievements columns={columns} data={data} utype={utype} />
          </div>
        </main>
      </div>
      <div className="w-1/2 bg-gray-100 text-gray-900"></div>
    </>

  );
}

export default FtyAchievements;