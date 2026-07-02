'use client'
import React, { useState, useEffect } from 'react';
import { BUNDLES } from '@/lib/data';
import Hero from '@/component/HeroForJpunrel';
import Features from '@/component/Feature';
import LookInside from '@/component/LookInside';
import Pricing from '@/component/Pricing';

import MobileStickyCart from '@/component/MobileStickyCart';
import CartDrawer from '@/component/CartDrawer';

export default function KPJournalLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Cart & Checkout States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'details' | 'payment' | 'processing' | 'success'
  const [selectedBundle, setSelectedBundle] = useState(BUNDLES[0]);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  
  // Form State
  const [buyerData, setBuyerData] = useState({
    name:"", email: '', phone: '',
    address: '', city: '', state: '', pincode: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // --- EFFECTS ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isCartOpen]);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateDetails = () => {
    const errors = {};
    if (!buyerData.firstName.trim()) errors.firstName = 'Required';
    if (!buyerData.email.trim() || !/^\S+@\S+\.\S+$/.test(buyerData.email)) errors.email = 'Valid email required';
    if (!buyerData.phone.trim() || buyerData.phone.length < 10) errors.phone = 'Valid phone required';
    if (!buyerData.address.trim()) errors.address = 'Required';
    if (!buyerData.city.trim()) errors.city = 'Required';
    if (!buyerData.pincode.trim() || buyerData.pincode.length < 6) errors.pincode = 'Valid pincode required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToDetails = () => setCheckoutStep('details');

  const handleProceedToPayment = () => {
    if (validateDetails()) setCheckoutStep('payment');
  };

 const handlePlaceOrder = async () => {
  const errors = {};

  if (!buyerData.name?.trim() || buyerData.name.trim().length < 4) {
    errors.name = "Name must be at least 4 characters";
  }

  if (!buyerData.email?.trim()) {
    errors.email = "Email is required";
  }

  if (!buyerData.phone || !/^\d{10}$/.test(buyerData.phone)) {
    errors.phone = "Phone must be exactly 10 digits";
  }

  if (!buyerData.address?.trim()) {
    errors.address = "Address is required";
  }

  if (!buyerData.city?.trim()) {
    errors.city = "City is required";
  }

  if (!buyerData.pincode || !/^\d{6}$/.test(buyerData.pincode)) {
    errors.pincode = "Valid pincode required";
  }

  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }

  const totalPrice = selectedBundle.price * quantity;

  // Get UTM parameters
  const params = new URLSearchParams(window.location.search);

  const utm = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
  };

  try {
    setCheckoutStep("processing");

    const response = await fetch("/api/place-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: buyerData,
        product: selectedBundle,
        quantity,
        amount: totalPrice,
        utm,
        landingPage: window.location.href,
        referrer: document.referrer,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    window.location.href = data.paymentUrl;
  } catch (error) {
    console.error(error);
    alert(error.message);
    setCheckoutStep("details");
  }
};

  const resetCart = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setCheckoutStep('cart');
      setQuantity(1);
      setBuyerData({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
    }, 300);
  };

  const openCartWithBundle = (bundle) => {
    setSelectedBundle(bundle);
    setIsCartOpen(true);
  };

  const totalPrice = selectedBundle.price * quantity;

  return (
    <div className="min-h-screen dark:bg-white font-sans text-[#1a1a1a] selection:bg-[#ff6a3d] selection:text-white pb-20 md:pb-0">
      
      <CartDrawer 
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        checkoutStep={checkoutStep}
        setCheckoutStep={setCheckoutStep}
        selectedBundle={selectedBundle}
        quantity={quantity}
        setQuantity={setQuantity}
        totalPrice={totalPrice}
        buyerData={buyerData}
        handleInputChange={handleInputChange}
        formErrors={formErrors}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        handleProceedToDetails={handleProceedToDetails}
        handleProceedToPayment={handleProceedToPayment}
        handlePlaceOrder={handlePlaceOrder}
        resetCart={resetCart}
      />

      <Hero openCartWithBundle={openCartWithBundle} />
      <Features />
      <LookInside />
      <Pricing openCartWithBundle={openCartWithBundle} />
     
      
      <MobileStickyCart 
        isScrolled={isScrolled} 
        openCartWithBundle={openCartWithBundle} 
      />
    </div>
  );
}