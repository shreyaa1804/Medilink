"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  CalendarDays, 
  Clock, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle, 
  Activity,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  HeartPulse
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const BookAppointment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    department: "",
    doctor: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate an API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center font-sans">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center bg-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl shadow-blue-900/5 ring-1 ring-gray-100">
          
          {/* Left Column: Info & Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 w-max border border-blue-100">
              <Activity className="w-4 h-4" />
              <span>Fast & Secure</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              Schedule Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Visit Online</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-gray-600 text-lg mb-8 leading-relaxed">
              Book your appointment in less than 2 minutes. Enter your details, choose your preferred specialist, and select a time that works best for you.
            </motion.p>

            <motion.div variants={fadeIn} className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Expert Doctors</h3>
                  <p className="text-gray-500 text-sm">Consult with top specialists across all departments.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Secure & Private</h3>
                  <p className="text-gray-500 text-sm">Your medical data is encrypted and kept strictly confidential.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <HeartPulse className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Continuous Care</h3>
                  <p className="text-gray-500 text-sm">Enjoy automated follow-ups and prescriptions directly in-app.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Appointment Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7 bg-gray-50 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Details</h2>
                  
                  {/* Selectors Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Department</label>
                      <div className="relative">
                        <select 
                          name="department"
                          required
                          value={formData.department}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none text-gray-700"
                        >
                          <option value="">Select Department</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Orthopedics">Orthopedics</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="General">General Practice</option>
                        </select>
                        <Activity className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Doctor</label>
                      <div className="relative">
                        <select 
                          name="doctor"
                          required
                          value={formData.doctor}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
                          disabled={!formData.department}
                        >
                          <option value="">Select Doctor</option>
                          {formData.department && (
                            <>
                              <option value="Dr. Smith">Dr. Smith</option>
                              <option value="Dr. Taylor">Dr. Taylor</option>
                              <option value="Dr. Adams">Dr. Adams</option>
                            </>
                          )}
                        </select>
                        <Stethoscope className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Preferred Date</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
                        />
                        <CalendarDays className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Preferred Time</label>
                      <div className="relative">
                        <input 
                          type="time" 
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
                        />
                        <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Personal Info Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          name="name"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
                        />
                        <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <div className="relative">
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
                        />
                        <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
                      />
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Reason for Visit (Optional)</label>
                    <div className="relative">
                      <textarea 
                        name="notes"
                        rows="3"
                        placeholder="Briefly describe your symptoms or reason for visit..."
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 resize-none"
                      ></textarea>
                      <FileText className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative flex justify-center items-center gap-2 py-4 px-6 bg-blue-600 text-white font-bold rounded-xl overflow-hidden shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? "Processing..." : "Confirm Appointment"}
                      {!isSubmitting && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-[150%] transition-transform duration-700" />
                  </button>
                </motion.form>
              ) : (
                /* Success State */
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-6"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-12 h-12 text-emerald-500" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Request sent!</h2>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-gray-900">{formData.name}</span>. Your appointment request for <span className="font-semibold text-gray-900">{formData.date}</span> at <span className="font-semibold text-gray-900">{formData.time}</span> has been received. We've sent a confirmation email to <span className="font-semibold text-gray-900">{formData.email}</span>.
                  </p>
                  
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ department: "", doctor: "", date: "", time: "", name: "", phone: "", email: "", notes: "" });
                    }}
                    className="px-8 py-3 bg-white text-blue-600 font-semibold border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
                  >
                    Book Another Appointment
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
