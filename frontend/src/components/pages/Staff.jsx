
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

const PDFReport = ({ staff }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Staff Report</Text>
          </View>
        </View>
        {staff && staff.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Staff:</Text>
            {staff.map(staff => (
              <View key={staff.teacher_id} style={styles.text}>
                <Text>Name: {staff.staff_name}</Text>
                <Text>Position: {staff.position}</Text>
                <Text>Phone: {staff.contact_phone}</Text>
                
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


export const Staff = () => {
  const [staffName, setStaffName] = useState('');
  const [staffId, setStaffId] = useState('');
  const [position, setPosition] = useState('');
  const [staffPhone, setStaffPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [mode, setMode] = useState('create');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:1337/staff');
      setStaffList(response.data);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update staff logic
      console.log('Update staff:', { staffName, position, staffPhone });
      setIsEditing(false);
    } else {
      // Create staff logic
      console.log('Create staff:', { staffName, position, staffPhone });
      try {
        await axios.post('http://localhost:1337/staff', {
          staff_name: staffName,
          position,
          phone: staffPhone,
        });
        fetchStaff();
        window.alert('Staff details inserted successfully');
      } catch (error) {
        console.error('Error creating staff:', error);
      }
    }
  };

  const handleEdit = (staff) => {
    setIsEditing(true);
    setStaffName(staff.staff_name);
    setStaffId(staff.staff_id);
    setPosition(staff.position);
    setStaffPhone(staff.contact_phone);
    switchMode("create");
  };
  const handleUpdate = async (staff) => {
    setIsEditing(true);
  
    const updatedData = {
      staff_name: staffName,
      position,
      phone: staffPhone,
    };
  
    // Compare the updatedData with the staff data to detect changes
    const hasChanged = Object.keys(updatedData).some((key) => updatedData[key] !== staff[key]);
  
    if (!hasChanged) {
      window.alert("No changes detected.");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:1337/staff/${staffId}`, updatedData);
      console.log(response.data);
      window.alert("Staff details updated successfully");
      setIsEditing(false); // Reset editing mode
      fetchStaff(); // Fetch updated staff data
    } catch (error) {
      console.error("Error updating staff details:", error);
      window.alert("Failed to update staff details. Please try again.");
    }
  };
  
  // Remove handleEdit2 function and its corresponding button
  
  const handleClear = () => {
    setStaffName('');
    setPosition('');
    setStaffPhone('');
  };
  
  const handleDelete = async (staffId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this staff member?");
    if (!isConfirmed) {
      // If user cancels deletion, return from the function
      return;
    }
  
    try {
      await axios.delete(`http://localhost:1337/staff/${staffId}`);
      fetchStaff(); // Assuming fetchStaff is a function that fetches staff data
      console.log('Staff deleted successfully');
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };
  const switchMode = (newMode) => {
    setMode(newMode);
    setIsEditing(false); // Reset editing mode when switching modes
  };

  const handleSearch = async () => {
    // Perform search logic here
    console.log('Search:', searchQuery);
    try {
      const response = await axios.get(`http://localhost:1337/staff/:${searchQuery}`);
      setStaffList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching staff data:', error);
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
    await fetchStaff();

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
        {mode === 'create' && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Create Staff</h2>
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 shadow-lg">
              <div className="mb-4">
                <label htmlFor="staffName" className="block text-white font-semibold mb-2">
                  Staff Name
                </label>
                <input
                  type="text"
                  id="staffName"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter staff name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="position" className="block text-white font-semibold mb-2">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter position"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="staffPhone" className="block text-white font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="staffPhone"
                  value={staffPhone}
                  onChange={(e) => setStaffPhone(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter staff phone"
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
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => switchMode('view')}
                className="flex items-center px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                View All Staff
              </button>
            </div>
          </div>
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
                    {staffList && ( // Add null check here
                      <PDFViewer style={{ width: "100%", height: "75vh" }}>
                        <PDFReport staff={staffList} />
                      </PDFViewer>
                    )}
                    <div style={{ marginTop: "1rem" }}>
                      <PDFDownloadLink
                        document={<PDFReport staff={staffList} />}
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

            <h2 className="text-3xl font-bold text-white mb-8 text-center">View All Staff</h2>
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
                  <th className="px-4 py-2 text-white">Staff Name</th>
                  <th className="px-4 py-2 text-white">Position</th>
                  <th className="px-4 py-2 text-white">Phone</th>
                  <th className="px-4 py-2 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff) => (
                  <tr key={staff.id} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-white">{staff.staff_id}</td>
                    <td className="px-4 py-2 text-white">{staff.staff_name}</td>
                    <td className="px-4 py-2 text-white">{staff.position}</td>
                    <td className="px-4 py-2 text-white">{staff.contact_phone}</td>
                    <td className="px-4 py-2 text-white">
                      <button
                        onClick={() => handleEdit(staff)}
                        className="flex items-center px-3 py-1 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(staff.staff_id)}
                        className="flex items-center px-3 py-1 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => switchMode('create')}
                className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
              >
                <FaPlus className="mr-2" />
                Create Staff
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
