"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ShieldCheck, ArrowRight, Activity, HeartPulse } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const About = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      title: "Easy Doctor Discovery",
      description: "Find the right doctor for your needs. Our platform offers a comprehensive directory of healthcare professionals across various specialties.",
      icon: <Search className="w-6 h-6" />,
      image: "https://www.usnews.com/object/image/00000184-5d22-d253-a784-dda799cf0000/gettyimages-1390026192.jpg?update-time=1668009859280&size=responsive640"
    },
    {
      id: 1,
      title: "Hassle-Free Appointments",
      description: "Book appointments with ease. Our platform offers a user-friendly interface for scheduling and managing your healthcare needs.",
      icon: <Calendar className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Secure Payments",
      description: "Make secure payments for your healthcare services. Our platform ensures that your financial information is protected at all times.",
      icon: <ShieldCheck className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden font-sans pb-20">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 border border-blue-100 flex-shrink-0 shadow-sm">
              <Activity className="w-4 h-4" />
              <span>Digital Healthcare</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight"
            >
              Healthcare at your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">fingertips</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-lg sm:text-xl text-gray-600 mb-4 leading-relaxed"
            >
              At MediLink, our mission is simple: to bring healthcare to your fingertips. We are a modern digital platform designed to connect patients with the right doctors quickly, efficiently, and securely.
            </motion.p>
            
            <motion.p 
              variants={fadeIn}
              className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed"
            >
              Whether you're seeking a consultation, choosing from specialized professionals, or managing appointment slots—we make it all seamless.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-appointment" className="group relative inline-flex justify-center items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl overflow-hidden shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95 border border-transparent">
                <span className="relative z-10 flex items-center gap-2">
                  Book Appointment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-[150%] transition-transform duration-700" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative lg:ml-auto w-full max-w-lg mx-auto mt-12 lg:mt-0"
          >
            <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-gray-900/10 z-10">
              <img
                src="https://d1zxene68j3keg.cloudfront.net/sites/default/files/Resouces/images/Doc%20Day_1.jpg"
                alt="Healthcare Professional"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent mix-blend-multiply" />
            </div>
            
            {/* Decorative background for image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-blue-100 rounded-[2rem] transform translate-x-4 translate-y-4 -z-10" />
            
            {/* Floating Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 sm:bottom-12 sm:-left-12 bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-xl border border-white z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">Trusted by</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">10k+ Patients</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose MediLink?</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Experience healthcare reimagined. We provide the tools you need to manage your medical journey efficiently and securely.</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Tabs Navigation */}
          <div className="lg:col-span-5 flex flex-col gap-4 relative z-10">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left p-6 w-full rounded-2xl transition-all duration-300 border focus:outline-none ${
                    isActive 
                      ? "bg-white border-blue-100 shadow-xl shadow-blue-900/5 ring-1 ring-blue-50" 
                      : "bg-transparent border-transparent hover:bg-white/60 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl transition-colors duration-300 shadow-sm ${isActive ? "bg-blue-600 text-white shadow-blue-200" : "bg-white text-gray-500 border border-gray-100"}`}>
                      {tab.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isActive ? "text-gray-900" : "text-gray-700"}`}>
                        {tab.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors duration-300 ${isActive ? "text-gray-600" : "text-gray-500"}`}>
                        {tab.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Tab Content Image */}
          <div className="lg:col-span-7 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-emerald-50 rounded-[2.5rem] transform rotate-3 scale-105 opacity-50" />
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100 ring-1 ring-gray-900/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeTab}
                  initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].title}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Decorative overlay element */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${activeTab}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <h4 className="text-white text-2xl font-bold tracking-wide">{tabs[activeTab].title}</h4>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Abstract Decorative SVG */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 hidden lg:block opacity-40 text-blue-300 pointer-events-none"
            >
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M60 0L64.2954 44.5905L102.426 17.5736L72.1932 54.8015L116.326 60L72.1932 65.1985L102.426 102.426L64.2954 75.4095L60 120L55.7046 75.4095L17.5736 102.426L47.8068 65.1985L3.67389 60L47.8068 54.8015L17.5736 17.5736L55.7046 44.5905L60 0Z" fill="currentColor"/>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;