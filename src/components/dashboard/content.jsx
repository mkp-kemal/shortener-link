import { useState } from "react";
import { createLink } from "../../api/linkSlice";
import { FiCopy, FiTrash2, FiExternalLink, FiClock, FiLink2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { copyToClipboard } from "../../utils/links.utils";
import LinksTable from "./linksTable";
import InputField from "../common/InputField";

export default function Content() {
    const [shortenedResult, setShortenedResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ destination: "", route: "", expiredAt: "" });
    const [formErrors, setFormErrors] = useState({});
    const formFields = [
        { name: "destination", label: "Destination URL", required: true },
        { name: "route", label: "Custom Url", required: true },
        { name: "expiredAt", label: "Expiration Date", required: true },
    ];

    const handleShorten = async (e) => {
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
            const payload = {
                ...formData,
                expired_at: formData.expiredAt ? new Date(formData.expiredAt).getTime() : null,
            };

            const response = await createLink(payload);
            const result = await response.json();
            setShortenedResult(result);
            toast.success("Link shortened successfully!");
        } catch (err) {
            toast.error(`Failed to shorten link: ${err}`);
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <div className="bg-white dark:bg-gray-800 transition-colors duration-500 ease-in-out rounded-xl shadow-sm p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <div className="bg-blue-50 dark:bg-gray-800 transition-colors duration-500 ease-in-out shadow-2xl p-5 rounded-lg">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                                <FiLink2 className="text-blue-600" /> Shorten Your Link
                            </h2>
                            <form className="space-y-4 dark:text-white transition-colors duration-500 ease-in-out" onSubmit={handleShorten}>
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
                                        type={name === "expiredAt" ? "datetime-local" : "text"}
                                    />
                                ))}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                                >
                                    {loading ?
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </> : "Shorten URL"}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="bg-gray-50 dark:bg-gray-800 transition-colors duration-500 ease-in-out shadow-2xl p-5 rounded-lg">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Your Short Link</h2>
                            {shortenedResult ? (
                                <div className="space-y-4">
                                    <div className="bg-white dark:bg-gray-800 transition-colors duration-500 ease-in-out shadow-2xl p-4 rounded-md">
                                        <div className="flex flex-col space-y-2 mb-3">
                                            <span className="text-xs font-medium text-gray-500">Original URL:</span>
                                            <a
                                                href={shortenedResult.destination}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline text-sm truncate"
                                            >
                                                {shortenedResult.destination}
                                            </a>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <span className="text-xs font-medium text-gray-500">Short URL:</span>
                                            <div className="flex items-center justify-between dark:bg-gray-800 transition-colors duration-500 ease-in-out shadow-2xl bg-gray-50 p-2 rounded">
                                                <a
                                                    href={`https://shrt.ly/${shortenedResult.route}`}
                                                    className="text-blue-600 hover:underline text-sm font-medium"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    shrt.ly/{shortenedResult.route}
                                                </a>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => copyToClipboard(`https://shrt.ly/${shortenedResult.route}`)}
                                                        className="text-gray-500 hover:text-blue-600 p-1 rounded hover:bg-gray-100"
                                                        title="Copy"
                                                    >
                                                        <FiCopy size={18} />
                                                    </button>
                                                    <a
                                                        href={`https://shrt.ly/${shortenedResult.route}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-500 hover:text-blue-600 p-1 rounded hover:bg-gray-100"
                                                        title="Open"
                                                    >
                                                        <FiExternalLink size={18} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => copyToClipboard(`https://shrt.ly/${shortenedResult.route}`)}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg font-medium transition-colors"
                                    >
                                        <FiCopy /> Copy Short Link
                                    </button>

                                    <div className="text-xs text-gray-500 mt-2">
                                        <p>Link will expire on: {new Date(shortenedResult.expired_at).toLocaleString()}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-gray-800 transition-colors duration-500 ease-in-out shadow-2xl p-8 text-center rounded-md border-2 border-dashed border-gray-200 dark:border-gray-600">
                                    <p className="text-gray-400">Your shortened link will appear here</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <LinksTable />
            </div>
        </div>
    );
}