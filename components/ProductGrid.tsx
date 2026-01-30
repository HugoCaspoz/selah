import { supabase } from '@/lib/supabase';
import ProductCard from './ProductCard';

export default async function ProductGrid({ locale }: { locale: string }) {
    // Fetch active products
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching products:", error);
        return <div className="text-center py-12">Failed to load collection.</div>;
    }

    if (!products || products.length === 0) {
        return <div className="text-center py-12 text-muted">Coming Soon.</div>;
    }

    return (
        <section className="container mx-auto px-4 py-20">
            <h2 className="font-serif text-4xl text-center mb-16 text-primary">Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {products.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        locale={locale}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
