import { getEnvVar } from '@/utils/env'

export const PAYSTACK_PUBLIC_KEY = getEnvVar('VITE_PAYSTACK_PUBLIC_KEY')

// Test card for development:
// Card Number: 4084 0840 8408 4081
// Expiry Date: Any future date
// CVV: 408
// PIN: 0000
// OTP: 123456 