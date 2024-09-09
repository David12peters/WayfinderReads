import React from 'react';
import './src/App';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function App() {
  const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: 200,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'davidoluwaseun874@gmail.com',
      phone_number: '08087846847',
      name: 'David Peters',
    },
    customizations: {
      title: 'Books Purchase',
      description: 'Payment for items bought in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div 
      className="App" 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        flexDirection: 'column',
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Flutterwave Payment</h1>
    </div>
  );
}