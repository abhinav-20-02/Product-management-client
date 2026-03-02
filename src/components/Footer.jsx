import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} Attendance Tracker. All rights reserved.
        </p>
        <div className="mt-2 flex justify-center gap-4 text-xs text-gray-400">
          <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
