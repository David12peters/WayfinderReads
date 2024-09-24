import React from 'react';
import ProductImage from '../assets/Payment-success.jpg';

const SuccessPage = () => {
  return (
    <div className="sc-container">
      <h1>Payment Successful!</h1>
      <p>Your order will arrive shortly. Click the whatsapp icon in the contacts section at the bottom of the Page to get your order.</p>
      <img src={ProductImage} alt="Product" />
      <a href="https://wayfinder-reads.vercel.app" className="sc-btn">
        Back To Homepage
      </a>
    </div>
  );
};

export default SuccessPage;
