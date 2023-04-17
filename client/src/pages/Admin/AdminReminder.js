import React, { useState } from "react";
import Sidebar from "../../components/AdminSidebar"; 
import { send_reminder } from "../../services/Apis";
import { useNavigate } from "react-router-dom";

const StaffReminder = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [sendToFaculty, setSendToFaculty] = useState(false);
  const [sendToStudents, setSendToStudents] = useState(false);

  const sendEmail = async () => {
    try {
      setLoading(true);

      const data = {
        emailSubject: emailSubject,
        emailContent: emailContent,
        sendToFaculty: sendToFaculty,
        sendToStudents: sendToStudents,
      };
      console.log(data);
      const response = await send_reminder({ data });
      setMessage(response.data.message);
      navigate('/StaffHome/StaffReminder');
    } catch (error) {
      setMessage("Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubjectChange = (event) => {
    setEmailSubject(event.target.value);
  };

  const handleEmailContentChange = (event) => {
    setEmailContent(event.target.value);
  };

  const handleSendToFacultyChange = (event) => {
    setSendToFaculty(event.target.checked);
  };

  const handleSendToStudentsChange = (event) => {
    setSendToStudents(event.target.checked);
  };

  return (
    <div className="flex h-screen">
  <Sidebar />

  <div className="flex-grow flex items-center justify-center">
    <div className="w-3/4 max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Send Notification</h1>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="emailSubject">
          Email Subject
        </label>
        <input
          className="border border-gray-400 p-2 rounded-md w-full"
          type="text"
          id="emailSubject"
          placeholder="Type email subject here"
          value={emailSubject}
          onChange={handleEmailSubjectChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="emailContent">
          Email Content
        </label>
        <textarea
          className="border border-gray-400 p-2 rounded-md w-full"
          rows={10}
          id="emailContent"
          placeholder="Type your email contents here"
          value={emailContent}
          onChange={handleEmailContentChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Send to</label>

        <div className="flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            id="sendToFaculty"
            checked={sendToFaculty}
            onChange={handleSendToFacultyChange}
          />
          <label className="mr-4" htmlFor="sendToFaculty">
            Faculty
          </label>

          <input
            className="mr-2"
            type="checkbox"
            id="sendToStudents"
            checked={sendToStudents}
            onChange={handleSendToStudentsChange}
          />
          <label htmlFor="sendToStudents">Students</label>
        </div>
      </div>

      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full w-full ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={sendEmail}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send email'}
      </button>

      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  </div>
</div>

  );
};

export default StaffReminder;