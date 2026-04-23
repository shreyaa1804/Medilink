"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { 
  Search, 
  FlaskConical, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  Microscope,
  Stethoscope,
  X,
  CreditCard,
  CheckCircle2
} from "lucide-react";

const LabTests = () => {
  const runOnce = useRef(false);
  const [testList, setTestList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConcern, setSelectedConcern] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const concerns = [
    "Heart",
    "Kidney",
    "Liver",
    "Diabetes",
    "Thyroid",
    "Full Body Checkup",
    "Vitamins",
    "Infection"
  ];

  const fetchTests = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/Labtest/getall");
      setTestList(res.data);
      setMasterList(res.data);
    } catch (error) {
      console.error("Error fetching lab tests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!runOnce.current) {
      fetchTests();
      runOnce.current = true;
    }
  }, []);

  useEffect(() => {
    let filtered = masterList;
    
    if (selectedConcern) {
      filtered = filtered.filter(test => 
        test.healthConcerns.some(concern => concern.toLowerCase().includes(selectedConcern.toLowerCase()))
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(test => 
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setTestList(filtered);
  }, [selectedConcern, searchQuery, masterList]);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden pb-20 pt-20">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-80 h-80 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 border border-blue-100 shadow-sm"
          >
            <FlaskConical className="w-4 h-4" />
            <span>NABL Accredited Laboratories</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6"
          >
            Diagnostic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Lab Tests</span> at Home
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Get accurate results from certified labs. Book a home sample collection 
            and track your reports digitally with MediLink.
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
              <motion.div 
                animate={{ scale: searchQuery ? 0.9 : 1 }}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
              >
                <Search className="w-6 h-6" />
              </motion.div>
              
              <input
                type="text"
                placeholder="Search for blood test, thyroid, kidney profile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-12 py-5 rounded-2xl bg-gray-50/50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white focus:ring-8 focus:ring-blue-100/50 transition-all text-lg placeholder:text-gray-400 shadow-inner"
              />

              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Health Concern Chips */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span>Filter by Health Concern</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedConcern("")}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 border-2 ${
                    selectedConcern === "" 
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105" 
                    : "bg-white text-gray-600 border-gray-100 hover:border-blue-200 hover:text-blue-600"
                  }`}
                >
                  All Tests
                </button>
                {concerns.map((concern) => (
                  <button
                    key={concern}
                    onClick={() => setSelectedConcern(concern)}
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 border-2 ${
                      selectedConcern === concern 
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105" 
                      : "bg-white text-gray-600 border-gray-100 hover:border-blue-200 hover:text-blue-600"
                    }`}
                  >
                    {concern}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-[2.5rem] h-[450px] animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {testList.length > 0 ? (
                testList.map((test) => (
                  <motion.div
                    key={test._id}
                    layout
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-blue-900/5 border border-gray-50 group hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 flex flex-col"
                  >
                    {/* Header */}
                    <div className="p-8 bg-gradient-to-br from-blue-50 to-white relative">
                      <div className="absolute top-8 right-8">
                        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm border border-blue-100">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="font-bold text-gray-700 text-xs uppercase tracking-wider">{test.reportTime}</span>
                        </div>
                      </div>
                      
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Microscope className="w-7 h-7" />
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {test.name}
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {test.healthConcerns.map((concern, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100/50 text-blue-600 rounded-lg text-xs font-bold uppercase">
                            {concern}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-8 flex-grow flex flex-col">
                      <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                        {test.description}
                      </p>

                      {test.testsIncluded && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <p className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            Tests Included
                          </p>
                          <p className="text-sm text-gray-700 font-medium line-clamp-2">
                            {test.testsIncluded}
                          </p>
                        </div>
                      )}

                      <div className="mt-auto flex items-end justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Price</p>
                          <p className="text-3xl font-black text-gray-900">
                            ₹{test.price}
                          </p>
                        </div>
                        
                        <Link
                          href={`/book-lab-test/${test._id}`}
                          className="px-6 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/40 transition-all active:scale-95 group/btn"
                        >
                          Book Now
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                    
                    {/* Footer Benefit */}
                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-gray-500">Free Home Sample Collection</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="col-span-full bg-white/50 backdrop-blur-md rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-200"
                >
                  <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FlaskConical className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Lab Tests Found</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    We couldn't find any lab tests matching your current search or filters. Try adjusting your criteria.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedConcern("");
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

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-blue-900/5">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">100% Safe & Secure</h4>
            <p className="text-sm text-gray-500">All samples are collected using sterilized kits and processed in NABL labs.</p>
          </div>
          <div className="flex flex-col items-center text-center border-y md:border-y-0 md:border-x border-gray-100 py-8 md:py-0 md:px-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
              <Clock className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Fastest Reports</h4>
            <p className="text-sm text-gray-500">Get your digital reports within 24-48 hours directly on your MediLink dashboard.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-6">
              <CreditCard className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Affordable Pricing</h4>
            <p className="text-sm text-gray-500">Transparent pricing with no hidden charges. Save up to 40% on health packages.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabTests;
