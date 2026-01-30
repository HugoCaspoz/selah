import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import { Inter, Cormorant_Garamond } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-cormorant'
});

export const metadata = {
    title: 'SÉLAH',
    description: 'Faith in Slow Motion',
};

export default async function LocaleLayout(props: {
    children: React.ReactNode;
    params: Promise<any>;
}) {
    const params = await props.params;
    const { lang: locale } = params; // Map 'lang' (folder name) to 'locale' (variable used below)
    const { children } = props;
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={`${inter.variable} ${cormorant.variable} bg-secondary text-primary font-sans antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <ClientLayout locale={locale}>
                        {children}
                    </ClientLayout>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
