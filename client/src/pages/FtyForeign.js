import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ft_foreign } from '../services/Apis'
import FtyTablesForeigns, { StatusPill } from "../tables/FtyTablesForeigns";
import FtySidebar from "../components/FtySidebar";
import jsPDF from 'jspdf';

function FtyForeign() {
    const utype = "0";
    const navigate = useNavigate();
    var email = localStorage.getItem('email');
   
    const url='http://localhost:3000/Fty_Foreign_Header.csv'

    const deleteRow=async (id)=>{
        let result = await fetch(`http://localhost:4002/user/ftydeleteforeign/${id}`, {
          method:"Delete"});
         // result=await result.json()
          window.location.reload();
      }


    const [data, setUserData] = useState([]);
    const userGet = async () => {
        const data = {
            email:email
          }
        const response = await ft_foreign();
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
                Header: " Topic",
                accessor: "topic",
            },
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
                Header: 'Edit',
                Cell: props => {
                    const { original } = props.cell.row;
          
                    return (<div>
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtyForeignEdit.js/" + original._id, {
                        state: {
                            faculty_name:original.faculty_name,
                          topic:original.topic,
                          start_date: original.start_date,
                          end_date: original.end_date,
                          country: original.country,
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


    function uploadbulk(){

      const aTag=document.createElement("a");
      aTag.href=url;
      aTag.setAttribute("download","Faculty_Foreign_visits");
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      console.log(data[0].faculty_name)
      
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
      doc.text("Tele:+91-1881-235101, email:cs@iitrpr.ac.in", pageWidth / 2, 28, { align: "center" });
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
      
      const columns = [["Topic", "Start Date", "End Date","Country"]];
      const filteredData = data.filter(item => item.faculty_name === email);
  
  const rows = filteredData.map(user=>[user.topic,user.start_date,user.end_date,user.country]);
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
   const filename = `${formattedDate}-ForeignVisits.pdf`;
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
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={uploadbulk} >Upload Data in Bulk</button>
          </div>
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