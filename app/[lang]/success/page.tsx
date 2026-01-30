
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default async function SuccessPage(props: { params: Promise<{ lang: string }> }) {
    const params = await props.params;
    const { lang } = params;
    const t = await getTranslations('Success');

    return (
        <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
            <div className="max-w-xl w-full text-center space-y-8 animate-fade-in">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto shadow-lg shadow-accent/20">
                    <Check className="w-10 h-10 text-white" />
                </div>

                <h1 className="font-serif text-5xl md:text-6xl text-primary">{t('title')}</h1>

                <p className="font-sans text-xl md:text-2xl text-muted font-light leading-relaxed">
                    {t('message')}
                </p>

                <div className="pt-8">
                    <Link href={`/${lang}`}>
                        <button className="text-sm uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors">
                            {t('cta')}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
