
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import axios from 'axios';

export const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [studentId, setStudentId] = useState('');
  const [editingAttendanceId, setEditingAttendanceId] = useState(null);
  const [errors, setErrors] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [selectType,setSelectType]=useState("date");
  
  const handleSelectChange=(e)=>{
    setSelectType(e.target.value==='date'?'date':'id')
  }


  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:1337/daily_attendence');
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };


  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
  
    if (!date) {
      errors.date = 'Date is required';
    }
  
    if (!status) {
      errors.status = 'Status is required';
    }
  
    if (!studentId) {
      errors.studentId = 'Student ID is required';
    }
  
    if (Object.keys(errors).length === 0) {
      try {
        if (editingAttendanceId) {
          // Logic to update existing attendance record
          const response = await axios.put(`http://localhost:1337/daily_attendence/${editingAttendanceId}`, {
            date,
            status,
            student_id: studentId
          });
          console.log(response.data);
          window.alert(`Attendance record updated successfully for studentID: ${studentId}`);
        } else {
          // Logic to create a new attendance record
          const response = await axios.post('http://localhost:1337/daily_attendence', {
            date,
            status,
            student_id: studentId
          });
          
          console.log(date, status, studentId);
          window.alert(`Student attendance inserted successfully with studentID: ${studentId}`);
        }
  
        setDate('');
        setStatus('');
        setStudentId('');
        setEditingAttendanceId(null);
      } catch (error) {
        console.error('Error submitting attendance:', error);
        if (error.response && error.response.data && error.response.data.error) {
          // If server returns an error message
          window.alert(error.response.data.error);
        } else {
          // If an unexpected error occurs
          window.alert('An unexpected error occurred. Please try again later.');
        }
      }
    } else {
      setErrors(errors);
    }
  };
  

  const handleEdit = (record) => {
    setDate(formatDate(record.date));
    setStatus(record.status);
    setStudentId(record.student_id);
    setEditingAttendanceId(record.attendence_id);
    setShowTable(false); // Set showTable state to false to switch to the form
  };
  
  const handleDelete = (id) => {
    const updatedAttendance = attendance.filter((record) => record.id !== id);
    setAttendance(updatedAttendance);
  };

  const handleSearch = async () => {
    // Perform search logic here
    const student_id=studentId;
    console.log("Search:", searchQuery);
    try {
      const response = await axios.get(`http://localhost:1337/daily_attendence/:${searchQuery}`);
      setAttendance(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const toggleView = () => {
    setShowTable(!showTable);
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
      <div className="max-w-3xl mx-auto">
        {/* Existing form for submitting attendance */}
        {!showTable && (
          <form onSubmit={handleAttendanceSubmit} className="bg-gray-800 rounded-lg p-8 mb-4 shadow-lg">
            <div className="mb-4">
              <label htmlFor="date" className="block text-white font-semibold mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.date ? 'border-red-500' : ''
                  }`}
              />
              {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-white font-semibold mb-2">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.status ? 'border-red-500' : ''
                  }`}
              >
                <option value="">Select Status</option>
                <option value="P">Present</option>
                <option value="A">Absent</option>
              </select>
              {errors.status && <p className="text-red-500 text-xs italic">{errors.status}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="studentId" className="block text-white font-semibold mb-2">
                Student ID
              </label>
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.studentId ? 'border-red-500' : ''
                  }`}
              />
              {errors.studentId && <p className="text-red-500 text-xs italic">{errors.studentId}</p>}
            </div>
            <div className="flex justify-end space-x-4">
            <button
  type="submit"
  className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
>
  <FaPlus className="mr-2" />
  {editingAttendanceId ? 'Update' : 'Submit'}
</button>

              <button
                type="button"
                onClick={() => {
                  setDate('');
                  setStatus('');
                  setStudentId('');
                  setEditingAttendanceId(null);
                }}
                className="flex items-center px-6 py-2 rounded-md bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors duration-300"
              >
                Clear
              </button>
            </div>
          </form>
        )}
        {/* "View All Attendance" button */}

        {/* Table to display attendance records */}
        {showTable && (

          <div className="mt-8">
            <h1 className="text-2xl font-bold text-white mb-4 text-center">Attendance Records</h1>
            <div className="flex items-center mb-4">
              {/* Search bar */}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              {/* Search button */}

              <button
                onClick={handleSearch}
                className="flex items-center px-4 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300 ml-2"
              >
                <FaSearch />
              </button>
            </div>
            <table className="w-full table-auto bg-gray-800 rounded-lg shadow-lg">
  <thead>
    <tr className="bg-gray-700">
      <th className="px-4 py-2 text-white text-left">Date</th>
      <th className="px-4 py-2 text-white text-left">Status</th>
      <th className="px-4 py-2 text-white text-left">Student ID</th>
      <th className="px-4 py-2 text-white text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {attendance.map((record) => (
      <tr key={record.id} className="border-b border-gray-700">
        <td className="px-4 py-2 text-white">{formatDate(record.date)}</td>
        <td className="px-4 py-2 text-white">{record.status}</td>
        <td className="px-4 py-2 text-white">{record.student_id}</td>
        <td className="px-4 py-2 text-white">
          <button
            onClick={() => handleEdit(record)}
            className="flex items-center px-3 py-1 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300 mr-2"
          >
            <FaEdit className="mr-1" />
            Edit
          </button>
          {/* <button
            onClick={() => handleDelete(record.id)}
            className="flex items-center px-3 py-1 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300"
          >
            <FaTrash className="mr-1" />
            Delete
          </button> */}
        </td>
      </tr>
    ))}
  </tbody>
</table>

          </div>
        )}
        <button
          onClick={toggleView}
          className="flex items-center px-6  py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300 mb-4 mt-4"
        >
          {showTable ? 'Add Attendance' : 'View  Attendance'}
        </button>
      </div>
    </div>
  );
};
