'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cart'; // Adjust path if needed (using alias @/store)
import { Button } from './ui/Button';

export default function Navbar({ locale }: { locale: string }) {
    const t = useTranslations('Navbar');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { items, toggleCart } = useCartStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const switchLocale = (newLocale: string) => {
        // Current path: /en/product/slug -> /es/product/slug
        // Simple replacement for demo. Better usage with next-intl Link or path helpers.
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-secondary/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-primary"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Logo */}
                <Link href={`/${locale}`} className={`text-2xl font-serif font-bold tracking-tighter ${isScrolled ? 'text-primary' : 'text-primary mix-blend-difference'}`}>
                    SÉLAH
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center space-x-8">
                    <Link href={`/${locale}/collection`} className="text-sm uppercase tracking-widest hover:text-accent transition-colors">
                        {t('collection')}
                    </Link>
                    <Link href={`/${locale}/about`} className="text-sm uppercase tracking-widest hover:text-accent transition-colors">
                        {t('about')}
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2 text-xs font-medium">
                        <button onClick={() => switchLocale('en')} className={locale === 'en' ? 'underline' : 'opacity-50'}>EN</button>
                        <span>/</span>
                        <button onClick={() => switchLocale('es')} className={locale === 'es' ? 'underline' : 'opacity-50'}>ES</button>
                    </div>

                    <button className="hover:text-accent transition-colors">
                        <User className="h-5 w-5" />
                    </button>

                    <button onClick={toggleCart} className="relative hover:text-accent transition-colors">
                        <ShoppingBag className="h-5 w-5" />
                        {items.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                {items.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        className="fixed inset-0 bg-secondary z-50 flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-2xl font-serif">SÉLAH</span>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-6 text-xl font-serif">
                            <Link href={`/${locale}/collection`}>{t('collection')}</Link>
                            <Link href={`/${locale}/about`}>{t('about')}</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
