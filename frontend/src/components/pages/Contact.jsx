import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export const Contact = () => {
  const [teacherId, setTeacherId] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const [contactId, setContactId] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('');
  const [teacherMail, setTeacherMail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update teacher logic
      console.log('Update teacher:', { teacherId, teacherName, subject, contactId, teacherPhone, teacherMail });
    } else {
      // Create teacher logic
      console.log('Create teacher:', { teacherId, teacherName, subject, contactId, teacherPhone, teacherMail });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    // Delete teacher logic
    console.log('Delete teacher');
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Teacher Form</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 shadow-lg">
          {/* <div className="mb-4">
            <label htmlFor="teacherId" className="block text-white font-semibold mb-2">
              Teacher ID
            </label>
            <input
              type="text"
              id="teacherId"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter teacher ID"
            />
          </div> */}
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
          {/* <div className="mb-4">
            <label htmlFor="contactId" className="block text-white font-semibold mb-2">
              Contact ID
            </label>
            <input
              type="text"
              id="contactId"
              value={contactId}
              onChange={(e) => setContactId(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter contact ID"
            />
          </div> */}
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
      </div>
    </div>
  );
};