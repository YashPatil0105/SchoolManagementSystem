
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
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

const PDFReport = ({ teachers }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Teacher Report</Text>
          </View>
        </View>
        {teachers && teachers.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Teachers:</Text>
            {teachers.map(teachers => (
              <View key={teachers.teacher_id} style={styles.text}>
                <Text>Name: {teachers.teacher_name}</Text>
                <Text>Phone: {teachers.teacher_phone}</Text>
                <Text>Mail: {teachers.teacher_mail}</Text>
                <Text>Subject: {teachers.subject}</Text>
                
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

export const Contact = () => {
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('');
  const [teacherMail, setTeacherMail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState([]);
  const [mode, setMode] = useState('create');
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:1337/teacher');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    }
  };

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
        await axios.post('http://localhost:1337/teacher', {
          teacher_name: teacherName,
          subject,
          teacher_phone: teacherPhone,
          teacher_mail: teacherMail,
        });
        fetchTeachers();
        window.alert('Teacher details inserted successfully');
      } catch (error) {
        console.error('Error creating teacher:', error);
      }
    }
  };

  const handleEdit = (teacher) => {
    setIsEditing(true);
    setTeacherName(teacher.teacher_name);
    setSubject(teacher.subject);
    setTeacherPhone(teacher.teacher_phone);
    setTeacherId(teacher.teacher_id);
    setTeacherMail(teacher.teacher_mail);
    switchMode("create");

  };
  const handleUpdate = async (teacher) => {
    setIsEditing(true); // Set isEditing to true to switch to editing mode
  
    // Perform update logic when user clicks "Update" button
    const updatedData = {
      teacher_name: teacherName,
      subject,
      teacher_phone: teacherPhone,
      teacher_mail: teacherMail,
    };
    console.log(updatedData)
  
    // Compare the updatedData with the teacher data to detect changes
    const hasChanged = Object.keys(updatedData).some((key) => updatedData[key] !== teacher[key]);
  
    if (!hasChanged) {
      window.alert("No changes detected.");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:1337/teacher/${teacherId}`, updatedData);
      console.log(response.data);
      window.alert("Teacher details updated successfully");
      setIsEditing(false); // Reset editing mode
      fetchTeachers(); // Fetch updated teacher data
    } catch (error) {
      console.error("Error updating teacher details:", error);
      window.alert("Failed to update teacher details. Please try again.");
    }
  };
  

  const handleDelete = async (teacherId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Teacher ?");
    if (!isConfirmed) {
      // If user cancels deletion, return from the function
      return;
    }
    try {
      await axios.delete(`http://localhost:1337/teacher/${teacherId}`);
      fetchTeachers();
      console.log('Teacher deleted successfully');
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsEditing(false); // Reset editing mode when switching modes
  };
  const handleClear = () => {
    setTeacherName('');
    setSubject('');
    setTeacherPhone('');
    setTeacherMail('');
  };
  
  const handleSearch = async () => {
    // Perform search logic here
    console.log('Search:', searchQuery);
    try {
      const response = await axios.get(`http://localhost:1337/teacher/:${searchQuery}`);
      setTeachers(response.data);
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
      await fetchTeachers();
  
      // Open the modal when Analyse button is clicked
      setShowModal(true);
      generatePDF();
    };
    
  const closeModal = () => {
    setShowModal(false);
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
        {mode === 'view' && (
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
                    {teachers && ( // Add null check here
                      <PDFViewer style={{ width: "100%", height: "75vh" }}>
                        <PDFReport teachers={teachers} />
                      </PDFViewer>
                    )}
                    <div style={{ marginTop: "1rem" }}>
                      <PDFDownloadLink
                        document={<PDFReport teachers={teachers} />}
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
            {/* Implement table */}
            <table className="w-full table-auto bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2 text-white">ID</th>
                  <th className="px-4 py-2 text-white">Teacher Name</th>
                  <th className="px-4 py-2 text-white">Subject</th>
                  <th className="px-4 py-2 text-white">Phone</th>
                  <th className="px-4 py-2 text-white">Email</th>
                  <th className="px-4 py-2 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-white">{teacher.teacher_id}</td>
                    <td className="px-4 py-2 text-white">{teacher.teacher_name}</td>
                    <td className="px-4 py-2 text-white">{teacher.subject}</td>
                    <td className="px-4 py-2 text-white">{teacher.teacher_phone}</td>
                    <td className="px-4 py-2 text-white">{teacher.teacher_mail}</td>
                    <td className="px-4 py-2 text-white">
                      <button
                        onClick={() => handleEdit(teacher)}
                        className="flex items-center px-3 py-1 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.teacher_id)}
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
            onClick={() => switchMode(mode === 'view' ? 'create' : 'view')}
            className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
          >
            <FaPlus className="mr-2" />
            {mode === 'view' ? 'Create Teacher' : 'View All Teachers'}
          </button>
        </div>
      </div>
    </div>
  );
};
