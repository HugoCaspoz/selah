
import ProductGrid from '@/components/ProductGrid';
import CollectionFilters from '@/components/CollectionFilters';

export default async function CollectionPage(props: { params: Promise<{ lang: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const { lang } = params;
    const category = typeof searchParams.category === 'string' ? searchParams.category : 'all';

    return (
        <div className="bg-[#F8F5F2] min-h-screen">
            {/* Header Space */}
            <div className="h-24 md:h-32"></div>

            {/* Header Title */}
            <div className="container mx-auto px-4 mb-8 text-center md:text-left">
                <h1 className="font-serif text-5xl md:text-7xl text-[#434343] mb-4">Piezas para el camino.</h1>
                <p className="font-sans text-xs tracking-[0.2em] text-[#93917B] uppercase">Instrumentos de paz &middot; Colección 01</p>
            </div>

            <CollectionFilters />

            <ProductGrid locale={lang} category={category} />
        </div>
    );
}
