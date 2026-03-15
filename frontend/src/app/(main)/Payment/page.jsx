'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const QRCode = dynamic(
  () => import('qrcode.react').then(mod => mod.default),
  { ssr: false }
);

const Payment = () => {
  const [method, setMethod] = useState('');
  const [qrData, setQrData] = useState('');

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
    if (e.target.value === 'qr') {
      setQrData('https://your-payment-link.example.com'); // customize this data
    } else {
      setQrData('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Select Payment Method</h1>
      <select
        className="border p-2 w-full mb-4"
        value={method}
        onChange={handleMethodChange}
      >
        <option value="">-- Choose --</option>
        <option value="card">Card Payment</option>
        <option value="qr">QR Payment</option>
      </select>

      {method === 'qr' && (
        <div className="flex justify-center">
          <QRCode value={qrData} size={256} />
        </div>
      )}

      {method === 'card' && <p>Card payment form goes here (or mock it for now)</p>}
    </div>
  );
};

export default Payment;
