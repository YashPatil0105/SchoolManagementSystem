
// import React, { useState, useEffect } from "react";
// import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
// import axios from 'axios';

// export const About = () => {
//   const [parentName,setParentName]=useState("");
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [phone, setPhone] = useState("");
//   const [classValue, setClassValue] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [mode, setMode] = useState(""); // State to track mode: "create" or "view"
//   const [searchQuery, setSearchQuery] = useState(""); // State to store search query

//   useEffect(() => {
//     // Fetch student data from API
//     axios.get('http://localhost:1337/student')
//       .then(response => {
//         setStudents(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching student data:', error);
//       });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       // Update student logic
//       console.log("Update student:", { name, dob, phone, classValue });
//       setIsEditing(false);
//     } else {
//       // Create student logic
//       try {
//         const response = await axios.post('http://localhost:1337/student', {
//           name,
//           DOB: dob, // Assuming dob is the variable name corresponding to date of birth
//           phone,
//           studentClass: classValue, // Assuming classValue corresponds to the student's class
//           parent_name: parentName, // Assuming parentName corresponds to the parent's name
//           // Assuming parentPhone corresponds to the parent's phone number
//         });
//         console.log(dob);
//         const studentID=response.data.studentId;
//         console.log(studentID); // This will log the response from the server
//         window.alert(`Student details inserted successfully with studentID: ${studentID}`);
//       } catch (error) {
//         console.error(error); // Log any errors that occur during the request
//       }
//     }
//   };

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:1337/student');
//       setStudents(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching student data:', error);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleDelete = async (studentId) => {
//     try {
//       await axios.delete(`http://localhost:1337/student/${studentId}`);
//       // If the request is successful, remove the student from the state
//       setStudents(prevStudents => prevStudents.filter(student => student.student_id !== studentId));
//       console.log("Student deleted successfully");
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       // Handle errors accordingly, show error message to the user, etc.
//     }
//   };

//   const switchMode = (newMode) => {
//     setMode(newMode);
//     setIsEditing(false); // Reset editing mode when switching modes
//   };

//   const handleSearch = async() => {
//     // Perform search logic here
//     console.log("Search:", searchQuery);
//     try {
//       const response = await axios.get(`http://localhost:1337/student/:${searchQuery}`);
//       setStudents(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching student data:', error);
//     }
//   };
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     let month = date.getMonth() + 1;
//     if (month < 10) {
//       month = `0${month}`; // Add leading zero if month is less than 10
//     }
//     let day = date.getDate();
//     if (day < 10) {
//       day = `0${day}`; // Add leading zero if day is less than 10
//     }
//     return `${year}-${month}-${day}`;
//   }

//   return (
//     <div className="bg-gray-900 min-h-screen py-12 px-4">
//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-3xl font-bold text-white mb-8 text-center">
//           {mode === "create" ? "Create Student" : "View All Student"}
//         </h2>
//         {mode === "create" && (
//           <form
//             onSubmit={handleSubmit}
//             className="bg-gray-800 rounded-lg p-8 shadow-lg"
//           >
//             <div className="mb-4">
//               <label
//                 htmlFor="name"
//                 className="block text-white font-semibold mb-2"
//               >
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                 placeholder="Enter student name"
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="parent_name"
//                 className="block text-white font-semibold mb-2"
//               >
//                 Parent Name
//               </label>
//               <input
//                 type="text"
//                 id="parent_name"
//                 value={parentName}
//                 onChange={(e) => setParentName(e.target.value)}
//                 className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                 placeholder="Enter parent name"
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="dob"
//                 className="block text-white font-semibold mb-2"
//               >
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 id="dob"
//                 value={dob}
//                 onChange={(e) => setDob(e.target.value)}
//                 className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="phone"
//                 className="block text-white font-semibold mb-2"
//               >
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 id="phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                 placeholder="Enter phone number"
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 htmlFor="class"
//                 className="block text-white font-semibold mb-2"
//               >
//                 Class
//               </label>
//               <select
//                 id="class"
//                 value={classValue}
//                 onChange={(e) => setClassValue(e.target.value)}
//                 className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//               >
//                 <option value="">Select Class</option>
//                 <option value="1">Class 1</option>
//                 <option value="2">Class 2</option>
//                 <option value="3">Class 3</option>
//               </select>
//             </div>
//             <div className="flex justify-end space-x-4">
//               <button
//                 type="submit"
//                 className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
//               >
//                 <FaPlus className="mr-2" />
//                 {isEditing ? "Update" : "Create"}
//               </button>
//               {!isEditing && (
//                 <>
//                   <button
//                     type="button"
//                     onClick={handleEdit}
//                     className="flex items-center px-6 py-2 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300"
//                   >
//                     <FaEdit className="mr-2" />
//                     Edit
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleDelete}
//                     className="flex items-center px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300"
//                   >
//                     <FaTrash className="mr-2" />
//                     Delete
//                   </button>
//                 </>
//               )}
//             </div>
//           </form>
//         )}
//         {mode === "view" && (
//           <div>
//             <div className="flex items-center mb-4">
//               {/* Search bar */}
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//               />
//               {/* Search button */}
//               <button
//                 onClick={handleSearch}
//                 className="flex items-center px-4 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300 ml-2"
//               >
//                 <FaSearch />
//               </button>
//             </div>
//             <table className="w-full table-auto bg-gray-800 rounded-lg shadow-lg">
//               <thead>
//                 <tr className="bg-gray-700">
//                   <th className="px-4 py-2 text-white">ID</th>
//                   <th className="px-4 py-2 text-white">Name</th>
//                   <th className="px-4 py-2 text-white">Parent Name</th>
//                   <th className="px-4 py-2 text-white">Date of Birth</th>
//                   <th className="px-4 py-2 text-white">Phone</th>
//                   <th className="px-4 py-2 text-white">Class</th>
//                   <th className="px-4 py-2 text-white">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map(student => (
//                   <tr key={student.id} className="border-b border-gray-700">
//                     <td className="px-4 py-2 text-white">{student.student_id}</td>
//                     <td className="px-4 py-2 text-white">{student.name}</td>
//                     <td className="px-4 py-2 text-white">{student.parent_name}</td>
//                     <td className="px-4 py-2 text-white">{formatDate(student.DOB)}</td>
//                     <td className="px-4 py-2 text-white">{student.phone}</td>
//                     <td className="px-4 py-2 text-white">{student.class}</td>
//                     <td className="px-4 py-2 text-white">
//                       <button
//                         onClick={() => handleEdit(student)}
//                         className="flex items-center px-3 py-1 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300 mr-2"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(student.student_id)}
//                         className="flex items-center px-3 py-1 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         <div className="flex justify-end space-x-4 mt-4">
//           <button
//             onClick={() => switchMode("create")}
//             className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
//           >
//             <FaPlus className="mr-2" />
//             Create Student
//           </button>
//           <button
//   onClick={() => {
//     switchMode("view");
//     fetchStudents(); // Call fetchStudents when switching to "view" mode
//   }}
//   className="flex items-center px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
// >
//   View All Student
// </button>

//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axios from 'axios';

export const About = () => {
  const [parentName,setParentName]=useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [classValue, setClassValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [students, setStudents] = useState([]);
  const [mode, setMode] = useState("create"); // Default mode is "create"
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  useEffect(() => {
    // Fetch student data from API
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:1337/student');
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update student logic
      console.log("Update student:", { name, dob, phone, classValue });
      setIsEditing(false);
    } else {
      // Create student logic
      try {
        const response = await axios.post('http://localhost:1337/student', {
          name,
          DOB: dob, // Assuming dob is the variable name corresponding to date of birth
          phone,
          studentClass: classValue, // Assuming classValue corresponds to the student's class
          parent_name: parentName, // Assuming parentName corresponds to the parent's name
          // Assuming parentPhone corresponds to the parent's phone number
        });
        console.log(dob);
        const studentID=response.data.studentId;
        console.log(studentID); // This will log the response from the server
        window.alert(`Student details inserted successfully with studentID: ${studentID}`);
      } catch (error) {
        console.error(error); // Log any errors that occur during the request
      }
    }
  };
  const handleClear = () => {
    setName("");
    setParentName("");
    setDob("");
    setPhone("");
    setClassValue("");
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:1337/student/${studentId}`);
      // If the request is successful, remove the student from the state
      setStudents(prevStudents => prevStudents.filter(student => student.student_id !== studentId));
      console.log("Student deleted successfully");
    } catch (error) {
      console.error("Error deleting student:", error);
      // Handle errors accordingly, show error message to the user, etc.
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsEditing(false); // Reset editing mode when switching modes
  };

  const handleSearch = async() => {
    // Perform search logic here
    console.log("Search:", searchQuery);
    try {
      const response = await axios.get(`http://localhost:1337/student/:${searchQuery}`);
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
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
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {mode === "create" ? "Create Student" : "View All Student"}
        </h2>
        {mode === "create" && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 rounded-lg p-8 shadow-lg"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-white font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter student name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="parent_name"
                className="block text-white font-semibold mb-2"
              >
                Parent Name
              </label>
              <input
                type="text"
                id="parent_name"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter parent name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-white font-semibold mb-2"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-white  bg-gray-700font-semibold mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter phone number"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="class"
                className="block text-white font-semibold mb-2"
              >
                Class
              </label>
              <select
                id="class"
                value={classValue}
                onChange={(e) => setClassValue(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
              >
                <FaPlus className="mr-2" />
                {isEditing ? "Update" : "Create"}
              </button>
              {!isEditing && (
                <>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="flex items-center px-6 py-2 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex items-center px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300"
                  >
                    <FaTrash className="mr-2" />
                    Clear
                  </button>
                </>
              )}
            </div>
          </form>
        )}
        {mode === "view" && (
          <div>
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
                  <th className="px-4 py-2 text-white">ID</th>
                  <th className="px-4 py-2 text-white">Name</th>
                  <th className="px-4 py-2 text-white">Parent Name</th>
                  <th className="px-4 py-2 text-white">Date of Birth</th>
                  <th className="px-4 py-2 text-white">Phone</th>
                  <th className="px-4 py-2 text-white">Class</th>
                  <th className="px-4 py-2 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-white">{student.student_id}</td>
                    <td className="px-4 py-2 text-white">{student.name}</td>
                    <td className="px-4 py-2 text-white">{student.parent_name}</td>
                    <td className="px-4 py-2 text-white">{formatDate(student.DOB)}</td>
                    <td className="px-4 py-2 text-white">{student.phone}</td>
                    <td className="px-4 py-2 text-white">{student.class}</td>
                    <td className="px-4 py-2 text-white">
                      <button
                        onClick={() => handleEdit(student)}
                        className="flex items-center px-3 py-1 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.student_id)}
                        className="flex items-center px-3 py-1 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-end space-x-4 mt-4">
          {mode === "create" && (
            <button
              onClick={() => switchMode("view")}
              className="flex items-center px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              View All Student
            </button>
          )}
          {mode === "view" && (
            <button
              onClick={() => switchMode("create")}
              className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
            >
              <FaPlus className="mr-2" />
              Create Student
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

