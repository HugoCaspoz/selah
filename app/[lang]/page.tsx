
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Play, BookOpen, PenTool } from 'lucide-react';

export default async function HomePage(props: { params: Promise<{ lang: string }> }) {
    const params = await props.params;
    const { lang } = params;
    const t = await getTranslations('Hero');
    const tFeed = await getTranslations('Feed');

    return (
        <div className="w-full bg-secondary text-primary overflow-x-hidden">

            {/* 1. HERO: Wheat Field & Boxed Title */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background Image: Wheat Field */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2600&auto=format&fit=crop"
                        alt="Wheat field"
                        className="w-full h-full object-cover object-bottom"
                    />
                    {/* Slight overlay to wash it out a bit? Reference shows natural color but maybe slightly warm */}
                    <div className="absolute inset-0 bg-amber-100/10 mix-blend-multiply" />
                </div>

                {/* The Box */}
                <div className="relative z-10 bg-[#FDFBF7]/90 backdrop-blur-[2px] p-12 md:p-20 shadow-2xl max-w-2xl mx-4 text-center border-t-4 border-accent/20">
                    <h1 className="font-serif text-6xl md:text-8xl tracking-tight text-[#4A4A4A] mb-4">
                        {t('title')}
                    </h1>
                    <p className="font-sans text-sm md:text-base tracking-[0.4em] uppercase text-[#7C7A59] mb-12 font-medium">
                        {t('subtitle')}
                    </p>

                    <Link href={`/${lang}/collection`}>
                        <button className="px-8 py-3 border border-[#7C7A59]/40 text-[#5D5B4B] hover:bg-[#7C7A59] hover:text-white transition-all duration-500 uppercase tracking-widest text-xs font-semibold">
                            [ {t('cta')} ]
                        </button>
                    </Link>
                </div>
            </section>

            {/* 2. ASYMMETRIC GRID: Reference Style */}
            <section className="py-20 px-4 md:px-8 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[900px]">

                    {/* Left: ATEMPORAL (T-Shirt on Concrete) - 50% width roughly in visual, but let's do 7 cols */}
                    <Link href={`/${lang}/collection`} className="md:col-span-7 relative group block h-[500px] md:h-full overflow-hidden bg-[#E0E0E0]">
                        <img
                            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200"
                            alt="Atemporal"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                        />
                        <div className="absolute bottom-12 left-8">
                            <span className="font-serif text-4xl text-[#333]">Atemporal.</span>
                        </div>
                    </Link>

                    {/* Right Column */}
                    <div className="md:col-span-5 flex flex-col gap-6 h-full">

                        {/* Top Right: ESENCIA & TIEMPO (Jewelry/Watch) */}
                        <div className="grid grid-cols-2 gap-6 h-1/2">
                            <Link href={`/${lang}/collection`} className="relative group block overflow-hidden bg-[#EADBD5]">
                                <img
                                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600"
                                    alt="Esencia"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-6 left-4">
                                    <span className="font-serif text-2xl text-white drop-shadow-md">Esencia.</span>
                                </div>
                            </Link>

                            <Link href={`/${lang}/collection`} className="relative group block overflow-hidden bg-white">
                                <img
                                    src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600"
                                    alt="Tiempo"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </Link>
                        </div>

                        {/* Bottom Right: COMPLEMENTOS (Solid Clay Box) */}
                        <Link href={`/${lang}/collection`} className="h-1/2 bg-clay flex flex-col justify-center items-center text-center p-12 group hover:bg-[#6e6c53] transition-colors cursor-pointer text-[#FDFBF7]">
                            <h3 className="font-serif text-4xl mb-6">Complementos</h3>
                            <p className="font-sans text-xs opacity-80 max-w-[200px] leading-relaxed mb-8">
                                Detalles que acompañan tu pausa diaria.
                            </p>
                            <span className="text-xs uppercase tracking-widest border-b border-white/30 pb-1 group-hover:border-white transition-colors">
                                Ver Colección
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 3. THE FEED OF THE PAUSE (Keep as is, it matches the vibe well enough) */}
            <section className="py-24 border-t border-primary/10">
                <div className="container mx-auto px-4 mb-12 flex justify-between items-end">
                    <h2 className="font-serif text-4xl md:text-5xl text-primary">{tFeed('title')}</h2>
                    <span className="hidden md:block font-sans text-xs tracking-widest text-muted uppercase">Updates Weekly</span>
                </div>

                <div className="container mx-auto px-4 overflow-x-auto pb-8">
                    <div className="flex gap-8 min-w-max">
                        {/* Card 1: Song */}
                        <div className="w-80 space-y-4 group cursor-pointer">
                            <div className="aspect-square bg-sand relative overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                                <Play className="w-12 h-12 text-primary opacity-80" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-accent mb-1">{tFeed('song')}</p>
                                <h4 className="font-serif text-xl text-primary">"Be Still" - Instrumental</h4>
                            </div>
                        </div>

                        {/* Card 2: Reflection */}
                        <div className="w-80 space-y-4 group cursor-pointer">
                            <div className="aspect-square bg-[#E8E8E8] relative overflow-hidden flex items-center justify-center">
                                <BookOpen className="w-12 h-12 text-primary opacity-80" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-accent mb-1">{tFeed('reflection')}</p>
                                <h4 className="font-serif text-xl text-primary">El arte de no hacer nada.</h4>
                            </div>
                        </div>

                        {/* Card 3: Design */}
                        <div className="w-80 space-y-4 group cursor-pointer">
                            <div className="aspect-square bg-secondary border border-primary/10 relative overflow-hidden flex items-center justify-center">
                                <PenTool className="w-12 h-12 text-primary opacity-80" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-accent mb-1">{tFeed('design')}</p>
                                <h4 className="font-serif text-xl text-primary">Proceso: Algodón Orgánico.</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
