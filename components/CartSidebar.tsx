'use client';

import { useCartStore } from '@/store/cart';
import { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import Image from 'next/image';

export default function CartSidebar({ locale }: { locale: string }) {
    const { isOpen, toggleCart, items, removeItem, addItem, clearCart } = useCartStore();

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Hydration fix
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleCheckout = async () => {
        // Call Stripe API
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items, locale }),
            });
            const { url } = await response.json();
            if (url) window.location.href = url;
        } catch (error) {
            console.error("Checkout error:", error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black z-[60]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-serif">Shopping Bag ({items.length})</h2>
                            <button onClick={toggleCart} className="text-gray-400 hover:text-primary">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <p>Your bag is empty.</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-20 h-20 bg-gray-50 flex-shrink-0 overflow-hidden">
                                            {item.image && (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-medium text-primary">{item.name}</h3>
                                                <p className="text-sm font-medium">{item.price} {item.currency}</p>
                                            </div>
                                            <div className="flex items-center gap-3 mt-4">
                                                <div className="flex items-center border border-gray-200 rounded-sm">
                                                    <button className="p-1 hover:bg-gray-50"><Minus className="h-3 w-3" /></button>
                                                    <span className="px-2 text-xs">{item.quantity}</span>
                                                    <button className="p-1 hover:bg-gray-50" onClick={() => addItem(item)}><Plus className="h-3 w-3" /></button>
                                                </div>
                                                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 ml-auto">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50">
                                <div className="flex justify-between items-center mb-4 text-lg font-medium">
                                    <span>Subtotal</span>
                                    <span>{total.toFixed(2)}</span>
                                </div>
                                <Button className="w-full" onClick={handleCheckout}>Checkout</Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
