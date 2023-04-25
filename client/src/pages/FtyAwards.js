import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ft_awards } from '../services/Apis'
import FtyTablesAwards, { StatusPill } from "../tables/FtyTablesAwards";
import FtySidebar from "../components/FtySidebar";
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';


function FtyAwards() {
  const utype= "0";

  const url='http://localhost:3000/Fty_Award_Header.csv'

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

  function uploadbulk(){

    const aTag=document.createElement("a");
    aTag.href=url;
    aTag.setAttribute("download","Faculty_Awards");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    console.log(data[0].faculty_name)
    
  navigate("./FtyAwardCsv" ,{state:{
      utype: utype,
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
      doc.text("AWARDS LIST", pageWidth / 2, 45, {
        align: "center"
      });
      doc.setLineWidth(0.2);
      doc.line(90, 46, pageWidth - 90, 46);
      doc.setFont("helvetica", "bold");
      doc.text("Faculty Name", 20, 60);
      doc.text(":", 70, 60);
      doc.setFont("helvetica", "normal");
      doc.text("Dr. Puneet Goyal", 72, 60);
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
      
      const columns = [["Award Name", "Award Reason", "Date","Shared With","Status"]];
      const filteredData = data.filter(item => item.faculty_name === email);
  
  const rows = filteredData.map(user=>[user.award_name,user.award_reason,user.date,user.shared_with]);
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
        <FtySidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={generatePDF}>Generate PDF</button>
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={uploadbulk} >Upload Data in Bulk</button>
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