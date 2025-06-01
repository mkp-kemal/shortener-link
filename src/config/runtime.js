export const runtimeConfig = {
    apiBase: import.meta.env.VITE_API_BASE,
    token: import.meta.env.VITE_TOKEN,
    access_token: localStorage.getItem("access_token"),
    urlBase: import.meta.env.VITE_URL,
};
