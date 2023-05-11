import { deptgetallinfo } from '../services/Apis'

import React, { useEffect, useState } from "react";


export const InfoToPrint = React.forwardRef(({ startDate, endDate }, ref) => {
  const Date1 = new Date(startDate);
  const Date2 = new Date(endDate);
  const email = "admin"

  const [data, setUserData] = useState([]);

  const getdeptinfo = async () => {

    const response = await deptgetallinfo();
    // window.location.reload();
    if (response.status === 200) {
      setUserData(response.data)
      console.log(data)
    } else {
      console.log("error for get user data")
    }
  };
  useEffect(() => {
    getdeptinfo();
    setTimeout(() => {
    }, 1200)
  }, []);
  const program = data.map((item) => item.programs_offered)
  const btech = data.map((item) => item.st_num_btech)
  const mtech = data.map((item) => item.st_num_mtech)
  const ms = data.map((item) => item.st_num_ms)
  const phd = data.map((item) => item.st_num_phd)
  const hod = data.map((item) => item.hod)
  const staff_postdoc = data.map((item) => item.staff_postdoc)
  const staff_tech = data.map((item) => item.staff_tech)
  const staff_admin = data.map((item) => item.staff_admin)
  const thrust = data.map((item) => item.thrust)
  return (
    <div ref={ref} class="border border-black p-3">
      <br></br>
      <div className="text-center text-2xl font-bold">
        INDIAN INSTITUTE OF TECHNOLOGY, ROPAR
      </div>
      <div className="text-center text-xl font-semibold">
        Rupnagar,Punjab
      </div>
      <div className="text-center text-xl font-semibold">
        Tele:+91-1881-242123, email:office-cse-1@iitrpr.ac.in
      </div>
      <hr className="w-4/5 border-black mx-auto align-center" />
      <div className="bg-indigo-100 text-center text-l font-semibold">
        DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
      </div>
      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">Programs offered</div>
        <div class="col-md-8">: {program}</div>
      </div>
      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">No. of Students</div>
        <div class="col-md-8">: B.Tech. :{btech}</div>
      </div>

      <div class="row">
        <div class="col-md-4 font-bold"></div>
        <div class="col-md-8">: M.Tech. :{mtech}</div>
      </div>

      <div class="row">
        <div class="col-md-4 font-weight-bold"></div>
        <div class="col-md-8">: MS (R). :{ms}</div>
      </div>

      <div class="row">
        <div class="col-md-4 font-weight-bold"></div>
        <div class="col-md-8">: PhD. :{phd}</div>
      </div>

      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">Head of the Department</div>
        <div class="col-md-8">: {hod}</div>
      </div>
      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">Number of Faculty Members</div>
        <div class="col-md-8">left</div>
      </div>
      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">Number of Staff Members</div>
        <div class="col-md-8">: Postdoc Fellow:{staff_postdoc}</div>
      </div>
      <div class="row">
        <div class="col-md-4 font-bold"></div>
        <div class="col-md-8">: Technical Staff :{staff_tech}</div>
      </div>
      <div class="row">
        <div class="col-md-4 font-bold"></div>
        <div class="col-md-8">: Administrative Staff :{staff_admin}</div>
      </div>
      <div class="row">
        <div class="col-md-4 font-bold">Thrust Area:</div>
      </div>
      <div class="col-md-8">{thrust}</div>
      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">No. Of Publications</div>
        <div class="col-md-8">left</div>
      </div>
      <br></br>
      <div class="row">
        <div class="col-md-4 font-bold">FACULTY MEMBERS </div>
        <div class="col-md-8">(Names should be in alphabetical order) (Attach photographs separately)
        </div>
      </div>
      <br></br>

      
      <div className="container">
      <div className="row">
        <div className="col-md-6 align-items-center justify-content-center">
          <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="example image" className="my-auto" />
        </div>
        <div className="col-md-6">
          <h2>Information</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            scelerisque turpis vitae nibh accumsan iaculis. Donec eleifend
            posuere felis, vel finibus velit eleifend ac. Integer scelerisque
            congue purus, eu rutrum ipsum pharetra quis.
          </p>
          <p>
            Mauris in lorem sit amet orci hendrerit tempus. Nullam tristique
            felis vel nisl maximus, non sagittis velit rhoncus. Aenean at
            sapien sapien. Morbi a odio vel magna dignissim convallis ac vitae
            enim.
          </p>
        </div>
      </div>
    </div>

    </div>
  );
});