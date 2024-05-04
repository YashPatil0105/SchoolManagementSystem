// import React, { useState } from 'react';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import axios from 'axios';

// export const Contact = () => {
//   const [teacherId, setTeacherId] = useState('');
//   const [teacherName, setTeacherName] = useState('');
//   const [subject, setSubject] = useState('');
//   const [contactId, setContactId] = useState('');
//   const [teacherPhone, setTeacherPhone] = useState('');
//   const [teacherMail, setTeacherMail] = useState('');
//   const [isEditing, setIsEditing] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       // Update teacher logic
//       console.log('Update teacher:', { teacherId, teacherName, subject, contactId, teacherPhone, teacherMail });
//     } else {
//       // Create teacher logic
//       console.log('Create teacher:', { teacherId, teacherName, subject, contactId, teacherPhone, teacherMail });
//       try {
//         const response = await axios.post('http://localhost:1337/teacher', {
//           teacher_name: teacherName,
//           subject, // Assuming dob is the variable name corresponding to date of birth
//           teacher_phone: teacherPhone,
//           teacher_mail: teacherMail // Assuming classValue corresponds to the student's class
//           // Assuming parentName corresponds to the parent's name
//           // Assuming parentPhone corresponds to the parent's phone number
//         });
//         // console.log("pre response");
//         const teacherID = response.data.teacherId;
//         console.log(teacherID); // This will log the response from the server
//         window.alert(`Teacher details inserted successfully with teacherID: ${teacherID}`);
//       } catch (error) {
//         // console.log("error");
//         console.error(error); // Log any errors that occur during the request
//       }
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleDelete = () => {
//     // Delete teacher logic
//     console.log('Delete teacher');
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen py-12 px-4">
//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-3xl font-bold text-white mb-8 text-center">Teacher Form</h2>
//         <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 shadow-lg">
//           {/* <div className="mb-4">
//             <label htmlFor="teacherId" className="block text-white font-semibold mb-2">
//               Teacher ID
//             </label>
//             <input
//               type="text"
//               id="teacherId"
//               value={teacherId}
//               onChange={(e) => setTeacherId(e.target.value)}
//               className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//               placeholder="Enter teacher ID"
//             />
//           </div> */}
//           <div className="mb-4">
//             <label htmlFor="teacherName" className="block text-white font-semibold mb-2">
//               Teacher Name
//             </label>
//             <input
//               type="text"
//               id="teacherName"
//               value={teacherName}
//               onChange={(e) => setTeacherName(e.target.value)}
//               className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//               placeholder="Enter teacher name"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="subject" className="block text-white font-semibold mb-2">
//               Subject
//             </label>
//             <input
//               type="text"
//               id="subject"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//               placeholder="Enter subject"
//             />
//           </div>
//           {/* <div className="mb-4">
//             <label htmlFor="contactId" className="block text-white font-semibold mb-2">
//               Contact ID
//             </label>
//             <input
//               type="text"
//               id="contactId"
//               value={contactId}
//               onChange={(e) => setContactId(e.target.value)}
//               className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//               placeholder="Enter contact ID"
//             />
//           </div> */}
//           <div className="mb-4">
//             <label htmlFor="teacherPhone" className="block text-white font-semibold mb-2">
//               Teacher Phone
//             </label>
//             <input
//               type="tel"
//               id="teacherPhone"
//               value={teacherPhone}
//               onChange={(e) => setTeacherPhone(e.target.value)}
//               className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//               placeholder="Enter teacher phone"
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="teacherMail" className="block text-white font-semibold mb-2">
//               Teacher Email
//             </label>
//             <input
//               type="email"
//               id="teacherMail"
//               value={teacherMail}
//               onChange={(e) => setTeacherMail(e.target.value)}
//               className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//               placeholder="Enter teacher email"
//             />
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="submit"
//               className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
//             >
//               <FaPlus className="mr-2" />
//               {isEditing ? 'Update' : 'Create'}
//             </button>
//             {!isEditing && (
//               <>
//                 <button
//                   type="button"
//                   onClick={handleEdit}
//                   className="flex items-center px-6 py-2 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300"
//                 >
//                   <FaEdit className="mr-2" />
//                   Edit
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleDelete}
//                   className="flex items-center px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300"
//                 >
//                   <FaTrash className="mr-2" />
//                   Delete
//                 </button>
//               </>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash,FaSearch } from 'react-icons/fa';
import axios from 'axios';

export const Contact = () => {
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('');
  const [teacherMail, setTeacherMail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [mode, setMode] = useState('');
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  useEffect(() => {
    // Fetch teacher data from API
    axios.get('http://localhost:1337/teachers')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error('Error fetching teacher data:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update teacher logic
      console.log('Update teacher:', { teacherName, subject, teacherPhone, teacherMail });
      setIsEditing(false);
    } else {
      // Create teacher logic
      console.log('Create teacher:', { teacherName, subject, teacherPhone, teacherMail });
      try {
        const response = await axios.post('http://localhost:1337/teacher', {
          teacher_name: teacherName,
          subject,
          teacher_phone: teacherPhone,
          teacher_mail: teacherMail,
        });
        const teacherID = response.data.teacherId;
        console.log(teacherID); // This will log the response from the server
        window.alert(`Teacher details inserted successfully with teacherID: ${teacherID}`);
      } catch (error) {
        console.error(error); // Log any errors that occur during the request
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    // Delete teacher logic
    console.log('Delete teacher');
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsEditing(false); // Reset editing mode when switching modes
  };
  const handleSearch = () => {
    // Perform search logic here
    console.log("Search:", searchQuery);
    // You can implement the search functionality based on the searchQuery state
  };
  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {mode === 'create' ? 'Create Teacher' : 'View All Teachers'}
        </h2>
        {mode === 'create' && (
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 shadow-lg">
            <div className="mb-4">
              <label htmlFor="teacherName" className="block text-white font-semibold mb-2">
                Teacher Name
              </label>
              <input
                type="text"
                id="teacherName"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter teacher name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-white font-semibold mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter subject"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="teacherPhone" className="block text-white font-semibold mb-2">
                Teacher Phone
              </label>
              <input
                type="tel"
                id="teacherPhone"
                value={teacherPhone}
                onChange={(e) => setTeacherPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter teacher phone"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="teacherMail" className="block text-white font-semibold mb-2">
                Teacher Email
              </label>
              <input
                type="email"
                id="teacherMail"
                value={teacherMail}
                onChange={(e) => setTeacherMail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter teacher email"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
              >
                <FaPlus className="mr-2" />
                {isEditing ? 'Update' : 'Create'}
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
                    onClick={handleDelete}
                    className="flex items-center px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                </>
              )}
            </div>
          </form>
        )}
        {mode === 'view' && (
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
            {/* Implement table */}
            <table className="w-full table-auto bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2 text-white">Teacher Name</th>
                  <th className="px-4 py-2 text-white">Subject</th>
                  <th className="px-4 py-2 text-white">Phone</th>
                  <th className="px-4 py-2 text-white">Email</th>
                  <th className="px-4 py-2 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(teacher => (
                  <tr key={teacher.id} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-white">{teacher.teacherName}</td>
                    <td className="px-4 py-2 text-white">{teacher.subject}</td>
                    <td className="px-4 py-2 text-white">{teacher.teacherPhone}</td>
                    <td className="px-4 py-2 text-white">{teacher.teacherMail}</td>
                    <td className="px-4 py-2 text-white">
                      <button
                        onClick={() => handleEdit(teacher)}
                        className="flex items-center px-3 py-1 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.id)}
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
          <button
            onClick={() => switchMode('create')}
            className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
          >
            <FaPlus className="mr-2" />
            Create Teacher
          </button>
          <button
            onClick={() => switchMode('view')}
            className="flex items-center px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            View All Teachers
          </button>
        </div>
      </div>
    </div>
  );
};
