
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';


// Inline Client Component for interactivity if needed, but we can do mixed.
// For simplicity in this artifact, I'll separate the Client interactive part.

import ProductDetailClient from '@/components/ProductDetailClient';

export default async function ProductPage(props: { params: Promise<{ lang: string, slug: string }> }) {
    const params = await props.params;
    const { lang, slug } = params;
    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {/* Image Gallery (Left) */}
                <div className="relative aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden">
                    {/* Simple single image for MVP */}
                    {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name_en} className="object-cover w-full h-full" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted">NO IMAGE</div>
                    )}
                </div>

                {/* Details (Right) */}
                <div className="flex flex-col justify-center">
                    <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">
                        {lang === 'es' ? product.name_es : product.name_en}
                    </h1>
                    <p className="text-xl text-muted mb-8 font-sans">
                        {lang === 'es' ? `€${product.price_eur}` : `$${product.price_usd}`}
                    </p>

                    <div className="prose prose-stone mb-8 text-gray-600 font-sans">
                        <p>{lang === 'es' ? product.description_es : product.description_en}</p>
                    </div>

                    <ProductDetailClient product={product} locale={lang} />
                </div>
            </div>
        </div>
    );
}
