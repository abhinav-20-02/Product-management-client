import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AttendanceForm from './pages/AttendanceForm';
import AttendanceList from './pages/AttendanceList';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50/50">
        <Header />

        <main className="flex-grow max-w-7xl mx-auto w-full py-12 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<AttendanceList />} />
            <Route path="/add" element={<AttendanceForm />} />
            <Route path="/edit/:id" element={<AttendanceForm />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
