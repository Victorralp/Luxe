import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import { FLUTTERWAVE_PUBLIC_KEY } from '@/lib/flutterwave/config'

interface FlutterwavePaymentProps {
  amount: number // Amount in Naira
  email: string
  name: string
  phone: string
  reference: string
  onSuccess: (reference: string) => void
  onError: (error: string) => void
}

export function FlutterwavePayment({
  amount,
  email,
  name,
  phone,
  reference,
  onSuccess,
  onError,
}: FlutterwavePaymentProps) {
  const config = {
    public_key: FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: reference,
    amount, // Flutterwave accepts number for amount
    currency: 'NGN',
    payment_options: 'card,ussd,banktransfer',
    customer: {
      email,
      name,
      phone_number: phone,
    },
    customizations: {
      title: 'GlamShopperia',
      description: 'Payment for your order',
      logo: 'https://your-logo-url.png', // Add your logo URL here
    },
  }

  const handleFlutterPayment = useFlutterwave(config)

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
        <p className="text-gray-600">Amount: ₦{amount.toLocaleString()}</p>
        <p className="text-gray-600">Email: {email}</p>
        <p className="text-gray-600">Name: {name}</p>
        <p className="text-gray-600">Phone: {phone}</p>
      </div>
      
      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response: any) => {
              if (response.status === 'successful') {
                onSuccess(response.transaction_id.toString())
              } else {
                onError('Payment failed')
              }
              closePaymentModal()
            },
            onClose: () => {
              onError('Payment cancelled')
            },
          })
        }}
        className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700"
      >
        Pay ₦{amount.toLocaleString()}
      </button>

      <div className="mt-4 text-sm text-gray-500">
        <p>Supported payment methods:</p>
        <ul className="list-disc list-inside">
          <li>Cards (Mastercard, Visa, Verve)</li>
          <li>Bank Transfer</li>
          <li>USSD</li>
          <li>Bank Account</li>
          <li>Mobile Money</li>
        </ul>
      </div>
    </div>
  )
} 