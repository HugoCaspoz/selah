'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/Accordion';

export default function ProductDetailClient({ product, locale }: { product: any, locale: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const addItem = useCartStore((state) => state.addItem);
    const toggleCart = useCartStore((state) => state.toggleCart);

    const handleAddToCart = () => {
        setIsLoading(true);

        // Simulate network delay for effect
        setTimeout(() => {
            addItem({
                id: product.id,
                name: locale === 'es' ? product.name_es : product.name_en,
                price: locale === 'es' ? product.price_eur : product.price_usd,
                currency: locale === 'es' ? 'EUR' : 'USD',
                image: product.images?.[0] || '',
                quantity: 1
            });
            setIsLoading(false);
            toggleCart(); // Open cart to show success
        }, 600);
    };

    return (
        <div className="space-y-12">
            <div className="space-y-6">
                {/* Color Selector Mock */}
                <div className="space-y-2">
                    <span className="text-xs tracking-widest uppercase text-muted">Color</span>
                    <div className="flex gap-3">
                        <button className="w-8 h-8 rounded-full bg-[#E5E0D8] ring-1 ring-offset-2 ring-primary"></button>
                        <button className="w-8 h-8 rounded-full bg-[#1A1A1A] hover:scale-110 transition-transform"></button>
                    </div>
                </div>

                {/* Size Mock */}
                {product.slug.includes('camiseta') && (
                    <div className="space-y-2">
                        <span className="text-xs tracking-widest uppercase text-muted">Size</span>
                        <div className="flex gap-4">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <button key={size} className="w-10 h-10 border border-gray-200 text-sm hover:border-primary transition-colors flex items-center justify-center">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <Button onClick={handleAddToCart} isLoading={isLoading} className="w-full">
                    {locale === 'es' ? 'Añadir a la Bolsa' : 'Add to Bag'}
                </Button>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-100">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="uppercase tracking-widest text-xs">{locale === 'es' ? 'Materiales' : 'Materials'}</AccordionTrigger>
                        <AccordionContent>
                            {locale === 'es'
                                ? '100% Algodón Orgánico Certificado GOTS. Cultivado sin pesticidas sintéticos y teñido con procesos de bajo impacto hídrico.'
                                : '100% GOTS Certified Organic Cotton. Grown without synthetic pesticides and dyed with low-impact water processes.'}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="uppercase tracking-widest text-xs">{locale === 'es' ? 'Cuidados' : 'Care'}</AccordionTrigger>
                        <AccordionContent>
                            {locale === 'es'
                                ? 'Lavar en frío (30°C). No usar secadora. Planchar a baja temperatura.'
                                : 'Wash cold (30°C). Do not tumble dry. Iron low.'}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="uppercase tracking-widest text-xs">{locale === 'es' ? 'Envío & Devoluciones' : 'Shipping & Returns'}</AccordionTrigger>
                        <AccordionContent>
                            {locale === 'es'
                                ? 'Envío gratuito en pedidos superiores a 150€. Devoluciones aceptadas en un plazo de 14 días.'
                                : 'Free shipping on orders over $150. Returns accepted within 14 days.'}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
