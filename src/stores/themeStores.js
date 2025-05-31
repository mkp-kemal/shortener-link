import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
    persist(
        (set) => ({
            darkMode: false,
            toggleDarkMode: () =>
                set((state) => {
                    const newMode = !state.darkMode;
                    if (newMode) {
                        document.documentElement.classList.add("dark");
                    } else {
                        document.documentElement.classList.remove("dark");
                    }
                    return { darkMode: newMode };
                }),
            setDarkMode: (value) => {
                if (value) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
                set({ darkMode: value });
            }
        }),
        {
            name: "theme",
        }
    )
);

export default useThemeStore;
