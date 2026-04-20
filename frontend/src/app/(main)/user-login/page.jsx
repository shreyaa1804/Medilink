'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);

      axios
        .post('http://localhost:5000/user/authenticate', values)
        .then((response) => {
          toast.success('Login Success');
          router.push('/browse-doctor');
          localStorage.setItem('token', response.data.token);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    },
    validationSchema: loginSchema,
  });

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#0a0f1c] overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />

      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-rose-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute top-[40%] left-[60%] w-[20rem] h-[20rem] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>

      <div className="relative w-full max-w-md z-10 animate-fade-in-up">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-2xl bg-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] border border-white/10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-400 text-sm">
              Sign in to continue to your dashboard.
            </p>
          </div>

          <form onSubmit={loginForm.handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <input
                type="text"
                id="email"
                name="email"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.email}
                placeholder=" "
                className="peer w-full bg-black/20 text-white border border-white/10 rounded-2xl px-5 pt-7 pb-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-transparent hover:bg-black/30"
              />
              <label
                htmlFor="email"
                className="absolute left-5 top-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:normal-case peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-indigo-400 peer-focus:uppercase"
              >
                Email Address
              </label>
              {loginForm.touched.email && loginForm.errors.email && (
                <p className="text-xs text-rose-400 mt-2 flex items-center">
                  <span className="mr-1">⚠</span> {loginForm.errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.password}
                placeholder=" "
                className="peer w-full bg-black/20 text-white border border-white/10 rounded-2xl px-5 pt-7 pb-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-transparent hover:bg-black/30"
              />
              <label
                htmlFor="password"
                className="absolute left-5 top-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:normal-case peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-indigo-400 peer-focus:uppercase"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {loginForm.touched.password && loginForm.errors.password && (
                <p className="text-xs text-rose-400 mt-2 flex items-center">
                  <span className="mr-1">⚠</span> {loginForm.errors.password}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 px-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-black/30 border-white/10 rounded text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0 transition-colors"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors hover:underline decoration-indigo-400/50 underline-offset-4"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 text-white rounded-2xl font-bold text-[15px] tracking-wide hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(99,102,241,0.6)] active:scale-95"
            >
              Sign In
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{' '}
              <a
                href="signup"
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400 hover:opacity-80 transition-opacity ml-1"
              >
                Create one now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;