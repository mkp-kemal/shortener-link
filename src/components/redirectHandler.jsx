import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function RedirectHandler() {
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRedirectUrl = async () => {
            try {
                // Ganti URL ini dengan endpoint API kamu untuk shortlink
                const response = await axios.get(`https://api.sabitcommunity.org/links/share/${slug}`);
                console.log(response);


                const destination = response.data.url;
                if (destination) {
                    //   window.location.href = destination; // Redirect ke URL asli
                } else {
                    toast.error("Link tidak ditemukan");
                    //   navigate("/"); // Redirect ke beranda jika slug tidak valid
                }
            } catch (error) {
                toast.error(error);
                // navigate("/");
            }
        };

        fetchRedirectUrl();
    }, [slug, navigate]);

    return <p>Mengalihkan...</p>;
}
