import React from 'react';
import { Link } from 'react-router-dom';
import studentIcon from '../../assests/student.jpg';
import teacherIcon from '../../assests/teacher.jpg';
import staffIcon from '../../assests/staff.jpg';
import parentsIcon from '../../assests/parents.jpg';
import attendanceIcon from '../../assests/attendance.jpg';

// Array of card data
const cardData = [
  {
    title: 'Student',
    icon: studentIcon,
    link: '/student',
  },
  {
    title: 'Progresss',
    icon: parentsIcon,
    link: '/parent',
  },
  {
    title: 'Staff',
    icon: staffIcon,
    link: '/staff',
  },
  {
    title: 'Attendance',
    icon: attendanceIcon,
    link: '/attendance',
  },
  {
    title: 'Teacher',
    icon: teacherIcon,
    link: '/teacher',
  },
];

export const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          School Management System
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cardData.map((card, index) => (
            <Link to={card.link} key={index}>
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="p-6 flex flex-col items-center justify-center">
                <div className="mb-4">
    <img src={card.icon} alt={card.title} className="w-full h-48 object-cover" />
  </div>
                  <h2 className="text-xl font-bold text-white">{card.title}</h2>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

