import React, {useEffect,useState} from 'react';
import Sidebar from '../components/Sidebar'
import {st_home} from '../services/Apis';
import MultilineTextFields from '../components/Inputs/Text'
import InputableList from '../components/Inputs/List';
import FormDialog from '../components/Inputs/Prompt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons';

function FtyProfile() {

  

    //const [data, setData] = useState(null);
    const [stData, setData] = useState([0]);
    const [prompt, setShowPrompt] = useState(false);
    
    //const [link, setLink] = useState("");
    
    var email = localStorage.getItem('email');
    //console.log(email);
    

    const editLink = async (e) => {
      e.preventDefault();
      setShowPrompt(true);
    }
    const handlePromptClose = (upDatedLinkText) => {
      setShowPrompt(false);
      
      if (upDatedLinkText !== 'cancel') {
        setData((prevState) => {
          const updatedData = [...prevState]; // Create a copy of the array
          updatedData[7] = upDatedLinkText; // Modify the desired element
          return updatedData; // Set the updated array using setData
        });
      }
      

    };
    

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



    return (
        <>
        {
               prompt && <FormDialog handleClose={handlePromptClose} linkText={stData[7]} emailID={email}/>
        }
            
            <Sidebar student_name = {email}/>\           
    <div className="bg-gradient-to-r from-white to-gray-100">
  <div className="max-w-7xl ml-40 mr-5 px-4 sm:px-6 lg:px-8">
    <div className="py-12">
      <div className="max-w-3xl ml-44 mr-5 space-y-8">
        <div className="text-center flex flex-col items-center">
          <img className="h-40 rounded-full border-4 border-white shadow-lg mb-4" src={process.env.PUBLIC_URL + '/images/stu.jpg'} alt="student" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900" style={{fontFamily: 'Bahnschrift, sans-serif'}}>{stData[6]}</h2>
          <p className="mt-1 text-lg text-gray-600">{email}</p>
          <p className="mt-1 text-lg text-gray-600">
            <a href={stData[7]} className="text-indigo-600 hover:text-indigo-500"> personal-web-link
            <span className='pl-5'>
              <button onClick={editLink}>
              <FontAwesomeIcon icon={faPenToSquare}/>
              </button>
            </span>
            </a>
           
          </p>
        </div>
              <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Student Statistics</h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="border-t-2 border-gray-300 pt-6 w-auto">
                    <dt className="text-base font-medium text-gray-500">Awards/Achievements</dt>
                    <dd className="mt-1 text-3xl font-extrabold text-gray-900">{stData[0]}</dd>
                  </div>
                  <div className="border-t-2 border-gray-300 pt-6 w-auto">
                    <dt className="text-base font-medium text-gray-500">Research Project</dt>
                    <dd className="mt-1 text-3xl font-extrabold text-gray-900">{stData[3]}</dd>
                  </div>
                  <div className="border-t-2 border-gray-300 pt-6 w-auto">
                    <dt className="text-base font-medium text-gray-500">Foreign Visits</dt>
                    <dd className="mt-1 text-3xl font-extrabold text-gray-900">{stData[2]}</dd>
                  </div>
                  <div className="border-t-2 border-gray-300 pt-6 w-auto">
                    <dt className="text-base font-medium text-gray-500">Patents/Publications</dt>
                    <dd className="mt-1 text-3xl font-extrabold text-gray-900">{stData[4]}</dd>
                  </div>
                  
                </dl>
              </div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">PhD Subjects</h3>
                <InputableList emailID = {email} list = {stData[8]}/>
                
              </div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Research Interests</h3>
                <MultilineTextFields msgType='Research' emailID = {email} message={stData[9]}/>
              </div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Educational Background</h3>
                <MultilineTextFields msgType='Education' emailID = {email} message = {stData[10]}/>
                              </div>
            </div>
          </div>
        </div>
      </div>
 




    </>


    );
 }

export default FtyProfile;