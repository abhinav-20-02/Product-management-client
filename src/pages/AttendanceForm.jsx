import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addStudent, updateStudent } from '../redux/slices/attendanceSlice';

const AttendanceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { students } = useSelector(state => state.attendance);

  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    class: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  });

  useEffect(() => {
    if (id) {
      const studentToEdit = students.find(s => String(s.id) === String(id));
      if (studentToEdit) {
        setFormData(studentToEdit);
      }
    }
  }, [id, students]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateStudent({ id, data: formData }));
    } else {
      dispatch(addStudent(formData));
    }
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {id ? 'Edit Student Details' : 'Add New Student'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Student Name"
            className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            placeholder="Roll No."
            className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">Class</label>
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
            placeholder="Class (e.g. 10th A)"
            className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            required
          />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-semibold text-gray-600 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
        <div className="md:col-span-2 mt-4 flex gap-4">
          <button
            type="submit"
            className={`flex-grow py-3 rounded-lg font-bold text-white transition-all transform hover:scale-[1.01] active:scale-95 shadow-md ${
              id ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {id ? 'Save Changes' : 'Register Student'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 font-bold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;
