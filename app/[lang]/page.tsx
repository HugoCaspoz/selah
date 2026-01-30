import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
    const t = await getTranslations('Hero');

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Helper for video background later */}
            <div className="absolute inset-0 bg-black/20 z-10" />
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <h1 className="font-serif text-6xl md:text-8xl mb-4 animate-fade-in text-secondary">{t('title')}</h1>
                <p className="font-sans text-xl md:text-2xl tracking-widest uppercase mb-8 animate-slide-up text-secondary/90">{t('subtitle')}</p>
                <button className="px-8 py-3 border border-secondary text-secondary hover:bg-secondary hover:text-primary transition-all duration-300 uppercase tracking-widest text-sm">
                    {t('cta')}
                </button>
            </div>
        </div>
    );
}
