
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';


// Inline Client Component for interactivity if needed, but we can do mixed.
// For simplicity in this artifact, I'll separate the Client interactive part.

import ProductDetailClient from '@/components/ProductDetailClient';

import Link from 'next/link'; // Ensure Link is imported

export default async function ProductPage(props: { params: Promise<{ lang: string, slug: string }> }) {
    const params = await props.params;
    const { lang, slug } = params;

    // Fetch current product
    const { data: product } = await supabase
        .from('products')
        .select(`*, categories!inner(slug)`)
        .eq('slug', slug)
        .single();

    if (!product) {
        notFound();
    }

    // Fetch Related Products (same category, exclude current)
    // Note: This is a bit rough without more logic, but works for "Visuals".
    // We assume the first category is the main one.
    const { data: relatedProducts } = await supabase
        .from('products')
        .select('*')
        .neq('id', product.id)
        // .eq('categories.slug', product.categories[0].slug) // If array
        .limit(3);

    return (
        <div className="min-h-screen bg-[#F8F5F2]">
            {/* Header Space */}
            <div className="h-24 md:h-32"></div>

            <div className="container mx-auto px-4 pb-20">
                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link href={`/${lang}/collection`} className="text-xs uppercase tracking-[0.2em] text-[#93917B] hover:text-[#434343] transition-colors">
                        &larr; {lang === 'es' ? 'Volver a la Colección' : 'Back to Collection'}
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32">
                    {/* Image Gallery (Left) */}
                    <div className="relative aspect-[3/4] bg-[#E5E0D8] rounded-[2px] overflow-hidden shadow-sm">
                        {/* Simple single image for MVP */}
                        {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name_en} className="object-cover w-full h-full" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted italic font-serif text-2xl opacity-50">Sélah</div>
                        )}
                    </div>

                    {/* Details (Right) */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-8">
                            <h1 className="font-serif text-4xl md:text-5xl text-[#434343] mb-2">
                                {lang === 'es' ? product.name_es : product.name_en}
                            </h1>
                            <p className="font-sans text-lg text-[#7C7A59]">
                                {lang === 'es' ? `€${product.price_eur}` : `$${product.price_usd}`}
                            </p>
                        </div>

                        <div className="prose prose-stone mb-12 text-[#5D5A56] font-sans leading-relaxed text-sm">
                            <p>{lang === 'es' ? product.description_es : product.description_en}</p>
                        </div>

                        <ProductDetailClient product={product} locale={lang} />
                    </div>
                </div>

                {/* Related Products Section (Curated visual break) */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="border-t border-[#D4AF37]/20 pt-20">
                        <h2 className="font-serif text-2xl text-center mb-12 text-[#434343]">
                            {lang === 'es' ? 'También te podría gustar' : 'You May Also Like'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProducts.map((p) => (
                                <Link href={`/${lang}/product/${p.slug}`} key={p.id} className="group cursor-pointer">
                                    <div className="relative aspect-[4/5] bg-[#E5E0D8] mb-4 overflow-hidden">
                                        {p.images?.[0] && (
                                            <img src={p.images[0]} alt={p.name_en} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-serif text-lg text-[#434343]">{lang === 'es' ? p.name_es : p.name_en}</h3>
                                        <p className="text-xs tracking-widest text-[#7C7A59] uppercase mt-1">
                                            {lang === 'es' ? `€${p.price_eur}` : `$${p.price_usd}`}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
