'use client';
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  BadgeDollarSign, 
  Star, 
  MessageCircleQuestion, 
  HeartPulse, 
  Brain, 
  Activity, 
  Bone, 
  Sparkles, 
  Baby, 
  Apple, 
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Facebook,
  Twitter,
  Linkedin,
  Microscope,
  Award
} from "lucide-react";

// Variants for animations
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      
      {/* Top Navigation Bar */}
      <nav className="absolute top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">MediLink</span>
            </motion.div>

            {/* Links */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex space-x-8 items-center"
            >
              <Link href="/About" className="text-white/90 hover:text-white font-medium text-sm tracking-wide transition-colors">ABOUT</Link>
              <Link href="/browse-doctor" className="text-white/90 hover:text-white font-medium text-sm tracking-wide transition-colors">ALL DOCTORS</Link>
              <Link href="/contact" className="text-white/90 hover:text-white font-medium text-sm tracking-wide transition-colors">CONTACT</Link>
              <Link href="/login" className="px-6 py-2.5 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95">LOGIN</Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop" 
            alt="Hospital facility" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/80 to-transparent mix-blend-multiply" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-100 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span>Next Generation Healthcare</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
              The Hospital of the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Future, Today.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-blue-100/80 mb-10 leading-relaxed max-w-2xl text-balance">
              Our platform reduces manual administrative work, integrates secure patient records, and provides seamless online appointments for unparalleled accessibility.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Link href="/book-appointment" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white font-bold rounded-xl overflow-hidden hover:bg-blue-400 transition-all shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                <span className="relative z-10 flex items-center gap-2">
                  Book Appointment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-[150%] transition-transform duration-700" />
              </Link>
              <Link href="/About" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all">
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Stats / Features overlay */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
          </div>
        </div>
      </div>

      {/* Middle Section: Care & Amenities */}
      <section className="pt-48 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50">
        {/* Decor */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                We Provide Finest Patient <br className="hidden md:block" />
                <span className="text-blue-600">Care & Amenities</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                At MediLink, we blend cutting-edge medical technology with compassionate care to deliver unparalleled health services.
              </p>
              
              <ul className="space-y-5">
                {[
                  "Advanced medical technology for accurate diagnoses.",
                  "Qualified and experienced medical professionals.",
                  "24/7 emergency and non-emergency services.",
                  "Comfortable, hygienic, and modern facilities.",
                  "Secure online platform for patient records."
                ].map((text, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 bg-emerald-100 p-1 rounded-full text-emerald-600 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-medium">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative lg:ml-auto w-full max-w-lg"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-8 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1551076805-e18690c5e561?q=80&w=2000&auto=format&fit=crop"
                  alt="Doctor with Equipment"
                  className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent mix-blend-multiply" />
              </div>
              
              {/* Floating Stat 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute top-8 -right-6 lg:-right-12 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-white flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">22+</p>
                  <p className="text-sm text-gray-500 font-medium">Specialists</p>
                </div>
              </motion.div>

              {/* Floating Stat 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 -left-6 lg:-left-12 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-white flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">5k+</p>
                  <p className="text-sm text-gray-500 font-medium">Happy Patients</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              We Serve In Different Areas
            </h2>
            <p className="text-lg text-gray-500">
              Discover our comprehensive range of specialized medical departments tailored for your complete well-being.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {[
              { title: 'Surgery', icon: <Microscope className="w-10 h-10" />, color: "text-blue-600", bg: "bg-blue-50/50 hover:bg-blue-50" },
              { title: 'Cardiology', icon: <HeartPulse className="w-10 h-10" />, color: "text-red-500", bg: "bg-red-50/50 hover:bg-red-50" },
              { title: 'Neurology', icon: <Brain className="w-10 h-10" />, color: "text-purple-600", bg: "bg-purple-50/50 hover:bg-purple-50" },
              { title: 'Orthopedics', icon: <Bone className="w-10 h-10" />, color: "text-amber-500", bg: "bg-amber-50/50 hover:bg-amber-50" },
              { title: 'Dentistry', icon: <Sparkles className="w-10 h-10" />, color: "text-cyan-500", bg: "bg-cyan-50/50 hover:bg-cyan-50" },
              { title: 'Dermatology', icon: <Star className="w-10 h-10" />, color: "text-pink-500", bg: "bg-pink-50/50 hover:bg-pink-50" },
              { title: 'Pediatrics', icon: <Baby className="w-10 h-10" />, color: "text-indigo-500", bg: "bg-indigo-50/50 hover:bg-indigo-50" },
              { title: 'Nutrition', icon: <Apple className="w-10 h-10" />, color: "text-emerald-500", bg: "bg-emerald-50/50 hover:bg-emerald-50" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="group p-8 bg-gray-50 rounded-3xl text-center border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center"
              >
                <div className={`w-20 h-20 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6 text-white font-bold text-2xl">
                <Activity className="w-8 h-8 text-blue-500" />
                MediLink
              </div>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Revolutionizing healthcare access by bringing patients and doctors together in one seamless platform.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/About" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link href="/browse-doctor" className="hover:text-blue-400 transition-colors">Browse Doctors</Link></li>
                <li><Link href="/book-appointment" className="hover:text-blue-400 transition-colors">Book Appointment</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>123 Healthcare Ave.</li>
                <li>New York, NY 10001</li>
                <li>support@medilink.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} MediLink Healthcare Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;