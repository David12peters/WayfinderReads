import React from 'react';
import ProductImage from '../assets/Payment-success.jpg';

const SuccessPage = () => {
  return (
    <div className="sc-container">
      <h1>Payment Successful!</h1>
      <p>Your order will arrive in 2 business days</p>
      <img src={ProductImage} alt="Product" />
      <a href="/" className="sc-btn">
        Back To Homepage
      </a>
    </div>
  );
};

export default SuccessPage;
