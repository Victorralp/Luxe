import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FlutterwavePayment } from '@/components/FlutterwavePayment'
import { useCart } from '@/hooks/useCart' // We'll create this hook next
import { supabase } from '@/lib/supabase/client'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
  })

  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))
  }

  const handlePaymentSuccess = async (transactionId: string) => {
    try {
      // Save order to database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_info: customerInfo,
          items: cart,
          total_amount: totalAmount,
          transaction_id: transactionId,
          status: 'paid'
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Clear cart
      clearCart()

      // Redirect to success page
      navigate(`/order-success/${order.id}`)
    } catch (error) {
      console.error('Error saving order:', error)
    }
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error)
    // You might want to show an error message to the user
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>₦{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Information Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Delivery Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={customerInfo.address}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Payment Section */}
      {customerInfo.email && customerInfo.name && customerInfo.phone && customerInfo.address && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <FlutterwavePayment
            amount={totalAmount}
            email={customerInfo.email}
            name={customerInfo.name}
            phone={customerInfo.phone}
            reference={`order-${Date.now()}`}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      )}
    </div>
  )
} 