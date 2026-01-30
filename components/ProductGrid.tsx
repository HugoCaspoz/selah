import React from 'react';
import { supabase } from '@/lib/supabase';
import ProductCard from './ProductCard';

// manifesto block component
const ManifestoBlock = () => (
    <div className="col-span-full py-24 my-12 bg-[#93917B] text-[#F8F5F2] flex flex-col items-center justify-center text-center px-4">
        <h3 className="font-serif text-3xl md:text-5xl italic mb-4">"Gracia sobre gracia"</h3>
        <p className="font-sans text-xs tracking-[0.2em] uppercase opacity-80">Sélah Collection 01</p>
    </div>
);

export default async function ProductGrid({ locale, category }: { locale: string, category?: string }) {
    // Fetch active products
    let query = supabase
        .from('products')
        .select(`
            *,
            categories!inner(slug)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    // Apply Filter
    if (category && category !== 'all') {
        query = query.eq('categories.slug', category);
    }

    const { data: products, error } = await query;

    if (error) {
        console.error("Error fetching products:", error);
        return <div className="text-center py-12">Failed to load collection.</div>;
    }

    if (!products || products.length === 0) {
        return <div className="text-center py-32 font-serif text-2xl text-muted italic">No pieces found in this calmness.</div>;
    }

    return (
        <section className="container mx-auto px-4 pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {products.map((product, index) => {
                    // Logic to insert Manifesto Block every 6 items (visual break)
                    // Note: This is a bit tricky in a pure map. 
                    // A grid map usually wraps items. To insert a full-width block, we might need a Fragment or change the structure.
                    // For simplicity & robustness: we render the product, and IF it's the 6th, 12th, etc, we ALSO render the block after it.
                    // BUT CSS Grid flow is better handled if the block is its own element in the array.
                    // Let's keep it simple: Standard grid, but certain items span more cols?
                    // User asked for "Asymmetric Grid".

                    // Asymmetric Logic:
                    // Make every 3rd item span 2 columns? Or use a pattern.
                    // Pattern: 1(small) 2(small) 3(LARGE) ...

                    const isLarge = (index + 1) % 5 === 0; // Every 5th item is large?
                    const showManifesto = (index + 1) % 6 === 0;

                    return (
                        <React.Fragment key={product.id}>
                            <div className={`${isLarge ? 'md:col-span-2' : 'col-span-1'}`}>
                                <ProductCard
                                    product={product}
                                    locale={locale}
                                    index={index}
                                />
                            </div>
                            {showManifesto && <ManifestoBlock />}
                        </React.Fragment>
                    );
                })}
            </div>
        </section>
    );
}
