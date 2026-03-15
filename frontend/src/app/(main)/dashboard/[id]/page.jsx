'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function DoctorProfile() {
   const [doctor, setDoctor] = useState(null);
   const [token, setToken] = useState(null);
   const runOnce = useRef(false);
 
 
   // Retrieve token from localStorage
   useEffect(() => {
     const savedToken = localStorage.getItem('token');
     setToken(savedToken);
   }, []);
 
   
   // Fetch logged-in doctor's details
   const fetchLoggedInDoctor = async () => {
     try {
       const res = await axios.get('http://localhost:5000/doctor/getbyemail/:email', {
         headers: { 'x-auth-token': token },
       });
       setDoctor(res.data);
     } catch (error) {
       console.error('Error fetching logged-in doctor:', error);
       toast.error('Failed to fetch logged-in doctor details');
     }
   };

  useEffect(() => {
     if (!runOnce.current && token) {
       fetchLoggedInDoctor();
       runOnce.current = true;
     }
   }, [token]);
 
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6 flex flex-col space-y-6">
        <div className="text-2xl font-semibold">MediLink</div>
        <h1 className="text-xl font-bold lg:mb-6 text-blue-100">Doctor Dashboard</h1>
        <ul className="flex flex-col space-y-4">
          <li>
            <a href="/doctor/manageappointment" className="hover:bg-blue-500 p-2 rounded block transition-colors">
              Scheduled Appointments
            </a>
          </li>
          <li>
            <a href="/doctor/manage-slot" className="hover:bg-blue-500 p-2 rounded block transition-colors bg-blue-600">
              Manage Slots
            </a>
          </li>
          <li>
            <a href="/doctor/manage-doctor" className="hover:bg-blue-500 p-2 rounded block transition-colors">
              Edit Appointments
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-semibold mb-2 mt-4">Doctor Details</h2>
          </div>

          {loading ? (
            <p className="text-gray-500 mt-4">Loading doctor details...</p>
          ) : doctor ? (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div>
                {/* <p className="text-gray-700 mb-2">{doctor.about}</p> */}
                <div className="space-y-2">
                  <p><strong>Specialization:</strong> {doctor.specialization}</p>
                  <p><strong>Experience:</strong> {doctor.experience}</p>
                  <p><strong>Consultation Fee:</strong> ₹{doctor.fee}</p>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <p><strong>Address:</strong> {doctor.address}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>Contact:</strong> {doctor.contact}</p>
              </div>
            </div>
          ) : (
            <p className="text-red-500 mt-4">Doctor details not found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
