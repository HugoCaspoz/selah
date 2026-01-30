'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface Product {
    id: number;
    slug: string;
    name_en: string; // Simplification for demo, real app picks based on locale
    name_es: string;
    price_eur: number;
    price_usd: number;
    images: string[];
}

interface ProductCardProps {
    product: Product;
    locale: string;
    index: number;
}

export default function ProductCard({ product, locale, index }: ProductCardProps) {
    const name = locale === 'es' ? product.name_es : product.name_en;
    const price = locale === 'es' ? `€${product.price_eur}` : `$${product.price_usd}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer"
        >
            <Link href={`/${locale}/product/${product.slug}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-sm shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                    {/* Image Placeholder if no images */}
                    {product.images?.[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted">
                            No Image
                        </div>
                    )}
                </div>
                <div className="space-y-1">
                    <h3 className="font-sans font-bold text-primary group-hover:underline decoration-1 underline-offset-4">
                        {name}
                    </h3>
                    <p className="font-sans text-muted">{price}</p>
                </div>
            </Link>
        </motion.div>
    );
}
