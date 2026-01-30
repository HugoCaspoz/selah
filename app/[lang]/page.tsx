
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

            {/* 1. HERO: The Welcome */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Parallax Background Effect Container */}
                <div className="absolute inset-0 z-0">
                    {/* Cream/Linen textured background via CSS or Image */}
                    <div className="absolute inset-0 bg-[#F8F5F2]" />
                    {/* Subtle Texture Overlay */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

                    {/* Center Image/Video with Parallax feel (simulated layout) */}
                    <div className="absolute inset-x-0 bottom-0 top-20 md:top-0 h-full flex items-center justify-center opacity-20 md:opacity-100">
                        <img
                            src="https://images.unsplash.com/photo-1518331483807-f6adc0e1ad23?q=80&w=2069&auto=format&fit=crop"
                            alt="Wheat field"
                            className="h-[80%] w-[90%] md:h-[70%] md:w-[40%] object-cover object-center grayscale-[20%] sepia-[10%] shadow-2xl"
                        />
                    </div>
                </div>

                <div className="relative z-10 text-center ">
                    <h1 className="font-serif text-[6rem] md:text-[10rem] lg:text-[14rem] leading-none tracking-tighter text-primary/90 mix-blend-multiply animate-fade-in">
                        {t('title')}
                    </h1>
                    <p className="font-sans text-lg md:text-xl tracking-[0.3em] uppercase mt-4 text-accent animate-slide-up">
                        {t('subtitle')}
                    </p>
                </div>
            </section>

            {/* 2. ASYMMETRIC GRID: Exploration */}
            <section className="py-32 px-4 md:px-12 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[800px]">

                    {/* TEXTIL (The Anchor) - 60% Width */}
                    <Link href={`/${lang}/collection`} className="md:col-span-7 relative group block h-[500px] md:h-full overflow-hidden">
                        <div className="absolute inset-0 bg-sand transition-colors duration-700 group-hover:bg-[#EAE5DD]" />
                        <img
                            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200"
                            alt="Textil"
                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                        />
                        <div className="absolute bottom-8 left-8">
                            <span className="font-serif text-4xl text-white mix-blend-difference">Atemporal.</span>
                        </div>
                    </Link>

                    {/* RIGHT COLUMN */}
                    <div className="md:col-span-5 flex flex-col gap-8 h-full">
                        {/* JEWELRY & WATCHES */}
                        <div className="grid grid-cols-2 gap-4 h-1/2">
                            <Link href={`/${lang}/collection`} className="relative group block overflow-hidden bg-white">
                                <img
                                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600"
                                    alt="Joyas"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <span className="font-serif text-xl text-white drop-shadow-md">Esencia.</span>
                                </div>
                            </Link>
                            <Link href={`/${lang}/collection`} className="relative group block overflow-hidden bg-white">
                                <img
                                    src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600"
                                    alt="Tiempo"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <span className="font-serif text-xl text-white drop-shadow-md">Tiempo.</span>
                                </div>
                            </Link>
                        </div>

                        {/* ACCESSORIES / PROMO */}
                        <Link href={`/${lang}/collection`} className="h-1/2 bg-accent/20 flex flex-col justify-center items-center text-center p-8 group hover:bg-accent/30 transition-colors cursor-pointer">
                            <h3 className="font-serif text-3xl text-primary mb-4">Complementos</h3>
                            <p className="font-sans text-sm text-primary/70 max-w-xs leading-relaxed">
                                Detalles que acompañan tu pausa diaria.
                            </p>
                            <div className="mt-6 w-12 h-px bg-primary transform group-hover:scale-x-150 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 3. THE FEED OF THE PAUSE */}
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
