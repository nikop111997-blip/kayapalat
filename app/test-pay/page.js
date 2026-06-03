"use client";
export default function TestOrderPage() {
  const startPayment = async () => {
    try {
      // Create Order
      const orderRes = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user123",
          productId: "course001",
          amount: 10,
          name: "Puneet Sharma",
          email: "puneet@gmail.com",
          phone: "8005908750",
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {
        alert(orderData.error || "Order creation failed");
        return;
      }

      console.log("Order Created:", orderData);

      // Create Payment Request
      const paymentRes = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderData.orderId,
        }),
      });

      const paymentData = await paymentRes.json();

      console.log("Payment Response:", paymentData);

      if (!paymentData.success) {
        alert(paymentData.error || paymentData.message);
        return;
      }

      window.location.href = paymentData.paymentUrl;
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="p-10">
      <button
        onClick={startPayment}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Pay ₹999
      </button>
    </div>
  );
}