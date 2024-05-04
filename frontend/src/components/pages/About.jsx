import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';

export const About = () => {
  const [parentName,setParentName]=useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [classValue, setClassValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update student logic
      console.log("Update student:", { name, dob, phone, classValue });
      setIsEditing(false);
    } else {
      // Create student logic
      // console.log("Create student:", { name, dob, phone, classValue });
      try {
        const response = await axios.post('http://localhost:1337/student', {
          name,
          DOB: dob, // Assuming dob is the variable name corresponding to date of birth
          phone,
          studentClass: classValue, // Assuming classValue corresponds to the student's class
          parent_name: parentName, // Assuming parentName corresponds to the parent's name
          // Assuming parentPhone corresponds to the parent's phone number
        });
        // console.log("pre response");
        const studentID=response.data.studentId;
        console.log(studentID); // This will log the response from the server
        window.alert(`Student details inserted successfully with studentID: ${studentID}`);
      } catch (error) {
        // console.log("error");
        console.error(error); // Log any errors that occur during the request
      }
      // console.log("after try");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    // Delete student logic
    console.log("Delete student");
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Student Form
        </h2>
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
              htmlFor="name"
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
              className="block text-white font-semibold mb-2"
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