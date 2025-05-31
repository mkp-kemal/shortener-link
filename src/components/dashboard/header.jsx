import { useTheme } from "../../utils/theme.utils";

export default function Header() {
  const [darkMode, setDarkMode] = useTheme();

  return (
    <header className="relative bg-blue-600 dark:bg-gray-900 text-white overflow-hidden transition-colors duration-500 ease-in-out">
      <div className="max-w-full mx-auto px-10 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <nav className="flex items-center space-x-6">
          <a href="#" className="hover:underline cursor-pointer">Logout</a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full shadow relative w-10 h-10 flex items-center justify-center cursor-pointer"
          >
            <span
              className={`absolute transition-all duration-500 ease-in-out transform ${darkMode ? "opacity-0 scale-75 rotate-[-90deg]" : "opacity-100 scale-100 rotate-0"
                }`}
            >
              🌙
            </span>
            <span
              className={`absolute transition-all duration-500 ease-in-out transform ${darkMode ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-[90deg]"
                }`}
            >
              🌞
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
