
import ProductGrid from '@/components/ProductGrid';

export default async function CollectionPage(props: { params: Promise<{ lang: string }> }) {
    const params = await props.params;
    const { lang } = params;
    return (
        <div className="bg-secondary min-h-screen">
            {/* Use a spacer for fixed navbar */}
            <div className="h-24"></div>
            <ProductGrid locale={lang} />
        </div>
    );
}
