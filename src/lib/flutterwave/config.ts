import { getEnvVar } from '@/utils/env'

export const FLUTTERWAVE_PUBLIC_KEY = getEnvVar('VITE_FLUTTERWAVE_PUBLIC_KEY')

// Test card for development:
// Card Number: 5531 8866 5214 2950
// Expiry: 09/32
// CVV: 564
// PIN: 3310
// OTP: 12345 