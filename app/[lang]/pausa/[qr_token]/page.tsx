
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Play, Pause } from 'lucide-react'; // For UI

export default async function PausePage(props: { params: Promise<{ qr_token: string, lang: string }> }) {
    const params = await props.params;
    const { qr_token, lang } = params;
    // Validate Token
    const { data: access, error } = await supabase
        .from('qr_access')
        .select('*, orders(*)')
        .eq('qr_token', qr_token)
        .single();

    const isValid = access && access.is_active && (!access.expires_at || new Date(access.expires_at) > new Date());

    if (error || !isValid) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary text-primary">
                <div className="text-center">
                    <h1 className="font-serif text-3xl mb-4">Invalid Access</h1>
                    <p className="font-sans text-muted">This code is invalid or has expired.</p>
                </div>
            </div>
        );
    }

    // Update accessed_at (fire and forget basically, or separate API call if strict)
    // Since this is a Server Component, we can't easily side-effect without a server action.
    // For MVP, we presume valid access is enough.

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#E0E7FF] to-[#F3E8FF] transition-colors duration-1000">
            <div className="text-center max-w-md px-8 animate-fade-in">
                <h1 className="font-serif text-5xl md:text-6xl text-primary mb-6 tracking-tight">SÉLAH</h1>
                <p className="font-sans text-xl md:text-2xl text-primary/60 mb-12 italic">
                    "{lang === 'es' ? 'Tómate un momento.' : 'Take a moment.'}"
                </p>

                <div className="bg-white/30 backdrop-blur-lg rounded-full p-8 inline-flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 transition-transform">
                    {/* Audio mock */}
                    <Play className="h-12 w-12 text-primary opacity-80" />
                </div>

                <div className="mt-12">
                    <audio controls className="hidden">
                        <source src="/assets/audio/ambient.mp3" type="audio/mpeg" />
                    </audio>
                    <p className="text-xs uppercase tracking-widest text-primary/40 mt-4">
                        Ambient Sound 01
                    </p>
                </div>
            </div>
        </div>
    );
}
