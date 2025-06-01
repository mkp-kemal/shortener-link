import { useEffect, useState } from "react";
import useLinkStore from "../../stores/linkStore";
import { copyToClipboard } from "../../utils/links.utils";
import { FiClock, FiCopy, FiTrash2 } from "react-icons/fi";
import { deleteLink } from "../../api/linkSlice";
import { runtimeConfig } from "../../config/runtime";


export default function LinksTable() {
    const { links, fetchLinks } = useLinkStore();
    const [deletedIds, setDeletedIds] = useState([]);
    const { urlBase } = runtimeConfig;


    const handleDelete = async (id) => {
        setDeletedIds((prev) => [...prev, id]);

        setTimeout(async () => {
            try {
                await deleteLink(id);
                await fetchLinks();
                setDeletedIds((prev) => prev.filter((deletedId) => deletedId !== id));
            } catch (error) {
                console.error('Error deleting link:', error);
                setDeletedIds((prev) => prev.filter((deletedId) => deletedId !== id));
            }
        }, 300); // durasi animasi sama dengan CSS
    };


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
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expired At</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {links.map((link, index) => {
                                    const isExpired = link.expired_at && new Date(link.expired_at) < new Date();

                                    return (

                                        <tr key={index} className={`hover:bg-gray-50 transition-opacity duration-300 ${deletedIds.includes(link.id) ? 'opacity-0' : 'opacity-100'
                                            }`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 max-w-xs truncate" title={link.destination}>
                                                    {link.destination}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <a
                                                        href={`https://${urlBase}/${link.route}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-blue-600 hover:underline"
                                                    >
                                                        {link.route}
                                                    </a>
                                                    <button
                                                        onClick={() => copyToClipboard(link.route)}
                                                        className="ml-2 text-gray-400 hover:text-blue-600"
                                                        title="Copy"
                                                    >
                                                        <FiCopy size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(link.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(link.expired_at).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                                                <button
                                                    onClick={() => handleDelete(link.id)}
                                                    className="text-red-600 hover:text-red-900 flex items-center gap-1"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>

                                                {isExpired && (
                                                    <span
                                                        className="absolute top-3 right-4 bg-red-500 text-white text-[10px] px-1 py-[1px] rounded-sm rotate-[-15deg] shadow-sm"
                                                        title="Link expired"
                                                    >
                                                        <FiClock className="inline mr-1" size={10} />
                                                        Expired
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
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