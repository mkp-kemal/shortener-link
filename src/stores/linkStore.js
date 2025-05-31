import { create } from 'zustand';
import { getLinks } from '../api/linkSlice';

const useLinkStore = create((set) => ({
    links: [],
    fetchLinks: async () => {
        try {
            const data = await getLinks();
            set({ links: data });
        } catch (error) {
            console.error('Error fetching links:', error);
        }
    },
}));

export default useLinkStore;
