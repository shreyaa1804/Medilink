'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special character')
    .required('Required'),
});

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const signupForm = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log(values);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, values)
        .then((response) => {
          console.log(response.status);
          resetForm();
          toast.success('User Registered Successfully');
          router.push('/login');
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.code === 11000) {
            toast.error('Email already exists');
          }
          setSubmitting(false);
        });
    },
    validationSchema: signupSchema,
  });

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
           <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            USER SIGNUP
          </h2>

        <form onSubmit={signupForm.handleSubmit}>
          {/* Full Name Field */}
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              onChange={signupForm.handleChange}
              value={signupForm.values.fullName}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your full name"
            />
            {signupForm.touched.fullName && signupForm.errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{signupForm.errors.fullName}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={signupForm.handleChange}
              value={signupForm.values.email}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
            {signupForm.touched.email && signupForm.errors.email && (
              <p className="mt-1 text-sm text-red-500">{signupForm.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="mb-2 block text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={signupForm.handleChange}
                value={signupForm.values.password}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {signupForm.touched.password && signupForm.errors.password && (
              <p className="mt-1 text-sm text-red-500">{signupForm.errors.password}</p>
            )}
            {/* Password Requirements */}
            <div className="mt-2 space-y-1">
              <p className={`text-xs ${signupForm.values.password.length >= 8 ? 'text-green-500' : 'text-gray-500'}`}>
                ✓ Minimum 8 characters
              </p>
              <p className={`text-xs ${/[A-Z]/.test(signupForm.values.password) ? 'text-green-500' : 'text-gray-500'}`}>
                ✓ 1 uppercase
              </p>
              <p className={`text-xs ${/[!@#$%^&*(),.?":{}|<>]/.test(signupForm.values.password) ? 'text-green-500' : 'text-gray-500'}`}>
                ✓ Atleast 1 special character
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-3 text-white hover:bg-blue-600 focus:outline-none"
          >
            Create account
          </button>
        </form>

        {/* Login Redirect */}
        <div className="mt-6 text-center">
          <a href="forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </a>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <a href="login" className="text-blue-500 hover:underline">
              Log in
            </a>
      
          </p>
           <p className="mt-4 text-sm text-gray-600">
            Doctor's account?{' '}
            <a href="/doctor-signup" className="text-orange-500 hover:underline">
              SignUp
            </a>
      
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;