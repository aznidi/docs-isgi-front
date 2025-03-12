import { useState, useEffect } from 'react';
import { axiosClient } from '../api/axios';

const useTranslations = (locale = 'fr') => {
    const [translations, setTranslations] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTranslations = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axiosClient.get(`/api/translations/${locale}`);
                setTranslations(response.data || {}); // Toujours retourner un objet
            } catch (err) {
                setError('Failed to load translations.');
                setTranslations({}); // Retourner un objet vide en cas d’erreur
            } finally {
                setLoading(false);
            }
        };

        fetchTranslations();
    }, [locale]);

    return { translations, loading, error };
};

export default useTranslations;
