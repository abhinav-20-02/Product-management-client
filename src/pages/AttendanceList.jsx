import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchStudents, deleteStudent, updateStudent, setSelectedDate } from '../redux/slices/attendanceSlice';
import { FaEdit, FaTrash, FaUserGraduate } from 'react-icons/fa';

const AttendanceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading, error, selectedDate } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  const handleToggleStatus = (student) => {
    const newStatus = student.status === 'Present' ? 'Absent' : 'Present';
    dispatch(updateStudent({ id: student.id, data: { status: newStatus } }));
  };

  const filteredStudents = students.filter((s) => s.date === selectedDate);

  const handleDateChange = (e) => {
    dispatch(setSelectedDate(e.target.value));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500 font-medium">Loading students...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500 font-medium">Error: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaUserGraduate className="text-blue-600" /> Attendance Dashboard
        </h2>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            Filter by Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          />
        </div>
      </div>

      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative group"
            >
              <div
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm cursor-pointer select-none transition-all active:scale-90 ${
                  student.status === 'Present'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
                onClick={() => handleToggleStatus(student)}
              >
                {student.status}
              </div>
              <h3 className="text-lg font-bold text-gray-800 pr-16">{student.name}</h3>
              <p className="text-sm text-gray-500 mb-4">
                Roll No: <span className="font-semibold">{student.rollNumber}</span> •{' '}
                <span className="font-semibold">{student.class}</span>
              </p>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-400 font-medium">{student.date}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="p-2 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-all"
                    title="Edit Details"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all"
                    title="Delete Student"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400 italic">
          No attendance records found for {selectedDate}.
        </div>
      )}
    </div>
  );
};

export default AttendanceList;
