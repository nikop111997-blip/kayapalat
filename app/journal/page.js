'use client'
import React, { useState, useEffect } from 'react';
import { BUNDLES } from '@/lib/data';
import Hero from '@/component/HeroForJpunrel';
import Features from '@/component/Feature';
import LookInside from '@/component/LookInside';
import Pricing from '@/component/Pricing';
import Testimonials from '@/component/Testimonials';
import AboutAuthor from '@/component/Author';
import FAQ from '@/component/FAQs';
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
    firstName: '', lastName: '', email: '', phone: '',
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

  const handlePlaceOrder = () => {
    setCheckoutStep('processing');
    setTimeout(() => setCheckoutStep('success'), 2500);
  };

  const resetCart = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setCheckoutStep('cart');
      setQuantity(1);
      setBuyerData({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
    }, 300);
  };

  const openCartWithBundle = (bundle) => {
    setSelectedBundle(bundle);
    setIsCartOpen(true);
  };

  const totalPrice = selectedBundle.price * quantity;

  return (
    <div className="min-h-screen font-sans text-[#1a1a1a] selection:bg-[#ff6a3d] selection:text-white pb-20 md:pb-0">
      
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
      <Testimonials />
      <AboutAuthor />
      <FAQ />
      
      <MobileStickyCart 
        isScrolled={isScrolled} 
        openCartWithBundle={openCartWithBundle} 
      />
    </div>
  );
}