
export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p className="font-serif text-2xl mb-4 text-primary">SÉLAH</p>
                <div className="text-sm text-gray-400 font-sans tracking-wide">
                    &copy; {new Date().getFullYear()} SÉLAH. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
