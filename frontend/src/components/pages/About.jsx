
// import React, { useState, useEffect } from "react";
// import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
// import axios from 'axios';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';


// export const About = () => {
//   const [parentName,setParentName]=useState("");
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [phone, setPhone] = useState("");
//   const [classValue, setClassValue] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [studentId, setStudentId] = useState([]);
//   const [mode, setMode] = useState("create"); // Default mode is "create"
//   const [searchQuery, setSearchQuery] = useState(""); // State to store search query

//   useEffect(() => {
//     // Fetch student data from API
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:1337/student');
//       setStudents(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching student data:', error);
//     }
//   };

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
//   const handleClear = () => {
//     setName("");
//     setParentName("");
//     setDob("");
//     setPhone("");
//     setClassValue("");
//   };


//   const handleDelete = async (studentId) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete this student?");
//     if (!isConfirmed) {
//       // If user cancels deletion, return from the function
//       return;
//     }
  
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
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
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
//   const handleEdit = (student) => {
//     setIsEditing(true);
//     // Set the form fields with the details of the student to be edited
//     setStudentId(student.student_id)
//     setName(student.name);
//     setParentName(student.parent_name);
//     setDob(formatDate(student.DOB));
//     setPhone(student.phone);
//     setClassValue(student.class);
//     // Switch mode to "create" to display the form with populated data
//     switchMode("create");
//   };
//   const handleUpdate = async (student) => {
//     setIsEditing(true); // Set isEditing to true to switch to editing mode
  
//     // Perform update logic when user clicks "Update" button
//     const updatedData = {
//       name,
//       DOB: dob,
//       phone,
//       studentClass: classValue, // Adjusted key name to match the backend
//       parent_name: parentName,
//       // parent_phone: phone // Assuming you have a variable for parent's phone number
//     };
//     console.log("Updated data:", updatedData);
    
  
//     // Compare the updatedData with the student data to detect changes
//     const hasChanged = Object.keys(updatedData).some(key => updatedData[key] !== student[key]);
  
//     if (!hasChanged) {
//       window.alert("No changes detected.");
//       return;
//     }
  
//     try {
//       const response = await axios.put(`http://localhost:1337/student/${studentId}`, updatedData);
//       console.log(response.data);
//       window.alert("Student details updated successfully");
//       setIsEditing(false); // Reset editing mode
//       fetchStudents(); // Fetch updated student data
//     } catch (error) {
//       console.error("Error updating student details:", error);
//       window.alert("Failed to update student details. Please try again.");
//     }
//   };

//   const Analysis = () => {
//     const generatePDF = () => {
//       const input = document.getElementById('reportContent');
  
//       html2canvas(input)
//         .then((canvas) => {
//           const pdf = new jsPDF('p', 'mm', 'a4');
//           pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
//           pdf.save('report.pdf');
//         });
//     };
  
//     // Call generatePDF function when Analyse button is clicked
//     generatePDF();
//   };
   
  
//   return (
//     <div className="bg-gray-900 min-h-screen py-12 px-4">
//       <div className="max-w-6xl mx-auto">
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
//                 className="block text-white  bg-gray-700font-semibold mb-2"
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
//                     onClick={handleUpdate}
//                     className="flex items-center px-6 py-2 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300"
//                   >
//                     <FaEdit className="mr-2" />
//                     Update
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleClear}
//                     className="flex items-center px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300"
//                   >
//                     <FaTrash className="mr-2" />
//                     Clear
//                   </button>
//                 </>
//               )}
//             </div>
//           </form>
//         )}
//         {mode === "view" && (
//           <div>
//              <button
//               onClick={Analysis}
//               className="flex items-center px-6 py-2 mb-4 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
//             >
//               Analyse
//             </button>
//             <div className="flex items-center mb-4">
//               {/* Search bar */}
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={handleKeyDown}
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
//                   <th className="px-4 py-2 text-white">DOB</th>
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
//                     <td className="px-4 py-2 text-white flex">
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
//           {mode === "create" && (
//             <button
//               onClick={() => switchMode("view")}
//               className="flex items-center px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
//             >
//               View All Student
//             </button>
//           )}
//           {mode === "view" && (
//             <button
//               onClick={() => switchMode("create")}
//               className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
//             >
//               <FaPlus className="mr-2" />
//               Create Student
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Modal from 'react-modal';
import { Document, Page, Text, View, StyleSheet,PDFViewer,PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 40,
  },
  section: {
    marginBottom: 10,
  },
  titleContainer: {
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // Tailwind-like utility classes
    // You can define these styles based on Tailwind classes
    color: '#800000',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    // Tailwind-like utility classes
    // You can define these styles based on Tailwind classes
    color: '#6B7280',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    // Tailwind-like utility classes
    // You can define these styles based on Tailwind classes
    color: '#4B5563',
  },
});


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const PDFReport = ({ students }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Student Report</Text>
          </View>
        </View>
        {students && students.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Students:</Text>
            {students.map(student => (
              <View key={student.student_id} style={styles.text}>
                <Text>Name: {student.name}</Text>
                <Text>Parent Name: {student.parent_name}</Text>
                <Text>Date of Birth: {formatDate(student.DOB)}</Text>
                <Text>Phone: {student.phone}</Text>
                <Text>Class: {student.class}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text>No students found.</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export const About = () => {
  const [parentName, setParentName] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [classValue, setClassValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState([]);
  const [mode, setMode] = useState("create"); // Default mode is "create"
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [showModal, setShowModal] = useState(false); // State for modal visibility

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
        const studentID = response.data.studentId;
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

  const handleDelete = async (studentId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this student?");
    if (!isConfirmed) {
      // If user cancels deletion, return from the function
      return;
    }

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

  const handleSearch = async () => {
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
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

  const handleEdit = (student) => {
    setIsEditing(true);
    // Set the form fields with the details of the student to be edited
    setStudentId(student.student_id)
    setName(student.name);
    setParentName(student.parent_name);
    setDob(formatDate(student.DOB));
    setPhone(student.phone);
    setClassValue(student.class);
    // Switch mode to "create" to display the form with populated data
    switchMode("create");
  };

  const handleUpdate = async (student) => {
    setIsEditing(true); // Set isEditing to true to switch to editing mode

    // Perform update logic when user clicks "Update" button
    const updatedData = {
      name,
      DOB: dob,
      phone,
      studentClass: classValue, // Adjusted key name to match the backend
      parent_name: parentName,
      // parent_phone: phone // Assuming you have a variable for parent's phone number
    };
    console.log("Updated data:", updatedData);

    // Compare the updatedData with the student data to detect changes
    const hasChanged = Object.keys(updatedData).some(key => updatedData[key] !== student[key]);

    if (!hasChanged) {
      window.alert("No changes detected.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:1337/student/${studentId}`, updatedData);
      console.log(response.data);
      window.alert("Student details updated successfully");
      setIsEditing(false); // Reset editing mode
      fetchStudents(); // Fetch updated student data
    } catch (error) {
      console.error("Error updating student details:", error);
      window.alert("Failed to update student details. Please try again.");
    }
  };

  const generatePDF = () => {
    const input = document.getElementById('reportContent');

    if (input) {
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save('report.pdf');
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
          // window.alert('Failed to generate PDF. Please try again.');
        });
    } else {
      console.error('Element with ID "reportContent" not found in the DOM.');
      window.alert('Failed to generate PDF. Please try again.');
    }
  };

    // Open
    const Analysis = async () => {
      // Fetch the latest student data before generating the PDF
      await fetchStudents();
  
      // Open the modal when Analyse button is clicked
      setShowModal(true);
      generatePDF();
    };
    
    
    
    const closeModal = () => {
      setShowModal(false);
    };
    
    return (
      <div className="bg-gray-900 min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
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
                      onClick={handleUpdate}
                      className="flex items-center px-6 py-2 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300"
                    >
                      <FaEdit className="mr-2" />
                      Update
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
              <button
                onClick={Analysis}
                className="flex items-center px-6 py-2 mb-4 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Analyse
              </button>

              {/* Modal */}
              <div id="reportContent">
                <Modal
                  isOpen={showModal}
                  onRequestClose={closeModal}
                  contentLabel="PDF Report"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {students && ( // Add null check here
                      <PDFViewer style={{ width: "100%", height: "75vh" }}>
                        <PDFReport students={students} />
                      </PDFViewer>
                    )}
                    <div style={{ marginTop: "1rem" }}>
                      <PDFDownloadLink
                        document={<PDFReport students={students} />}
                        fileName="report.pdf"
                      >
                        {({ blob, url, loading, error }) =>
                            <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                      >
                        {loading ? "Loading..." : "Download PDF"}
                      </button>
                        }
                      </PDFDownloadLink>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>

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
                    <th className="px-4 py-2 text-white">ID</th>
                    <th className="px-4 py-2 text-white">Name</th>
                    <th className="px-4 py-2 text-white">Parent Name</th>
                    <th className="px-4 py-2 text-white">DOB</th>
                    <th className="px-4 py-2 text-white">Phone</th>
                    <th className="px-4 py-2 text-white">Class</th>
                    <th className="px-4 py-2 text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-gray-700">
                      <td className="px-4 py-2 text-white">
                        {student.student_id}
                      </td>
                      <td className="px-4 py-2 text-white">{student.name}</td>
                      <td className="px-4 py-2 text-white">
                        {student.parent_name}
                      </td>
                      <td className="px-4 py-2 text-white">
                        {formatDate(student.DOB)}
                      </td>
                      <td className="px-4 py-2 text-white">{student.phone}</td>
                      <td className="px-4 py-2 text-white">{student.class}</td>
                      <td className="px-4 py-2 text-white flex">
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