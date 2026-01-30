'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

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
        <div className="space-y-6">
            {/* Future: Size Selector here */}

            <Button onClick={handleAddToCart} isLoading={isLoading} className="w-full md:w-auto min-w-[200px]">
                {locale === 'es' ? 'Añadir a la Bolsa' : 'Add to Bag'}
            </Button>
        </div>
    );
}
