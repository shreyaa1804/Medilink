'use client';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { 
  ArrowLeft, 
  Video, 
  CreditCard, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Award, 
  Clock, 
  DollarSign, 
  Star,
  MessageSquare,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ViewDoctor = () => {
  const { id } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [rating, setRating] = useState(3);
  const [isOpen, setIsOpen] = useState(false);
  const [slotList, setSlotList] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const messageRef = useRef();

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/getbyid/${id}`);
      setDoctor(response.data);
      setRating(response.data.rating || 3);
    } catch (err) {
      toast.error('Failed to load doctor details');
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/review/getbydoctor/${id}`);
      setReviews(response.data);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    }
  };

  const fetchSlotList = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/slot/getbydoctorid/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setSlotList(response.data);
    } catch (error) {
      toast.error('Failed to fetch slots');
    }
  };

  const submitRating = async () => {
    const comment = messageRef.current.value;
    if (!comment) {
      toast.error('Please provide a comment!');
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/review/add`,
        { doctor: id, rating, comment },
        { headers: { 'x-auth-token': token } }
      );
      toast.success('Review submitted');
      messageRef.current.value = '';
      setRating(3);
      fetchReviews();
    } catch (err) {
      toast.error('Failed to submit review');
    }
  };

  const bookAppointment = async () => {
    if (!selectedSlot) {
      toast.error('Please select a slot');
      return;
    }

    if (!token) {
      toast.error('User not authenticated. Please log in.');
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/appointment/book`,
        { doctor: id, slot: selectedSlot },
        { headers: { 'x-auth-token': token } }
      );
      toast.success('booking is confirmed');
      setIsOpen(false);
    } catch (err) {
      toast.error('Failed to book appointment');
    }
  };

  useEffect(() => {
    if (id) {
      fetchDoctorDetails();
      fetchReviews();
      fetchSlotList();
    }
  }, [id]);

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => Math.floor(r.rating) === stars).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { stars, count, percentage };
  });

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
          <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700 pb-20">
      
      {/* Search Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to search results</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Section */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-32 bg-slate-100 border-b border-slate-200 relative">
                <div className="absolute -bottom-12 left-8">
                  <div className="p-1 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <img
                      src={doctor.image || 'https://via.placeholder.com/150'}
                      alt={doctor.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-16 pb-8 px-8">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-slate-900">{doctor.name}</h1>
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-slate-500 font-medium">{doctor.specialization}</p>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-slate-900">{avgRating}</span>
                        <span className="text-slate-400 text-sm">({reviews.length} reviews)</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-slate-400" />
                        <span className="font-bold text-slate-900">{doctor.experience}+ yrs</span>
                        <span className="text-slate-400 text-sm">Exp.</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-3 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition-all">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all text-sm">
                      <MessageSquare className="w-4 h-4" />
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabbed Info Section */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="flex border-b border-slate-200 px-6">
                {['profile', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-4 text-sm font-bold transition-all relative ${
                      activeTab === tab ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'profile' ? (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-10"
                    >
                      <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-3">About the Healthcare Provider</h2>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {doctor.bio || `Dr. ${doctor.name} provides expert medical consultation in the field of ${doctor.specialization}. With extensive experience in clinical practice, the doctor is known for professional excellence and patient-focused healthcare delivery.`}
                        </p>
                      </section>

                      <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Work Experience
                          </h3>
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <p className="font-bold text-slate-800 text-sm">{doctor.experience} Years Active</p>
                            <p className="text-xs text-slate-500 mt-1">Specialized in Medical Support</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Clinical Location
                          </h3>
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <p className="font-medium text-slate-700 text-sm">{doctor.address || "Medical Plaza, Suite 402"}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="grid lg:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        {reviews.length > 0 ? (
                          reviews.map((review, i) => (
                            <div key={i} className="pb-6 border-b border-slate-100 last:border-0">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase tracking-tighter">
                                    {review.user?.name?.[0] || 'A'}
                                  </div>
                                  <span className="font-bold text-slate-800 text-sm">{review.user?.name || 'Authorized User'}</span>
                                </div>
                                <div className="flex gap-0.5 text-amber-400">
                                  {[...Array(5)].map((_, j) => (
                                    <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'fill-current' : 'text-slate-100'}`} />
                                  ))}
                                </div>
                              </div>
                              <p className="text-slate-500 text-xs leading-relaxed">{review.comment}</p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-slate-400 text-sm italic">No records found.</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-900">Post a Public Review</h3>
                        <div className="space-y-4 text-center">
                          <StarRatings
                            rating={rating}
                            changeRating={setRating}
                            numberOfStars={5}
                            starRatedColor="#f59e0b"
                            starHoverColor="#f59e0b"
                            starDimension="24px"
                            starSpacing="2px"
                            name="rating"
                          />
                          <textarea
                            ref={messageRef}
                            placeholder="Type your experience here..."
                            className="w-full p-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 transition-all min-h-[100px] text-sm"
                          />
                          <button
                            onClick={submitRating}
                            className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all text-xs"
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <span className="text-emerald-700 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-md">Available Today</span>
                <span className="text-slate-900 font-bold text-xl flex items-center">
                  <DollarSign className="w-4 h-4" />
                  500.00
                </span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">Book Appointment</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Select a slot for professional medical consultation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Next slot</p>
                    <p className="font-bold text-slate-800 text-xs mt-1">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(true)}
                className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold shadow-sm hover:bg-slate-800 transition-all text-sm"
              >
                Schedule Appointment
              </button>

              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 pt-2">
                <div className="flex items-center gap-1">
                  <Video className="w-3 h-3 text-slate-300" />
                  VIDEO
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-slate-300" />
                  SECURE
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-slate-300" />
                  VERIFIED
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Quick Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-xs">{doctor.email || "consult@hospital.com"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-xs">+91 94563 42956</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-slate-900/40" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <DialogTitle className="text-xl font-bold text-slate-900 mb-1">Select Time Slot</DialogTitle>
              <p className="text-slate-500 text-sm">Consultation with {doctor.name}</p>
            </div>
            
            <div className="space-y-6">
              <div>
                {slotList.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {slotList.map((slot) => (
                      <button
                        key={slot._id}
                        onClick={() => setSelectedSlot(slot._id)}
                        className={`p-3 rounded-xl text-xs font-bold transition-all border-2 ${
                          selectedSlot === slot._id 
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                          : "bg-slate-50 text-slate-600 border-transparent hover:border-slate-200"
                        }`}
                      >
                        {slot.time} {slot.period} | {new Date(slot.date).toLocaleDateString()}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center bg-slate-50 rounded-xl">
                    <p className="text-slate-400 text-sm italic">No slots available</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all text-xs"
                >
                  Cancel
                </button>
                <button 
                  onClick={bookAppointment} 
                  disabled={!selectedSlot}
                  className="flex-[2] py-3 px-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all disabled:opacity-50 text-xs"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ViewDoctor;
