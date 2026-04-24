'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Validation Schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const router = useRouter();

  // Formik Hook to handle form state and validation
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/doctor/authenticate`, values);
        toast.success('Login Successful');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('doctor', JSON.stringify(response.data));
        // router.push('/doctor/doctor-dashboard');
        const id=response.data._id;
        router.push(`/dashboard/${id}`);
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || 'Invalid credentials or server error');
      }
    },
    validationSchema: loginSchema,
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Section - Hero/Info */}
      <div className="lg:w-1/2 bg-slate-900 p-12 lg:p-24 flex flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500 rounded-full blur-[100px]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-400 text-sm font-bold">
            <ShieldCheck className="w-4 h-4" />
            Healthcare Provider Portal
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Advanced Care, <br />
            <span className="text-blue-500">Simplified</span> Workflow.
          </h1>
          
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            Welcome back, Doctor. MediLink provides you with the most advanced tools to manage appointments and connect with patients seamlessly.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold text-white">100k+</p>
              <p className="text-slate-500 text-sm">Consultations Managed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">99.9%</p>
              <p className="text-slate-500 text-sm">Uptime for Providers</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Doctor Login</h2>
              <p className="text-slate-500 mt-2 text-sm">Enter your credentials to manage your dashboard.</p>
            </div>

            <form onSubmit={loginForm.handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1" htmlFor="email">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input
                    type="email"
                    id="email"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.email}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border ${loginForm.touched.email && loginForm.errors.email ? 'border-rose-300' : 'border-slate-200'} bg-slate-50 focus:bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all outline-none text-slate-700 font-medium`}
                    placeholder="name@clinic.com"
                  />
                </div>
                {loginForm.touched.email && loginForm.errors.email && (
                  <p className="text-[10px] text-rose-500 font-bold pl-1 uppercase tracking-tighter">{loginForm.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest" htmlFor="password">Password</label>
                  <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input
                    type="password"
                    id="password"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.password}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border ${loginForm.touched.password && loginForm.errors.password ? 'border-rose-300' : 'border-slate-200'} bg-slate-50 focus:bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all outline-none text-slate-700 font-medium`}
                    placeholder="••••••••"
                  />
                </div>
                {loginForm.touched.password && loginForm.errors.password && (
                  <p className="text-[10px] text-rose-500 font-bold pl-1 uppercase tracking-tighter">{loginForm.errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Sign In
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-slate-100 text-center">
              <p className="text-slate-500 text-sm">
                New to MediLink? 
                <a href="/doctor-signup" className="ml-2 font-bold text-slate-900 hover:text-blue-600 transition-colors">Apply as Provider</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
