import React, { useState, useEffect } from 'react';
import { st_home_post, ft_home_post } from '../../services/Apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';


const MultilineTextField = (props) => {
  const [editing, setEditing] = useState(false);
  const [textValue, setTextValue] = useState('');
  var res

  useEffect(() => {
    setTextValue(props.message || 'Enter Text Here');
  }, [props.message]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSubmit = async () => {
    const myData = {
      email: props.emailID,
      msg: textValue,
      type: props.msgType
    };

    // Perform the submission using st_home_post or any other method
    if (props.userType === 'F') {
      res= await ft_home_post(myData);
    } else {
      res = await st_home_post(myData);

    }
   
    // Reset editing state and clear the textarea value after submitting
    setEditing(false);
    //setTextValue('');

    // Handle the response or show a toast notification
    if (res.status === 200) {
      console.log('Submission successful');
      toast.success('Data Has Been Updated')
    } else {
      console.error('Error submitting the data');
    }
  };

  const handleInputChange = (e) => {
    setTextValue(e.target.value);
  };

  return (
    <>
    <ToastContainer/>
    <div className="flex flex-col">
      {editing ? (
        <div className="flex flex-col">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
            rows={4}
           
            value={textValue}
            onChange={handleInputChange}
          />
          <button
            className="mt-2 ml-auto bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
            rows={4}
            value={textValue}
            readOnly
          />
          <button
            className="mt-2 ml-auto bg-teal-500 hover:bg-teal-700 text-white rounded-lg px-4 py-2"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default MultilineTextField;

