import { useRef, useState } from "react";

export default function HeroSection() {
    const [trail, setTrail] = useState([]);
    const trailRef = useRef([]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newPoint = { x, y, id: Date.now() + Math.random() };

        trailRef.current = [...trailRef.current, newPoint].slice(-10);
        setTrail([...trailRef.current]);

        setTimeout(() => {
            trailRef.current = trailRef.current.filter(p => p.id !== newPoint.id);
            setTrail([...trailRef.current]);
        }, 500);
    };
    return (
        <section
            className="relative bg-blue-600 dark:bg-gray-900 text-white overflow-hidden transition-colors duration-500 ease-in-out"
            onMouseMove={handleMouseMove}>
            {trail.map((point) => (
                <div
                    key={point.id}
                    className="absolute w-4 h-4 bg-white/40 rounded-full pointer-events-none shadow-md blur-sm transition-all duration-300 ease-out"
                    style={{
                        left: point.x - 8,
                        top: point.y - 8,
                    }}
                />
            ))}
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
