
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import ProductGrid from '@/components/ProductGrid';
import { Smartphone, BookOpen, Headphones } from 'lucide-react';

export default async function HomePage(props: { params: Promise<{ lang: string }> }) {
    const params = await props.params;
    const { lang } = params;
    const t = await getTranslations('Hero');
    const tPause = await getTranslations('PauseCode');

    // New Categories Array for the Grid (Manual for layout control, linking to collection)
    // In a real app we might fetch these, but for the "Landing Narrative" we hardcode the visual structure.
    const categories = [
        { name: 'Atemporal', slug: 'ropa', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' },
        { name: 'Esencia', slug: 'joyeria', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800' },
        { name: 'Tiempo', slug: 'tiempo', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800' }
    ];

    return (
        <div className="w-full bg-background text-primary">
            {/* 1. HERO SECTION */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Abstract/Mood Video Placeholder */}
                <div className="absolute inset-0 bg-gray-200 z-0">
                    {/* Simulating slow motion video with a soft image and overlay */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493606371202-6275828f90f3?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight text-primary animate-fade-in shadow-black drop-shadow-sm">
                        {t('title')}
                    </h1>
                    <div className="h-px w-24 bg-primary/30 mx-auto mb-8 animate-slide-up" />

                    <Link href={`/${lang}/collection`}>
                        <button className="px-10 py-4 border border-primary/40 text-primary hover:bg-primary hover:text-white transition-all duration-700 ease-out uppercase tracking-[0.2em] text-xs md:text-sm animate-slide-up backdrop-blur-sm">
                            {t('cta')}
                        </button>
                    </Link>
                </div>
            </section>

            {/* 2. THE GRID (Categories) */}
            <section className="py-24 md:py-32 px-4 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, i) => (
                        <Link href={`/${lang}/collection`} key={cat.slug} className="group relative aspect-[3/4] overflow-hidden block">
                            <div className="absolute inset-0">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                            </div>
                            <div className="absolute bottom-8 left-0 right-0 text-center">
                                <span className="font-serif text-2xl md:text-3xl text-white tracking-wide opacity-90 group-hover:opacity-100 transition-opacity">
                                    {cat.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 3. CODE OF THE PAUSE */}
            <section className="py-32 bg-accent text-white relative overflow-hidden">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
                        <h2 className="font-serif text-4xl md:text-5xl">{tPause('title')}</h2>
                        <p className="font-sans text-lg md:text-xl font-light leading-relaxed opacity-90 max-w-md mx-auto md:mx-0">
                            {tPause('text')}
                        </p>
                        <div className="flex justify-center md:justify-start gap-8 pt-4">
                            <div className="flex flex-col items-center gap-2">
                                <Headphones className="w-8 h-8 opacity-80" />
                                <span className="text-xs uppercase tracking-widest opacity-70">{tPause('audio')}</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <BookOpen className="w-8 h-8 opacity-80" />
                                <span className="text-xs uppercase tracking-widest opacity-70">{tPause('verse')}</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Smartphone className="w-8 h-8 opacity-80" />
                                <span className="text-xs uppercase tracking-widest opacity-70">QR</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        {/* Abstract QR visual */}
                        <div className="w-64 h-64 border border-white/20 relative flex items-center justify-center rotate-45">
                            <div className="w-56 h-56 border border-white/40 flex items-center justify-center">
                                <div className="w-48 h-48 bg-white/10 backdrop-blur-md flex items-center justify-center -rotate-45">
                                    <span className="font-serif text-4xl italic">Sélah</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PRODUCT HIGHLIGHT (Existing Grid but filtered could go here, or just let users explore) */}
            <div className="py-24 bg-background">
                <ProductGrid locale={lang} />
            </div>

        </div>
    );
}
