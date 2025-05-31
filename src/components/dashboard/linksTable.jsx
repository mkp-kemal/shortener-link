import { useEffect } from "react";
import useLinkStore from "../../stores/linkStore";
import { copyToClipboard } from "../../utils/links.utils";

export default function LinksTable() {
    const { links, fetchLinks } = useLinkStore();

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);
    return (
        <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Link History</h2>
                <button
                    onClick={fetchLinks}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
            </div>

            {links.length > 0 ? (
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original URL</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short URL</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {links.map((link, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 max-w-xs truncate" title={link.originalUrl}>
                                                {link.originalUrl}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <a
                                                    href={link.shortUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    {link.shortUrl.replace('https://', '')}
                                                </a>
                                                <button
                                                    onClick={() => copyToClipboard(link.shortUrl)}
                                                    className="ml-2 text-gray-400 hover:text-blue-600"
                                                    title="Copy"
                                                >
                                                    <FiCopy size={16} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(link.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-red-600 hover:text-red-900 flex items-center gap-1">
                                                <FiTrash2 size={16} /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-8 text-center rounded-md border-2 border-dashed border-gray-200">
                    <p className="text-gray-400">No links have been created yet</p>
                </div>
            )}
        </div>
    )
} 