
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

// Helper to generate QR token (mock)
function generateQrToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;

        console.log('Payment successful for session:', session.id);

        // 1. Create Order in Supabase
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                email: session.customer_details?.email || 'guest@example.com',
                stripe_session_id: session.id,
                amount_total: session.amount_total / 100, // Convert from cents
                currency: session.currency,
                status: 'paid'
            })
            .select()
            .single();

        if (orderError) {
            console.error('Error creating order:', orderError);
            return NextResponse.json({ error: 'Order creation failed' }, { status: 500 });
        }

        // 2. Generate QR Token
        const qrToken = generateQrToken();

        const { error: qrError } = await supabase
            .from('qr_access')
            .insert({
                order_id: order.id,
                qr_token: qrToken,
                expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
            });

        if (qrError) {
            console.error('Error creating QR token:', qrError);
        }

        // 3. Send Email (Mock)
        console.log(`[EMAIL SENT] To: ${session.customer_details?.email}, Token: ${qrToken}`);
    }

    return NextResponse.json({ received: true });
}
