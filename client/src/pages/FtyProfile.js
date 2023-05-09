import React, {useEffect,useState} from 'react';
import FtySidebar from "../components/FtySidebar";
import {ft_home} from '../services/Apis';

function FtyProfile() {

  

    //const [data, setData] = useState(null);
    const [ftData, setData] = useState([]);
    var email = localStorage.getItem('email');
    console.log(email);
    //console.log('hllo');

    

    useEffect(() => {
      const fetchData = async (e) => {
        try {
          
          const response = await ft_home(email);
          
          setData(response.data)
          console.log(response.data);
          //console.log(ftData);
          console.log('react');
        } catch (error) {
          console.error(error);
        }
      };
      if (email) {
        fetchData();
      }
      fetchData();
    }, [email]);

    return (
        <>

            
            <FtySidebar faculty_name = {email}/>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
          <img className="mx-auto h-40 rounded-sm" src={process.env.PUBLIC_URL + '/images/image-1.png'} alt="student"/>

            <h2 className="mt-4 text-2xl font-extrabold text-gray-900">{ftData[6]}</h2>
            <p className="mt-1 text-lg text-gray-600">{email}</p>
            <p className="mt-1 text-lg text-gray-600">
              <a href="https://johndoe.com" className="text-indigo-600 hover:text-indigo-500">personal-web.com</a>
            </p>
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Faculty Statistics</h3>
            <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="border-t-2 border-gray-100 pt-6">
                <dt className="text-base font-medium text-gray-500">Number of Awards</dt>
                <dd className="mt-1 text-3xl font-extrabold text-gray-900">{ftData[0]}</dd>
              </div>
              <div className="border-t-2 border-gray-100 pt-6">
                <dt className="text-base font-medium text-gray-500">Project Grants</dt>
                <dd className="mt-1 text-3xl font-extrabold text-gray-900">{ftData[3]}</dd>
              </div>
              <div className="border-t-2 border-gray-100 pt-6">
                <dt className="text-base font-medium text-gray-500">Achievements</dt>
                <dd className="mt-1 text-3xl font-extrabold text-gray-900">{ftData[1]}</dd>
              </div>
              <div className="border-t-2 border-gray-100 pt-6">
                <dt className="text-base font-medium text-gray-500">Foreign Visits</dt>
                <dd className="mt-1 text-3xl font-extrabold text-gray-900">{ftData[2]}</dd>
              </div>
              <div className="border-t-2 border-gray-100 pt-6">
                <dt className="text-base font-medium text-gray-500">Patents/Publications</dt>
                <dd className="mt-1 text-3xl font-extrabold text-gray-900">{ftData[4]}</dd>
              </div>
              <div className="border-t-2 border-gray-100 pt-6">
                <dt className="text-base font-medium text-gray-500">Seminars</dt>
                <dd className="mt-1 text-3xl font-extrabold text-gray-900">{ftData[5]}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">PhD Students</h3>
            <ul className="mt-2 list-disc pl-5">
              <li className="text-base text-gray-500">Syudent 1</li>
              <li className="text-base text-gray-500">Student 2</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Research Interests</h3>
            <p className="mt-2 text-base text-gray-500">Sun Breathing is considered to be the originator of all breathing techniques, which is perhaps why it's one of the most powerful breathing techniques around. 
            This breathing style is part of the Kamado family's legacy and is taught from generation to generation, with the father teaching the move to their son.</p>
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">PhD Education</h3>
            <p className="mt-2 text-base text-gray-500">PhD (Doctor of Philosophy) in Education is the highest degree that an individual can obtain in education. An academic doctoral course can be pursued by an individual who has completed his/ her 
            master's degree like MA/ MSc/ MEd/ MPhil/ others in a relevant field from a government-recognized university.</p>
          </div>
        </div>
      </div>
    </div>
    </>
    );
}

export default FtyProfile;