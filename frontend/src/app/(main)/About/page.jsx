"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "01",
    content:
      "Easily schedule appointments with your preferred doctors. Our platform offers real-time slot availability and user-friendly booking.",
  },
  {
    title: "02",
    content:
      "Consult with expert doctors across various specializations. Get reliable healthcare advice, treatment plans, and follow-ups online or in-person.",
  },
  {
    title: "03",
    content:
      "Make secure payments with our protected gateway. We ensure your data privacy and financial safety at every step.",
  },
];

const About = () => {
  return (
    <div className="bg-gray-100 py-16 px-4">
      {/* Top Section */}
      <>
  {/* Hero */}
  <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
    {/* Grid */}
    <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
      <div className="lg:col-span-3">
        <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-5xl dark:text-white">
        About MediLink
        </h1>
        <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
        At MediLink, our mission is simple: to bring healthcare to your fingertips. We are a modern digital platform designed to connect patients with the right doctors quickly, efficiently, and securely. Whether you're seeking a consultation, choosing from specialized professionals, or managing appointment slots—MediLink makes it all seamless.

We believe that healthcare should be accessible to everyone, and technology can make that possible. From urban areas to remote towns, our platform empowers users to find trusted healthcare providers in just a few clicks.
        </p>
        <div className="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="w-full sm:w-auto">
            <label htmlFor="hero-input" className="sr-only">
              Search
            </label>
           
          </div>
          <a
            className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            href="/book-appointment"
          >
            Book Appointment
          </a>
        </div>
        
        {/* End Brands */}
      </div>
      {/* End Col */}
      <div className="lg:col-span-4 mt-12 lg:mt-0">
        <img
          className="w-full rounded-xl"
          src="https://d1zxene68j3keg.cloudfront.net/sites/default/files/Resouces/images/Doc%20Day_1.jpg"
          alt="Hero Image"
        />
      </div>
      {/* End Col */}
    </div>
    {/* End Grid */}
  </div>
  {/* End Hero */}
</>


      {/* Feature Cards */}
      <>
  {/* Features */}
  <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-8 mx-auto">
    <div className="relative p-6 md:p-16">
      {/* Grid */}
      <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
        <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
          <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl dark:text-neutral-200">
          Why Choose MediLink?
          </h2>
          {/* Tab Navs */}
          <nav
            className="grid gap-4 mt-5 md:mt-10"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              type="button"
              className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 active"
              id="tabs-with-card-item-1"
              aria-selected="true"
              data-hs-tab="#tabs-with-card-1"
              aria-controls="tabs-with-card-1"
              role="tab"
            >
              <span className="flex gap-x-6">
                <svg
                  className="shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-neutral-200"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                  <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                  <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                  <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
                  <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
                </svg>
                <span className="grow">
                  <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-neutral-200">
                  Easy Doctor Discovery
                  </span>
                  <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">
                    Find the right doctor for your needs. Our platform offers a comprehensive directory of healthcare professionals across various specialties.
                  </span>
                </span>
              </span>
            </button>
            <button
              type="button"
              className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              id="tabs-with-card-item-2"
              aria-selected="false"
              data-hs-tab="#tabs-with-card-2"
              aria-controls="tabs-with-card-2"
              role="tab"
            >
              <span className="flex gap-x-6">
                <svg
                  className="shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-neutral-200"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 14 4-4" />
                  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                </svg>
                <span className="grow">
                  <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-neutral-200">
                  Hassle-Free Appointments
                  </span>
                  <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">
                    Book appointments with ease. Our platform offers a user-friendly interface for scheduling and managing your healthcare needs.
                  </span>
                </span>
              </span>
            </button>
            <button
              type="button"
              className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              id="tabs-with-card-item-3"
              aria-selected="false"
              data-hs-tab="#tabs-with-card-3"
              aria-controls="tabs-with-card-3"
              role="tab"
            >
              <span className="flex gap-x-6">
                <svg
                  className="shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-neutral-200"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  <path d="M5 3v4" />
                  <path d="M19 17v4" />
                  <path d="M3 5h4" />
                  <path d="M17 19h4" />
                </svg>
                <span className="grow">
                  <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-neutral-200">
                    Secure Payments
                  </span>
                  <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">
                    Make secure payments for your healthcare services. Our platform ensures that your financial information is protected at all times.
                  </span>
                </span>
              </span>
            </button>
          </nav>
          {/* End Tab Navs */}
        </div>
        {/* End Col */}
        <div className="lg:col-span-6">
          <div className="relative">
            {/* Tab Content */}
            <div>
              <div
                id="tabs-with-card-1"
                role="tabpanel"
                aria-labelledby="tabs-with-card-item-1"
              >
                <img
                  className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20"
                  src="https://www.usnews.com/object/image/00000184-5d22-d253-a784-dda799cf0000/gettyimages-1390026192.jpg?update-time=1668009859280&size=responsive640"
                  alt="Features Image"
                />
              </div>
              <div
                id="tabs-with-card-2"
                className="hidden"
                role="tabpanel"
                aria-labelledby="tabs-with-card-item-2"
              >
                <img
                  className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20"
                  src="https://images.unsplash.com/photo-1665686306574-1ace09918530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&h=720&q=80"
                  alt="Features Image"
                />
              </div>
              <div
                id="tabs-with-card-3"
                className="hidden"
                role="tabpanel"
                aria-labelledby="tabs-with-card-item-3"
              >
                <img
                  className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20"
                  src="https://images.unsplash.com/photo-1598929213452-52d72f63e307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&h=720&q=80"
                  alt="Features Image"
                />
              </div>
            </div>
            {/* End Tab Content */}
            {/* SVG Element */}
            <div className="hidden absolute top-0 end-0 translate-x-20 md:block lg:translate-x-20">
              <svg
                className="w-16 h-auto text-orange-500"
                width={121}
                height={135}
                viewBox="0 0 121 135"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                  stroke="currentColor"
                  strokeWidth={10}
                  strokeLinecap="round"
                />
                <path
                  d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                  stroke="currentColor"
                  strokeWidth={10}
                  strokeLinecap="round"
                />
                <path
                  d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                  stroke="currentColor"
                  strokeWidth={10}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            {/* End SVG Element */}
          </div>
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
      {/* Background Color */}
      <div className="absolute inset-0 grid grid-cols-12 size-full">
        <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full dark:bg-neutral-800" />
      </div>
      {/* End Background Color */}
    </div>
  </div>
  {/* End Features */}
</>

    </div>
  );
};

export default About;