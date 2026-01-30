import Navbar from './Navbar';
import CartSidebar from './CartSidebar'; // Will create next
import Footer from './Footer';

interface ClientLayoutProps {
    children: React.ReactNode;
    locale: string;
}

export default function ClientLayout({ children, locale }: ClientLayoutProps) {
    return (
        <>
            <Navbar locale={locale} />
            <main className="min-h-screen pt-20">
                {children}
            </main>
            <Footer />
            <CartSidebar locale={locale} />
        </>
    );
}
