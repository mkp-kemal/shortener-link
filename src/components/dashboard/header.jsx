export default function Header() {
  return (
    <header className="relative bg-blue-600 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <nav className="space-x-6">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Logout</a>
        </nav>
      </div>

      {/* Dekorasi lingkaran */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-24 h-24 bg-white opacity-10 rounded-full top-8 left-1/3"></div>
        <div className="absolute w-32 h-32 bg-white opacity-10 rounded-full top-16 right-1/4"></div>
        <div className="absolute w-12 h-12 bg-white opacity-10 rounded-full bottom-8 left-1/4"></div>
      </div>

      {/* Gelombang bawah */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#ffffff"
          fillOpacity="0.1"
          d="M0,160L40,165.3C80,171,160,181,240,165.3C320,149,400,107,480,117.3C560,128,640,192,720,197.3C800,203,880,149,960,117.3C1040,85,1120,75,1200,90.7C1280,107,1360,149,1400,170.7L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </header>
  );
}
