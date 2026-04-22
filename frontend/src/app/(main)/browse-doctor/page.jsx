"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { 
  Search, 
  Star, 
  Stethoscope,
  ArrowRight,
  TrendingUp,
  Award,
  DollarSign
} from "lucide-react";

const BrowseDoctors = () => {
  const runOnce = useRef(false);
  const [doctorList, setDoctorList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const specialties = [
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Homopathy",
    "Dentist",
    "Pulmonologist",
    "Neurologist",
    "Orthopedic"
  ];

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/doctor/getall");
      setDoctorList(res.data);
      setMasterList(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!runOnce.current) {
      fetchDoctors();
      runOnce.current = true;
    }
  }, []);

  useEffect(() => {
    let filtered = masterList;
    
    if (selectedSpecialty) {
      filtered = filtered.filter(doctor => 
        doctor.specialization.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setDoctorList(filtered);
  }, [selectedSpecialty, searchQuery, masterList]);

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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden pb-20">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-80 h-80 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 border border-blue-100 shadow-sm"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Top Rated Professionals</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6"
          >
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Ideal Doctor</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Connect with verified healthcare experts across all specialties. 
            Quality care is just a simple search away.
          </motion.p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white p-4 md:p-8"
        >
          <div className="flex flex-col gap-8">
            {/* Search Input */}
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-6 h-6" />
              <input
                type="text"
                placeholder="Search doctors by name, specialty, or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-blue-100 transition-all text-lg placeholder:text-gray-400"
              />
            </div>

            {/* Specialty Chips */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedSpecialty("")}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 border ${
                  selectedSpecialty === "" 
                  ? "bg-blue-600 text-white border-transparent shadow-lg shadow-blue-200" 
                  : "bg-white text-gray-600 border-gray-100 hover:border-blue-200"
                }`}
              >
                All Specialties
              </button>
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 border ${
                    selectedSpecialty === spec 
                    ? "bg-blue-600 text-white border-transparent shadow-lg shadow-blue-200" 
                    : "bg-white text-gray-600 border-gray-100 hover:border-blue-200"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 8].map((i) => (
              <div key={i} className="bg-white rounded-3xl h-[380px] animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {doctorList.length > 0 ? (
                doctorList.map((doctor) => (
                  <motion.div
                    key={doctor._id}
                    layout
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-blue-900/5 border border-gray-50 group hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden bg-white p-2">
                      <img
                        src={doctor.image || "https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/a-male-doctor-with-a-stethoscope-around-his-neck-isolated-on-white-background-generative-ai-photo.jpg"}
                        alt={doctor.name}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-6 right-6">
                        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-white/50">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-bold text-gray-800">{doctor.rating || 4.8}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-6 left-6">
                        <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                          {doctor.specialization}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {doctor.name}
                        </h2>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                            <Award className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase">Experience</p>
                            <p className="font-bold text-gray-800">{doctor.experience || 0}+ Years</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                            <DollarSign className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase">Consultation Fee</p>
                            <p className="font-bold text-gray-800">₹{doctor.fees || 500}</p>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed italic border-l-2 border-blue-100 pl-3">
                          "{doctor.bio || "Dedicated healthcare professional providing expert medical care."}"
                        </p>
                      </div>

                      <Link
                        href={`/view-doctor/${doctor._id}`}
                        className="group relative flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-xl font-bold overflow-hidden transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200"
                      >
                        <span className="relative z-10 flex items-center gap-2 text-sm">
                          View Profile
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="col-span-full bg-white/50 backdrop-blur-md rounded-[3rem] p-16 text-center border-2 border-dashed border-gray-200"
                >
                  <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Stethoscope className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Doctors Found</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    We couldn't find any doctors matching your current filters. Try searching for something else or clearing your filters.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedSpecialty("");
                    }}
                    className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default BrowseDoctors;