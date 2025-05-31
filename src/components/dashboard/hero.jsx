export default function HeroSection() {
    return (
        <section className="relative bg-blue-600 text-white overflow-hidden">
            <div className="absolute top-10 left-1/4 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute top-20 right-1/3 w-16 h-16 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-white/30 rounded-full"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Lorem</h1>
                <p className="text-lg text-white/80">
                    Ini adalah deskripsi singkat di bagian hero section
                </p>
            </div>
        </section>
    );
}
