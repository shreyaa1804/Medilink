'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { User, Stethoscope, Briefcase, Mail, Phone, MapPin, AlignLeft, Camera, Loader2 } from 'lucide-react';

const AddDoctor = () => {
  const router = useRouter();

  const [doctorData, setDoctorData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [token, setToken] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ✅ Get token safely
  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);
  }, []);

  // ✅ Fetch doctor data
  const getDoctorData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/doctor/get-detail', {
        headers: {
          'x-auth-token': token
        }
      });

      if (res.data) {
        setDoctorData(res.data);
        if (res.data.image) {
          setImagePreview(res.data.image);
        }
      } else {
        setDoctorData({});
      }

    } catch (err) {
      console.log(err);
      toast.error('Failed to load doctor data');
      setDoctorData({});
    }
  };

  useEffect(() => {
    if (token) getDoctorData();
  }, [token]);

  // ✅ Update doctor (ONLY on submit)
  const updateDoctor = async (values) => {
    try {
      const res = await axios.put(
        'http://localhost:5000/doctor/update',
        values,
        {
          headers: {
            'x-auth-token': token
          }
        }
      );

      toast.success('Doctor Information Updated');
      setDoctorData(res.data);

    } catch (err) {
      console.log(err);
      toast.error('Update failed');
    }
  };

  // ✅ CLOUDINARY UPLOAD (OPTIMIZED)
  const uploadFile = async (e, form) => {
    const file = e.target.files[0];
    if (!file) return;

    // 🔒 validation
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Max file size is 2MB');
      return;
    }

    setUploading(true);

    // temp preview
    setImagePreview(URL.createObjectURL(file));

    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'doctors');

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dh97g9dke/image/upload',
        {
          method: 'POST',
          body: fd,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Cloudinary Error:', errorData);
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await res.json();

      // final preview
      setImagePreview(data.secure_url);

      // ✅ store in form (NOT API call)
      form.setFieldValue('image', data.secure_url);
      form.setFieldValue('public_id', data.public_id);

      toast.success('Image uploaded');

    } catch (err) {
      console.error('Upload catch block:', err);
      toast.error(`Image upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

return (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center py-16 px-4 sm:px-6 mt-10">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-100 p-8 md:p-12"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Doctor Profile
        </h1>
        <p className="text-slate-500 text-lg">
          Update your professional details and consultation information.
        </p>
      </div>

      {doctorData ? (
        <Formik
          enableReinitialize
          initialValues={{
            ...doctorData,
            image: doctorData.image || '',
            public_id: doctorData.public_id || ''
          }}
          onSubmit={updateDoctor}
        >
          {(form) => (
            <form onSubmit={form.handleSubmit} className="space-y-8">
              
              {/* Profile Image Section */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative group">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-lg"
                  >
                    <img
                      src={imagePreview || "/default-avatar.png"}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full border-4 border-white bg-white"
                    />
                  </motion.div>

                  <label className="absolute bottom-0 right-0 bg-blue-600 p-3 rounded-full text-white cursor-pointer hover:bg-blue-700 transition shadow-lg group-hover:scale-110">
                    {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => uploadFile(e, form)}
                      disabled={uploading}
                    />
                  </label>
                </div>
                {uploading && (
                  <p className="text-sm text-blue-600 font-medium mt-4 animate-pulse">
                    Uploading your image...
                  </p>
                )}
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={form.values.name || ''}
                    onChange={form.handleChange}
                    placeholder="Full Name"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-700 font-medium placeholder:font-normal"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Stethoscope className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="specialization"
                    value={form.values.specialization || ''}
                    onChange={form.handleChange}
                    placeholder="Specialization (e.g. Cardiologist)"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-700 font-medium placeholder:font-normal"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="number"
                    name="experience"
                    value={form.values.experience || ''}
                    onChange={form.handleChange}
                    placeholder="Years of Experience"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-700 font-medium placeholder:font-normal"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.values.email || ''}
                    onChange={form.handleChange}
                    placeholder="Email Address"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-700 font-medium placeholder:font-normal"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="contact"
                    value={form.values.contact || ''}
                    onChange={form.handleChange}
                    placeholder="Contact Number"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-700 font-medium placeholder:font-normal"
                  />
                </div>

                <div className="relative md:col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={form.values.address || ''}
                    onChange={form.handleChange}
                    placeholder="Clinic/Hospital Address"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-700 font-medium placeholder:font-normal"
                  />
                </div>

                <div className="relative md:col-span-2">
                  <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                    <AlignLeft className="h-5 w-5 text-slate-400" />
                  </div>
                  <textarea
                    name="bio"
                    value={form.values.bio || ''}
                    onChange={form.handleChange}
                    placeholder="Write a short professional bio..."
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-700 font-medium placeholder:font-normal min-h-[120px] resize-y"
                  />
                </div>

              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={uploading}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                    uploading
                      ? "bg-slate-400 cursor-not-allowed shadow-none"
                      : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-blue-500/25"
                  }`}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Save Profile Updates"
                  )}
                </motion.button>
              </div>

            </form>
          )}
        </Formik>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Loading your profile...</p>
        </div>
      )}

    </motion.div>
  </div>
);
};

export default AddDoctor;