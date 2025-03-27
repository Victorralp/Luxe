import { useEffect } from 'react'
import { usePaystackPayment } from 'react-paystack'
import { PAYSTACK_PUBLIC_KEY } from '@/lib/paystack/config'

interface PaystackPaymentProps {
  amount: number // Amount in Naira (will be converted to kobo)
  email: string
  reference: string
  onSuccess: (reference: string) => void
  onError: (error: string) => void
}

export function PaystackPayment({
  amount,
  email,
  reference,
  onSuccess,
  onError,
}: PaystackPaymentProps) {
  const config = {
    reference,
    email,
    amount: amount * 100, // Convert to kobo
    publicKey: PAYSTACK_PUBLIC_KEY,
  }

  const initializePayment = usePaystackPayment(config)

  const handlePayment = () => {
    initializePayment({
      onSuccess: () => onSuccess(reference),
      onClose: () => onError('Transaction cancelled')
    })
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
        <p className="text-gray-600">Amount: ₦{amount.toLocaleString()}</p>
        <p className="text-gray-600">Email: {email}</p>
      </div>
      
      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        Pay ₦{amount.toLocaleString()}
      </button>

      <div className="mt-4 text-sm text-gray-500">
        <p>Supported payment methods:</p>
        <ul className="list-disc list-inside">
          <li>Nigerian bank cards</li>
          <li>Bank transfers</li>
          <li>USSD</li>
          <li>Bank accounts</li>
        </ul>
      </div>
    </div>
  )
} 