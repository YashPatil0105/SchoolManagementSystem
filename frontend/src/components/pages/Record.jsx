import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Record = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:1337/attendence_record');
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`; // Add leading zero if month is less than 10
    }
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`; // Add leading zero if day is less than 10
    }
    return `${year}-${month}-${day}`;
  }
  return (
    <div className="bg-gray-900 min-h-screen  py-12 px-4">

    <div className="mt-8 max-w-3xl min-h-screen mx-auto">
      <h1 className="text-2xl font-bold text-white mb-4 text-center">Attendance Records</h1>
      <table className="w-full table-auto bg-gray-800 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-4 py-2 text-white text-left">Record ID</th>
            <th className="px-4 py-2 text-white text-left">Date</th>
            <th className="px-4 py-2 text-white text-left">Total Present</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record.record_id} className="border-b border-gray-700">
              <td className="px-4 py-2 text-white">{record.record_id}</td>
              <td className="px-4 py-2 text-white">{formatDate(record.date)}</td>
              <td className="px-4 py-2 text-white">{record.total_present}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};
