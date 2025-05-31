import React, { useEffect, useState } from "react";
import { loginUser } from "../api/authSlice";
import { useTheme } from "../utils/theme";
import InputField from "./common/InputField";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { isTokenValid } from "../middleware/ProtectedRoute";

export default function LoginPage() {
    const [darkMode, setDarkMode] = useTheme();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const errorFromRedirect = searchParams.get("error");
    const formFields = [
        { name: "username", label: "Username", required: true },
        { name: "password", label: "Password", required: true },
    ];
    const isLocalhost = window.location.hostname === 'localhost';



    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const errors = {};
        formFields.forEach(({ name, required }) => {
            if (required && !formData[name].trim()) {
                errors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
            }
        });

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        setLoading(true);

        try {
            const data = await loginUser(formData);

            if (data?.access_token) {
                localStorage.setItem('access_token', data.access_token);
                navigate("/");
            } else {
                toast.error("Token tidak ditemukan dalam respons.");
            }
        } catch (err) {
            toast.error(err.message || "Gagal login");
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const validToken = isTokenValid(token);
        console.log(validToken);

        if (validToken) {
            navigate("/");
        } else {
            localStorage.removeItem("access_token");
            toast.error("Kamu belum login.");
        }

    }, [errorFromRedirect, navigate]);

    return (
        <div className={`min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center relative transition-colors duration-500 ease-in-out ${darkMode ? "dark bg-gray-900" : ""}`}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-colors duration-500 ease-in-out" />
            <div className="absolute top-4 right-4 z-20">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full shadow relative w-10 h-10 flex items-center justify-center overflow-hidden"
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
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-100 rounded-2xl shadow-xl p-8 w-full max-w-md transition-colors duration-500 ease-in-out">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        {formFields.map(({ name, label, required }) => (
                            <InputField
                                key={name}
                                id={name}
                                name={name}
                                label={label}
                                value={formData[name]}
                                onChange={handleChange}
                                placeholder={`Enter your ${label.toLowerCase()}`}
                                error={formErrors[name]}
                                required={required}
                                type={name === "password" ? "password" : "text"}
                            />
                        ))}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    {isLocalhost && (
                        <div  className="dark:text-white text-gray-400">
                            <p>Username: <code>sabit</code></p>
                            <p>Password: <code>Sabit123!</code></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
