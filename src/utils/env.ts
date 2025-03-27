export const getEnvVar = (key: string): string => {
  const value = import.meta.env[key]
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`)
  }
  return value
}

export const FLUTTERWAVE_PUBLIC_KEY = getEnvVar('VITE_FLUTTERWAVE_PUBLIC_KEY')
export const SUPABASE_URL = getEnvVar('VITE_SUPABASE_URL')
export const SUPABASE_ANON_KEY = getEnvVar('VITE_SUPABASE_ANON_KEY') 