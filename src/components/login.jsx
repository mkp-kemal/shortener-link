import React, { useState, useEffect } from "react";
import { loginUser } from "../api/authSlice";
import InputField from "./common/InputField";

export default function LoginPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const data = await loginUser(formData);
            console.log("Login success:", data);
            // Simpan token, redirect, dll
        } catch (err) {
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[url('/background.jpg')] bg-cover bg-center relative dark:bg-gray-900 transition-colors duration-500 ease-in-out">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-colors duration-500 ease-in-out" />
            <div className="absolute top-4 right-4 z-20">
                <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full shadow relative w-10 h-10 flex items-center justify-center overflow-hidden"
                    >
                        <span
                            className={`absolute transition-all duration-500 ease-in-out transform ${darkMode
                                ? "opacity-0 scale-75 rotate-[-90deg]"
                                : "opacity-100 scale-100 rotate-0"
                                }`}
                        >
                            🌙
                        </span>
                        <span
                            className={`absolute transition-all duration-500 ease-in-out transform ${darkMode
                                ? "opacity-100 scale-100 rotate-0"
                                : "opacity-0 scale-75 rotate-[90deg]"
                                }`}
                        >
                            🌞
                        </span>
                    </button>
                </div>            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-100 rounded-2xl shadow-xl p-8 w-full max-w-md transition-colors duration-500 ease-in-out">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                    {errorMsg && (
                        <div className="mb-4 text-sm text-red-500 text-center">{errorMsg}</div>
                    )}

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <InputField
                            id="username"
                            name="username"
                            label="Username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                        <InputField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
