"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaEnvelope, FaUser, FaPaperPlane, FaPen } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/contact/getall", formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("Failed to send message. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <motion.header 
        className="relative w-full h-[40vh] bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] opacity-10 bg-cover bg-center" />
        <div className="relative h-full max-w-6xl mx-auto px-6 flex flex-col justify-center items-center">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              We're here to help you get connected with care
            </p>
          </motion.div>
        </div>
      </motion.header>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
        >
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="col-span-1 md:col-span-2">
              <label className="block mb-1 text-gray-700">Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block mb-1 text-gray-700">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block mb-1 text-gray-700">Subject</label>
              <div className="relative">
                <FaPen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="Subject (optional)"
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block mb-1 text-gray-700">Message</label>
              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300"
              >
                <FaPaperPlane />
                Send Message
              </button>
            </div>
          </motion.form>
          {status && (
            <motion.p
              variants={itemVariants}
              className="mt-6 text-center text-blue-600 font-semibold"
            >
              {status}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
