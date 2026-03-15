'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const ManageDoctor = () => {
    const runOnce = useRef(false); // Prevent fetching multiple times
    const [doctorList, setDoctorList] = useState([]);

    // Fetch all doctors
    const fetchDoctors = async () => {
        try {
            const res = await axios.get('http://localhost:5000/doctor/getall');
            console.table(res.data);
            setDoctorList(res.data);
        } catch (error) {
            console.error('Error fetching doctor data:', error);
        }
    };

    // Delete doctor by ID
    const handledelete =  (id) => {
         axios.delete(`http://localhost:5000/doctor/delete/${id}`)
         .then(() => {
            toast.success('Doctor deleted successfully');
          setDoctorList(doctor.filter(doctor => doctor._id !==id));
         })
         .catch(()=>{
            toast.error('failed to delete doctor');
         });
    };

    // Fetch doctors on first render
    useEffect(() => {
        if (!runOnce.current) {
            fetchDoctors();
            runOnce.current = true;
        }
    }, []);

    // Function to display doctors in a table format
    const displayDoctors = () => {
        return (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500">Specialization</th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                </thead>
             <tbody className="bg-white divide-y divide-gray-200">
  {doctorList.map((doctor, index) => (
    <tr key={doctor._id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.specialization}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span className="text-sm text-gray-500 dark:text-neutral-500">
          {new Date(doctor.createdAt).toDateString()}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center gap-4">
          <Link
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            href={`/doctor/add-doctor`}
          >
            Edit
          </Link>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            onClick={() => handledelete(doctor._id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

            </table>
        );
    };

    return (
        <div className='max-w-[80%] mx-auto'>
            <h1 className='text-center font-bold text-3xl'>Manage Doctors</h1>
            <br />
            {displayDoctors()} {/* Display the table */}
        </div>
    );
};

export default ManageDoctor;