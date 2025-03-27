import { supabase } from '@/lib/supabase/client'
import crypto from 'crypto'

// Verify Flutterwave webhook signature
const verifyWebhookSignature = (signature: string, payload: string, secretHash: string) => {
  const expectedSignature = crypto
    .createHmac('sha256', secretHash)
    .update(payload)
    .digest('hex')
  
  return signature === expectedSignature
}

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('verif-hash')
    const payload = await req.text()
    const secretHash = process.env.FLUTTERWAVE_SECRET_HASH

    if (!signature || !secretHash) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Verify webhook signature
    if (!verifyWebhookSignature(signature, payload, secretHash)) {
      return new Response('Invalid signature', { status: 401 })
    }

    const event = JSON.parse(payload)

    // Handle different webhook events
    switch (event.event) {
      case 'charge.completed':
        if (event.data.status === 'successful') {
          // Update order status in database
          const { error } = await supabase
            .from('orders')
            .update({ 
              status: 'confirmed',
              payment_details: event.data 
            })
            .eq('transaction_id', event.data.id)

          if (error) throw error

          // You might want to send email confirmation here
        }
        break

      case 'transfer.completed':
        // Handle transfer completion
        break

      // Add more event handlers as needed
    }

    return new Response('Webhook processed', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Webhook processing failed', { status: 500 })
  }
} 