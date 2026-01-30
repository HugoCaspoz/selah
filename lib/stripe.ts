import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key', {
    apiVersion: '2025-01-27.acacia' as any, // Cast to any to avoid strict typing issues if SDK wobbles
    typescript: true,
});
