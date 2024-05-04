import React, { useState, useEffect } from 'react';

// Simulated database
let staffDB = [
  { id: 1, name: 'John Doe', position: 'Manager', phone: '1234567890' },
  { id: 2, name: 'Jane Smith', position: 'Developer', phone: '0987654321' },
];

export const Staff = () => {
  const [staffList, setStaffList] = useState(staffDB);
  const [staffName, setStaffName] = useState('');
  const [position, setPosition] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setStaffList(staffDB);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!staffName.trim()) {
      errors.staffName = 'Staff name is required';
    }

    if (!position.trim()) {
      errors.position = 'Position is required';
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
    }

    if (Object.keys(errors).length === 0) {
      if (editingId) {
        // Update staff
        const updatedStaff = staffList.map((staff) =>
          staff.id === editingId ? { ...staff, name: staffName, position, phone: phoneNumber } : staff
        );
        setStaffList(updatedStaff);
        setEditingId(null);
      } else {
        // Create new staff
        const newStaff = { id: staffList.length + 1, name: staffName, position, phone: phoneNumber };
        setStaffList([...staffList, newStaff]);
      }

      setStaffName('');
      setPosition('');
      setPhoneNumber('');
    } else {
      setErrors(errors);
    }
  };

  const handleEdit = (staff) => {
    setStaffName(staff.name);
    setPosition(staff.position);
    setPhoneNumber(staff.phone);
    setEditingId(staff.id);
  };

  const handleDelete = (id) => {
    const updatedStaff = staffList.filter((staff) => staff.id !== id);
    setStaffList(updatedStaff);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Staff Information</h2>
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
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                errors.staffName ? 'border-red-500' : ''
              }`}
            />
            {errors.staffName && <p className="text-red-500 text-xs italic">{errors.staffName}</p>}
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
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                errors.position ? 'border-red-500' : ''
              }`}
            />
            {errors.position && <p className="text-red-500 text-xs italic">{errors.position}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block text-white font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                errors.phoneNumber ? 'border-red-500' : ''
              }`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="flex items-center px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300"
            >
              {editingId ? 'Update' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => {
                setStaffName('');
                setPosition('');
                setPhoneNumber('');
                setEditingId(null);
              }}
              className="flex items-center px-6 py-2 rounded-md bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Staff List</h3>
          <table className="w-full table-auto bg-gray-800 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-white">Name</th>
                <th className="px-4 py-2 text-white">Position</th>
                <th className="px-4 py-2 text-white">Phone</th>
                <th className="px-4 py-2 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.id} className="border-b border-gray-700">
                  <td className="px-4 py-2 text-white">{staff.name}</td>
                  <td className="px-4 py-2 text-white">{staff.position}</td>
                  <td className="px-4 py-2 text-white">{staff.phone}</td>
                  <td className="px-4 py-2 text-white">
                    <button
                      onClick={() => handleEdit(staff)}
                      className="flex items-center px-3 py-1 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(staff.id)}
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
      </div>
    </div>
  );
};
