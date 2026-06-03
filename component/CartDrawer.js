import React from 'react';
import { X, Minus, Plus, Shield, Smartphone, CreditCard, Wallet, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

export default function CartDrawer({
  isCartOpen, setIsCartOpen, checkoutStep, setCheckoutStep,
  selectedBundle, quantity, setQuantity, totalPrice,
  buyerData, handleInputChange, formErrors,
  paymentMethod, setPaymentMethod,
  handleProceedToDetails, handleProceedToPayment, handlePlaceOrder, resetCart
}) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => checkoutStep === 'success' ? resetCart() : setIsCartOpen(false)}
      />

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#1a1a1a]">
            {checkoutStep === 'cart' ? 'Your Cart' :
              checkoutStep === 'details' ? 'Shipping Details' :
                checkoutStep === 'payment' ? 'Secure Payment' :
                  checkoutStep === 'success' ? 'Order Confirmed' : 'Processing...'}
          </h2>
          {checkoutStep !== 'processing' && checkoutStep !== 'success' && (
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {checkoutStep === 'cart' && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                <div className="w-20 h-24 bg-[#1a1a1a] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#ffd700] font-serif text-xs text-center leading-tight">KP<br />JOURNAL</span>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[#1a1a1a]">{selectedBundle.name}</h3>
                    <p className="text-sm text-gray-500">{selectedBundle.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-1">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:bg-white rounded shadow-sm text-gray-600"><Minus className="w-4 h-4" /></button>
                      <span className="font-medium w-4 text-center">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:bg-white rounded shadow-sm text-gray-600"><Plus className="w-4 h-4" /></button>
                    </div>
                    <span className="font-bold">₹{selectedBundle.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="h-px bg-gray-100 my-2"></div>
                <div className="flex justify-between text-lg font-bold text-[#1a1a1a]">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                18% GST and Convenience Fee will be added during checkout
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500 justify-center">
                <Shield className="w-4 h-4 text-green-600" /> Secure Checkout
              </div>
            </div>
          )}

          {checkoutStep === 'details' && (
            <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" value={buyerData.name} onChange={handleInputChange} className={`w-full p-3 rounded-xl border ${formErrors.firstName ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#ff6a3d]/20 outline-none`} />
                </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" name="email" value={buyerData.email} onChange={handleInputChange} className={`w-full p-3 rounded-xl border ${formErrors.email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#ff6a3d]/20 outline-none`} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" name="phone" value={buyerData.phone} onChange={handleInputChange} className={`w-full p-3 rounded-xl border ${formErrors.phone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#ff6a3d]/20 outline-none`} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Address</label>
                <textarea name="address" rows="2" value={buyerData.address} onChange={handleInputChange} className={`w-full p-3 rounded-xl border ${formErrors.address ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#ff6a3d]/20 outline-none`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                  <input type="text" name="city" value={buyerData.city} onChange={handleInputChange} className={`w-full p-3 rounded-xl border ${formErrors.city ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#ff6a3d]/20 outline-none`} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Pincode</label>
                  <input type="text" name="pincode" value={buyerData.pincode} onChange={handleInputChange} className={`w-full p-3 rounded-xl border ${formErrors.pincode ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#ff6a3d]/20 outline-none`} />
                </div>
              </div>
            </div>
          )}

      

          {checkoutStep === 'processing' && (
            <div className="h-full flex flex-col items-center justify-center space-y-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#ff6a3d] rounded-full border-t-transparent animate-spin"></div>
                <Lock className="absolute inset-0 m-auto w-6 h-6 text-gray-400" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Processing Payment...</h3>
                <p className="text-gray-500 text-sm">Please do not close this window.</p>
              </div>
            </div>
          )}

          {checkoutStep === 'success' && (
            <div className="h-full flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-100">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2 text-[#1a1a1a]">Order Confirmed!</h3>
                <p className="text-gray-500">Thank you, {buyerData.firstName || 'Customer'}. Your journey to discipline begins now.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl w-full border border-gray-100 text-left">
                <p className="text-sm text-gray-500 mb-1">Order ID: <span className="font-mono text-gray-800">#KP{Math.floor(Math.random() * 90000) + 10000}</span></p>
                <p className="text-sm text-gray-500">Estimated Delivery: 3-5 Business Days</p>
              </div>
            </div>
          )}
        </div>

        {checkoutStep !== 'processing' && checkoutStep !== 'success' && (
          <div className="p-6 bg-white border-t border-gray-100">
            {checkoutStep === 'cart' && (
              <button
                onClick={handleProceedToDetails}
                className="w-full bg-[#1a1a1a] hover:bg-[#ff6a3d] text-white font-bold py-4 rounded-xl transition-colors shadow-lg flex justify-center items-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
            )}
            {checkoutStep === 'details' && (
              <div className="flex gap-3">
                <button onClick={() => setCheckoutStep('cart')} className="px-6 py-4 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition-colors">Back</button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-[#1a1a1a] hover:bg-[#ff6a3d] text-white font-bold py-4 rounded-xl transition-colors shadow-lg flex justify-center items-center gap-2"
                >
                  Continue to Payment <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
           
          </div>
        )}
      </div>
    </>
  );
}