'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    axios.get('http://localhost:5000/doctor/getbyid') // Replace 123 with actual ID
      .then(res => setDoctor(res.data))
      .catch(err => console.error('Error:', err));
  }, []);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-blue-600 text-xl font-semibold animate-pulse">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Welcome, Dr. {doctor.name}</h1>

        {/* Tabs */}
        <div className="flex space-x-4 border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        {/* Content */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div><strong>Specialization:</strong> {doctor.specialization}</div>
            <div><strong>Email:</strong> {doctor.email}</div>
            <div><strong>Experience:</strong> {doctor.experience} years</div>
            <div><strong>Contact:</strong> {doctor.phone}</div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {doctor.reviews?.length > 0 ? (
              doctor.reviews.map((review, idx) => (
                <div key={idx} className="border rounded p-3 bg-blue-50 shadow">
                  <p className="font-medium">{review.patient}</p>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
