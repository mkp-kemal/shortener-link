import toast from "react-hot-toast";

export function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    toast.info('Link copied to clipboard!');
};