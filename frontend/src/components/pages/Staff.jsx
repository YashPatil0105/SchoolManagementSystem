import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

export const Staff = () => {
  const [staffId, setstaffId] = useState('');
  const [staffName, setstaffName] = useState('');
  const [position, setPosition] = useState('');
  const [staffPhone, setstaffPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update staff logic
      console.log('Update staff:', { staffId, staffName, position,  staffPhone});
    } else {
      // Create staff logic
      console.log('Create staff:', { staffId, staffName, position,  staffPhone });
      try {
        const response = await axios.post('http://localhost:1337/staff', {
          staff_name: staffName,
          position, // Assuming dob is the variable name corresponding to date of birth
          phone: staffPhone,
         // Assuming classValue corresponds to the student's class
          // Assuming parentName corresponds to the parent's name
          // Assuming parentPhone corresponds to the parent's phone number
        });
        // console.log("pre response");
        const staffID = response.data.staffId;
        console.log(staffID); // This will log the response from the server
        window.alert(`staff details inserted successfully with staffID: ${staffID}`);
      } catch (error) {
        // console.log("error");
        console.error(error); // Log any errors that occur during the request
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    // Delete staff logic
    console.log('Delete staff');
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Staff Form</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 shadow-lg">
          {/* <div className="mb-4">
            <label htmlFor="staffId" className="block text-white font-semibold mb-2">
              staff ID
            </label>
            <input
              type="text"
              id="staffId"
              value={staffId}
              onChange={(e) => setstaffId(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter staff ID"
            />
          </div> */}
          <div className="mb-4">
            <label htmlFor="staffName" className="block text-white font-semibold mb-2">
              Staff Name
            </label>
            <input
              type="text"
              id="staffName"
              value={staffName}
              onChange={(e) => setstaffName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter staff name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Position" className="block text-white font-semibold mb-2">
              Position
            </label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter Position"
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
              onChange={(e) => setstaffPhone(e.target.value)}
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
      </div>
    </div>
  );
};