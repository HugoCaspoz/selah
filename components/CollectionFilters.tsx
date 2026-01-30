'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const categories = [
    { name: 'All', id: 'all' },
    { name: 'Textil', id: 'ropa' },
    { name: 'Esencia', id: 'joyeria' },
    { name: 'Tiempo', id: 'tiempo' },
    { name: 'Complementos', id: 'complementos' },
];

export default function CollectionFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category') || 'all';

    const handleCategoryChange = (categoryId: string) => {
        const params = new URLSearchParams(searchParams);
        if (categoryId === 'all') {
            params.delete('category');
        } else {
            params.set('category', categoryId);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="sticky top-20 z-40 bg-[#F8F5F2]/90 backdrop-blur-md py-6 mb-12 border-b border-[#D4AF37]/20">
            <div className="container mx-auto px-4 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex items-center space-x-8 min-w-max">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            className={cn(
                                "text-sm uppercase tracking-[0.15em] transition-all duration-500 relative",
                                currentCategory === cat.id
                                    ? "text-[#434343] font-medium"
                                    : "text-[#9CA3AF] hover:text-[#434343]"
                            )}
                        >
                            {cat.name}
                            {currentCategory === cat.id && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute -bottom-2 left-0 right-0 h-px bg-[#434343]"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
