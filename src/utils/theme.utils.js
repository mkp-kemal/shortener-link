import useThemeStore from "../stores/themeStores";

export function useTheme() {
    const darkMode = useThemeStore((state) => state.darkMode);
    const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);
    const setDarkMode = useThemeStore((state) => state.setDarkMode);

    return [darkMode, setDarkMode, toggleDarkMode];
}
