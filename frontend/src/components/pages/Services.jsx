import React, { useState, useEffect } from 'react';

let parentsDB = [
  { id: 1, name: 'John Doe', phone: '1234567890', studentId: 1 },
  { id: 2, name: 'Jane Smith', phone: '0987654321', studentId: 2 },
];

export const Services = () => {
  const [parents, setParents] = useState(parentsDB);
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [studentId, setStudentId] = useState('');
  const [editingParentId, setEditingParentId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setParents(parentsDB);
  }, []);

  const handleParentSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!parentName.trim()) {
      errors.parentName = 'Parent name is required';
    }

    if (!parentPhone.trim()) {
      errors.parentPhone = 'Parent phone is required';
    } else if (!/^\d{10}$/.test(parentPhone)) {
      errors.parentPhone = 'Invalid phone number';
    }

    if (!studentId.trim()) {
      errors.studentId = 'Student ID is required';
    }

    if (Object.keys(errors).length === 0) {
      if (editingParentId) {
        // Update parent
        const updatedParents = parents.map((parent) =>
          parent.id === editingParentId ? { ...parent, name: parentName, phone: parentPhone, studentId } : parent
        );
        setParents(updatedParents);
        setEditingParentId(null);
      } else {
        // Create new parent
        const newParent = { id: parents.length + 1, name: parentName, phone: parentPhone, studentId };
        setParents([...parents, newParent]);
      }

      setParentName('');
      setParentPhone('');
      setStudentId('');
    } else {
      setErrors(errors);
    }
  };

  const handleEdit = (parent) => {
    setParentName(parent.name);
    setParentPhone(parent.phone);
    setStudentId(parent.studentId);
    setEditingParentId(parent.id);
  };

  const handleDelete = (id) => {
    const updatedParents = parents.filter((parent) => parent.id !== id);
    setParents(updatedParents);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Parent Information</h2>
        <form onSubmit={handleParentSubmit} className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <div className="mb-4">
            <label htmlFor="parentName" className="block text-white font-semibold mb-2">
              Parent Name
            </label>
            <input
              type="text"
              id="parentName"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                errors.parentName ? 'border-red-500' : ''
              }`}
            />
            {errors.parentName && <p className="text-red-500 text-xs italic">{errors.parentName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="parentPhone" className="block text-white font-semibold mb-2">
              Parent Phone
            </label>
            <input
              type="text"
              id="parentPhone"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                errors.parentPhone ? 'border-red-500' : ''
              }`}
            />
            {errors.parentPhone && <p className="text-red-500 text-xs italic">{errors.parentPhone}</p>}
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
              {editingParentId ? 'Update' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => {
                setParentName('');
                setParentPhone('');
                setStudentId('');
                setEditingParentId(null);
              }}
              className="flex items-center px-6 py-2 rounded-md bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Parent List</h3>
          <table className="w-full table-auto bg-gray-800 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-white">Name</th>
                <th className="px-4 py-2 text-white">Phone</th>
                <th className="px-4 py-2 text-white">Student ID</th>
                <th className="px-4 py-2 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((parent) => (
                <tr key={parent.id} className="border-b border-gray-700">
                  <td className="px-4 py-2 text-white">{parent.name}</td>
                  <td className="px-4 py-2 text-white">{parent.phone}</td>
                  <td className="px-4 py-2 text-white">{parent.studentId}</td>
                  <td className="px-4 py-2 text-white">
                    <button
                      onClick={() => handleEdit(parent)}
                      className="flex items-center px-3 py-1 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(parent.id)}
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