// 'use client';
// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export default function DoctorProfile() {
//    const [doctor, setDoctor] = useState(null);
//    const [token, setToken] = useState(null);
//    const runOnce = useRef(false);
 
 
//    // Retrieve token from localStorage
//    useEffect(() => {
//      const savedToken = localStorage.getItem('token');
//      setToken(savedToken);
//    }, []);
 
   
//    // Fetch logged-in doctor's details
//    const fetchLoggedInDoctor = async () => {
//      try {
//        const res = await axios.get('http://localhost:5000/doctor/getbyemail/:email', {
//          headers: { 'x-auth-token': token },
//        });
//        setDoctor(res.data);
//      } catch (error) {
//        console.error('Error fetching logged-in doctor:', error);
//        toast.error('Failed to fetch logged-in doctor details');
//      }
//    };

//   useEffect(() => {
//      if (!runOnce.current && token) {
//        fetchLoggedInDoctor();
//        runOnce.current = true;
//      }
//    }, [token]);
 
//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      
//       {/* Sidebar */}
//       <aside className="w-64 bg-blue-700 text-white p-6 flex flex-col space-y-6">
//         <div className="text-2xl font-semibold">MediLink</div>
//         <h1 className="text-xl font-bold lg:mb-6 text-blue-100">Doctor Dashboard</h1>
//         <ul className="flex flex-col space-y-4">
//           <li>
//             <a href="/doctor/manageappointment" className="hover:bg-blue-500 p-2 rounded block transition-colors">
//               Scheduled Appointments
//             </a>
//           </li>
//           <li>
//             <a href="/doctor/manage-slot" className="hover:bg-blue-500 p-2 rounded block transition-colors bg-blue-600">
//               Manage Slots
//             </a>
//           </li>
//           <li>
//             <a href="/doctor/manage-doctor" className="hover:bg-blue-500 p-2 rounded block transition-colors">
//               Edit Appointments
//             </a>
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-10">
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-4xl font-semibold mb-2 mt-4">Doctor Details</h2>
//           </div>

//           {loading ? (
//             <p className="text-gray-500 mt-4">Loading doctor details...</p>
//           ) : doctor ? (
//             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              
//               {/* Left Column */}
//               <div>
//                 {/* <p className="text-gray-700 mb-2">{doctor.about}</p> */}
//                 <div className="space-y-2">
//                   <p><strong>Specialization:</strong> {doctor.specialization}</p>
//                   <p><strong>Experience:</strong> {doctor.experience}</p>
//                   <p><strong>Consultation Fee:</strong> ₹{doctor.fee}</p>
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
//                 <p><strong>Address:</strong> {doctor.address}</p>
//                 <p><strong>Email:</strong> {doctor.email}</p>
//                 <p><strong>Contact:</strong> {doctor.contact}</p>
//               </div>
//             </div>
//           ) : (
//             <p className="text-red-500 mt-4">Doctor details not found.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }\

'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Star, 
  DollarSign, 
  Settings, 
  LogOut, 
  User, 
  Clock, 
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Bell,
  Search,
  LayoutDashboard,
  FileText,
  Award,
  MapPin,
  Video
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [activeView, setActiveView] = useState('overview');
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const doctorData = localStorage.getItem('doctor');
    const token = localStorage.getItem('token');
    
    if (!doctorData || !token) {
      router.push('/doctor-login');
      return;
    }

    const parsedDoctor = JSON.parse(doctorData);
    setDoctor(parsedDoctor);

    // Fetch dashboard data
    const fetchData = async () => {
      try {
        const [apptsRes, reviewsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/appointment/getbydoctor/${parsedDoctor._id}`, {
            headers: { 'x-auth-token': token }
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/review/getbydoctor/${parsedDoctor._id}`)
        ]);
        setAppointments(apptsRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('doctor');
    toast.success('Logged out successfully');
    router.push('/doctor-login');
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex space-x-2">
          <div className="h-3 w-3 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="h-3 w-3 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
          <div className="h-3 w-3 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Patients', value: appointments.length || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Current Appointments', value: appointments.filter(a => a.status === 'pending').length || 0, icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Average Rating', value: reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '4.8', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Monthly Earnings', value: `₹${(appointments.length * 500).toLocaleString()}`, icon: DollarSign, color: 'text-slate-900', bg: 'bg-slate-100' },
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'profile', label: 'Profile Settings', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-700">
      
      {/* Permanent Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">MediLink<span className="text-blue-600">Pro</span></span>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeView === item.id 
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search patient records..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:text-slate-900 relative border border-slate-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">Dr. {doctor.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doctor.specialization}</p>
              </div>
              <img 
                src={doctor.image || "https://ui-avatars.com/api/?name=Doctor&background=0f172a&color=fff"} 
                className="w-10 h-10 rounded-xl border border-slate-200 object-cover"
                alt="Profile"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          <AnimatePresence mode="wait">
            {activeView === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                      <div className={`absolute top-0 right-0 w-16 h-16 ${stat.bg} rounded-bl-full opacity-30 group-hover:scale-110 transition-transform`}></div>
                      <div className="relative z-10">
                        <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                          <stat.icon className="w-5 h-5" />
                        </div>
                        <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Appointments Table */}
                  <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="font-bold text-slate-900">Upcoming Appointments</h3>
                      <button onClick={() => setActiveView('appointments')} className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <tr>
                            <th className="px-6 py-4">Patient</th>
                            <th className="px-6 py-4">Session</th>
                            <th className="px-6 py-4">Schedule</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {appointments.slice(0, 5).map((appt, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                    {appt.user?.name?.[0] || 'P'}
                                  </div>
                                  <span className="text-sm font-bold text-slate-700">{appt.user?.name || 'Patient'}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                  <Video className="w-3 h-3" />
                                  <span>Video Call</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-xs text-slate-700">
                                  <p className="font-bold">{new Date(appt.slot?.date || Date.now()).toLocaleDateString()}</p>
                                  <p className="text-slate-400">{appt.slot?.time || '10:00 AM'}</p>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-tight">Active</span>
                              </td>
                              <td className="px-6 py-4">
                                <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-900 transition-colors">
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {appointments.length === 0 && (
                            <tr>
                              <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic text-sm">No scheduled sessions.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Activity/Notifications */}
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
                    <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-4">Recent Feedback</h3>
                    <div className="space-y-6">
                      {reviews.slice(0, 3).map((review, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-[10px] font-bold">
                            {review.user?.name?.[0] || 'R'}
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-900">{review.user?.name || 'Authorized Client'}</p>
                            <div className="flex text-amber-400 mb-1">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className={`w-2 h-2 ${j < review.rating ? 'fill-current' : 'text-slate-100'}`} />
                              ))}
                            </div>
                            <p className="text-[11px] text-slate-500 italic leading-tight">"{review.comment}"</p>
                          </div>
                        </div>
                      ))}
                      {reviews.length === 0 && <p className="text-center text-slate-400 text-sm italic">No reviews yet.</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeView === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl"
              >
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="h-40 bg-slate-900 relative">
                    <div className="absolute -bottom-16 left-12">
                      <div className="p-1 rounded-[2rem] bg-white border border-slate-200 shadow-lg">
                        <img 
                          src={doctor.image} 
                          className="w-32 h-32 rounded-[1.5rem] object-cover" 
                          alt="Doctor" 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-24 pb-12 px-12 space-y-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{doctor.name}</h1>
                        <p className="text-xl text-blue-600 font-bold mt-1">{doctor.specialization}</p>
                      </div>
                      <button className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all">
                        Edit Public Profile
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Professional Identity</h3>
                        <div className="space-y-4">
                          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Clinic Email</p>
                            <p className="font-bold text-slate-800 text-sm">{doctor.email}</p>
                          </div>
                          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Registration ID</p>
                            <p className="font-bold text-slate-800 text-sm">MC-2024-{doctor._id.slice(-6).toUpperCase()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Clinical Footprint</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                              <Award className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">{doctor.experience}+ Years Practice</p>
                              <p className="text-xs text-slate-400">Total clinical experience</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">Main Campus</p>
                              <p className="text-xs text-slate-400">{doctor.address || "Authorized Hospital"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              
            )}
            {activeView === 'reviews' && (
  <motion.div
    key="reviews"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-8 max-w-5xl"
  >
    {/* Header */}
    <div>
      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Patient Reviews</h2>
      <p className="text-sm text-slate-400 mt-1">
        {reviews.length} review{reviews.length !== 1 ? 's' : ''} · Avg rating:{' '}
        <span className="text-amber-500 font-bold">
          {reviews.length > 0
            ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
            : 'N/A'}
        </span>
      </p>
    </div>

    {/* Rating Summary Bar */}
    {reviews.length > 0 && (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex items-center gap-10">
        <div className="text-center">
          <p className="text-6xl font-extrabold text-slate-900 tracking-tight">
            {(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)}
          </p>
          <div className="flex justify-center gap-0.5 text-amber-400 my-2">
            {[...Array(5)].map((_, j) => (
              <Star key={j} className={`w-4 h-4 ${j < Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) ? 'fill-current' : 'text-slate-200'}`} />
            ))}
          </div>
          <p className="text-xs text-slate-400 font-bold">{reviews.length} reviews</p>
        </div>
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter(r => r.rating === star).length;
            const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 w-4">{star}</span>
                <Star className="w-3 h-3 text-amber-400 fill-current flex-shrink-0" />
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 w-6">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    )}

    {/* Reviews List */}
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100">
      {reviews.length > 0 ? (
        reviews.map((review, i) => (
          <div key={i} className="p-6 flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm uppercase">
              {review.user?.name?.[0] || 'A'}
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-sm">{review.user?.name || 'Anonymous'}</span>
                <span className="text-[10px] text-slate-400">
                  {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                </span>
              </div>
              <div className="flex gap-0.5 text-amber-400">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                ))}
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{review.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="py-20 text-center">
          <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm italic">No reviews yet.</p>
        </div>
      )}
    </div>
  </motion.div>
)}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

