// import React, { useState } from 'react';

// export const  Services = () => {
//   const [yearTerm, setYearTerm] = useState('');
//   const [percentage, setPercentage] = useState('');
//   const [status, setStatus] = useState('');
//   const [studentId, setStudentId] = useState('');
//   const [errors, setErrors] = useState({});

//   const handleServiceSubmit = (e) => {
//     e.preventDefault();
//     const errors = {};

//     if (!yearTerm.trim()) {
//       errors.yearTerm = 'Year term is required';
//     }

//     if (!percentage.trim()) {
//       errors.percentage = 'Percentage is required';
//     }

//     if (!status.trim()) {
//       errors.status = 'Status is required';
//     }

//     if (!studentId.trim()) {
//       errors.studentId = 'Student ID is required';
//     }

//     if (Object.keys(errors).length === 0) {
//       // You can perform further actions here like sending data to backend
//       console.log('Form submitted:', { yearTerm, percentage, status, studentId });

//       // Clearing input fields after successful submission
//       setYearTerm('');
//       setPercentage('');
//       setStatus('');
//       setStudentId('');
//     } else {
//       setErrors(errors);
//     }
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen py-12 px-4">
//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-3xl font-bold text-white mb-8 text-center">Progress Information</h2>
//         <form onSubmit={handleServiceSubmit} className="bg-gray-800 rounded-lg p-8 shadow-lg">
//           <div className="mb-4">
//             <label htmlFor="yearTerm" className="block text-white font-semibold mb-2">
//               Year Term
//             </label>
//             <input
//               type="text"
//               id="yearTerm"
//               value={yearTerm}
//               onChange={(e) => setYearTerm(e.target.value)}
//               className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                 errors.yearTerm ? 'border-red-500' : ''
//               }`}
//             />
//             {errors.yearTerm && <p className="text-red-500 text-xs italic">{errors.yearTerm}</p>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="percentage" className="block text-white font-semibold mb-2">
//               Percentage
//             </label>
//             <input
//               type="text"
//               id="percentage"
//               value={percentage}
//               onChange={(e) => setPercentage(e.target.value)}
//               className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                 errors.percentage ? 'border-red-500' : ''
//               }`}
//             />
//             {errors.percentage && <p className="text-red-500 text-xs italic">{errors.percentage}</p>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="status" className="block text-white font-semibold mb-2">
//               Status
//             </label>
//             <input
//               type="text"
//               id="status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                 errors.status ? 'border-red-500' : ''
//               }`}
//             />
//             {errors.status && <p className="text-red-500 text-xs italic">{errors.status}</p>}
//           </div>
//           <div className="mb-6">
//             <label htmlFor="studentId" className="block text-white font-semibold mb-2">
//               Student ID
//             </label>
//             <input
//               type="text"
//               id="studentId"
//               value={studentId}
//               onChange={(e) => setStudentId(e.target.value)}
//               className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                 errors.studentId ? 'border-red-500' : ''
//               }`}
//             />
//             {errors.studentId && <p className="text-red-500 text-xs italic">{errors.studentId}</p>}
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="submit"
//               className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
//             >
//               Submit
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setYearTerm('');
//                 setPercentage('');
//                 setStatus('');
//                 setStudentId('');
//               }}
//               className="flex items-center px-6 py-2 rounded-md bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors duration-300"
//             >
//               Clear
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";


export const Services = () => {
  const [yearTerm, setYearTerm] = useState('');
  const [percentage, setPercentage] = useState('');
  const [status, setStatus] = useState('');
  const [studentId, setStudentId] = useState('');
  const [errors, setErrors] = useState({});
  const [viewProgress, setViewProgress] = useState(false);
  const [progressData, setProgressData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query


  const handleServiceSubmit =async (e) => {
    e.preventDefault();
    const errors = {};
  
    // Validation logic for input fields
    // Example validation: Check if fields are not empty
  
    if (!yearTerm.trim()) {
      errors.yearTerm = 'Year term is required';
    }
  
    if (!percentage.trim()) {
      errors.percentage = 'Percentage is required';
    }
  
    if (!status.trim()) {
      errors.status = 'Status is required';
    }
  
    if (!studentId.trim()) {
      errors.studentId = 'Student ID is required';
    }
  
    if (Object.keys(errors).length === 0) {
      try {
        // Send POST request to the backend
        await axios.post('http://localhost:1337/progress', {
          year_term: yearTerm,
          percentage: percentage,
          status: status,
          student_id: studentId
        });
        window.alert(`Student progress details inserted successfully with studentID: ${studentId}`);
        
        // Clear input fields after successful submission
        setYearTerm('');
        setPercentage('');
        setStatus('');
        setStudentId('');
  
        // Optionally, you can display a success message or perform other actions after successful submission
      } catch (error) {
        console.error('Error submitting progress:', error);
        // Handle error (e.g., display error message to the user)
      }
    } else {
      setErrors(errors);
    }
  };
  const handleSearch = async() => {
    // Perform search logic here
    console.log("Search:", searchQuery);
    // try {
    //   const response = await axios.get(`http://localhost:1337/student/:${searchQuery}`);
    //   setStudents(response.data);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error('Error fetching student data:', error);
    // }
    console.log("Search:", searchQuery);
    try {
      const response = await axios.get(`http://localhost:1337/progress/:${searchQuery}`);
      setProgressData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleViewProgress = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/progress/${studentId}`);
      setProgressData(response.data);
      setViewProgress(true);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  const handleAddProgress = () => {
    setViewProgress(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {!viewProgress ? (
          <>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Progress Information</h2>
            <form onSubmit={handleServiceSubmit} className="bg-gray-800 rounded-lg p-8 shadow-lg">
              <div className="mb-4">
                <label htmlFor="yearTerm" className="block text-white font-semibold mb-2">
                  Year Term
                </label>
                <input
                  type="text"
                  id="yearTerm"
                  value={yearTerm}
                  onChange={(e) => setYearTerm(e.target.value)}
                  className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    errors.yearTerm ? 'border-red-500' : ''
                  }`}
                />
                {errors.yearTerm && <p className="text-red-500 text-xs italic">{errors.yearTerm}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="percentage" className="block text-white font-semibold mb-2">
                  Percentage
                </label>
                <input
                  type="text"
                  id="percentage"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    errors.percentage ? 'border-red-500' : ''
                  }`}
                />
                {errors.percentage && <p className="text-red-500 text-xs italic">{errors.percentage}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-white font-semibold mb-2">
                  Status
                </label>
                <input
                  type="text"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    errors.status ? 'border-red-500' : ''
                  }`}
                />
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
                  className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    errors.studentId ? 'border-red-500' : ''
                  }`}
                />
                {errors.studentId && <p className="text-red-500 text-xs italic">{errors.studentId}</p>}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setYearTerm('');
                    setPercentage('');
                    setStatus('');
                    setStudentId('');
                  }}
                  className="flex items-center px-6 py-2 rounded-md bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors duration-300"
                >
                  Clear
                </button>
              </div>
            </form>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleViewProgress}
                className="flex items-center px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                View Progress
              </button>
            </div>
          </>
        ) : (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Progress Data</h3>
            <div className="flex items-center mb-4">
              {/* Search bar */}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
      <th className="px-4 py-2 text-white text-left">Student ID</th>
      <th className="px-4 py-2 text-white text-left">Year Term</th>
      <th className="px-4 py-2 text-white text-left">Percentage</th>
      <th className="px-4 py-2 text-white text-left">Status</th>
    </tr>
  </thead>
  <tbody>
    {progressData.map((progress, index) => (
      <tr key={index} className="border-b border-gray-700">
        <td className="px-4 py-2 text-white">{progress.student_id}</td>
        <td className="px-4 py-2 text-white">{progress.year_term}</td>
        <td className="px-4 py-2 text-white">{progress.percentage}</td>
        <td className="px-4 py-2 text-white">{progress.status}</td>
      </tr>
    ))}
  </tbody>
</table>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddProgress}
                className="flex items-center px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Add Progress
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


