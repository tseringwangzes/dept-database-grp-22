import React, { useEffect, useState } from 'react';
import { ftDept } from '../services/Apis';

function FacDetails() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await ftDept();
        setDocuments(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Documents</h1>
      <ul>
        {documents.map((document) => (
          <li key={document._id} className="my-4">
            <div>
              <h2 className="text-xl font-semibold">{document.fname}</h2>
              <p className="text-blue-500">
                Weblink: <a href={document.webLink}>{document.webLink}</a>
              </p>
              <p className="text-gray-600">Email: {document.email_id}</p>
              <p className="text-gray-600">PhD: {document.phD}</p>
              <p className="text-gray-600">Research: {document.research}</p>
              <img
                src={document.image}
                alt={document.fname}
                className="w-32 h-32 mt-4"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacDetails;
