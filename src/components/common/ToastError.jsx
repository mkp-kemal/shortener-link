import React, { useEffect, useState } from "react";

export default function ToastError({ message, duration = 3000, onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible || !message) return null;

    return (
        <div className="fixed top-6 right-6 z-50">
            <div className="bg-red-600 text-white px-4 py-3 rounded shadow-lg animate-slide-in">
                {message}
            </div>
        </div>
    );
}
