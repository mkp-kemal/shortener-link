import { useEffect } from "react";
import useLinkStore from "../../stores/linkStore";

export default function Content() {
    const { links, fetchLinks } = useLinkStore();

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);
    return (
        <div className="max-w-full mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">Shorten Your Link</h2>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter your long URL here..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 whitespace-nowrap">
                                Shorten URL
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Example: https://www.example.com/very-long-url</p>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Short Link</h2>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">Original URL:</span>
                                <span className="text-blue-600 text-sm truncate max-w-xs">https://www.example.com/very-long-url</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Short URL:</span>
                                <div className="flex items-center gap-2">
                                    <a href="#" className="text-blue-600 hover:underline">shrt.ly/abc123</a>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition duration-200">
                                Copy Short Link
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="mt-10">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Link History</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Original URL</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Short URL</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Created At</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {links.map((link, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-sm text-gray-800 truncate max-w-xs">{link.originalUrl}</td>
                                        <td className="px-6 py-4 text-sm text-blue-600">{link.shortUrl}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{link.createdAt}</td>
                                        <td className="px-6 py-4">
                                            <button className="text-sm text-green-600 hover:underline mr-4">Copy</button>
                                            <button className="text-sm text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
