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
    // const description = locale === 'es' ? product.description_es : product.description_en; // Use if available
    const price = locale === 'es' ? `€${product.price_eur}` : `$${product.price_usd}`;

    // Mock "Tech Spec" line based on category (In real app, this would be a DB field)
    const techSpec = product.slug.includes('camiseta') ? 'Algodón Orgánico 240g' :
        product.slug.includes('anillo') ? 'Plata de Ley .925' :
            product.slug.includes('reloj') ? 'Cristal de Zafiro' : 'Edición Limitada';

    // Second image for hover effect (use first if only one exists, but effectively no change)
    const image1 = product.images?.[0];
    const image2 = product.images?.[1] || image1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            className="group cursor-pointer flex flex-col h-full"
        >
            <Link href={`/${locale}/product/${product.slug}`} className="block h-full">
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2px] bg-[#E5E0D8] mb-6">
                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10">
                        {index === 0 && (
                            <span className="font-serif italic text-xs text-[#434343] bg-white/80 backdrop-blur-sm px-3 py-1">
                                Nuevo
                            </span>
                        )}
                    </div>

                    {image1 ? (
                        <>
                            {/* Primary Image */}
                            <Image
                                src={image1}
                                alt={name}
                                fill
                                className="object-cover transition-opacity duration-700 ease-in-out z-10 group-hover:opacity-0"
                            />
                            {/* Secondary Image (Revealed on Hover) */}
                            <Image
                                src={image2}
                                alt={`${name} detail`}
                                fill
                                className="object-cover absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-1000"
                            />
                        </>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted font-serif italic text-lg">
                            Sélah
                        </div>
                    )}
                </div>

                <div className="space-y-2 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                        <h3 className="font-serif text-lg text-[#434343] group-hover:text-accent transition-colors duration-300">
                            {name}
                        </h3>
                        <span className="font-sans text-sm text-[#717171]">{price}</span>
                    </div>
                    <div className="h-px w-full bg-[#E5E0D8] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    <p className="font-sans text-[10px] uppercase tracking-widest text-[#9CA3AF]">
                        {techSpec}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}
