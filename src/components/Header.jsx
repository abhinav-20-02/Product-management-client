import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <Link to="/" className="text-2xl font-extrabold text-blue-900 tracking-tight hover:text-blue-700 transition-colors">
            Attendance Tracker
          </Link>
        </div>
        <nav className="flex gap-6 items-center">
          <Link to="/" className="text-md font-bold text-gray-600 hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
          <Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md">
            + Add Student
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
