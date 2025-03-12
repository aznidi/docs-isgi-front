import React, { useState } from 'react';
import useTranslations from '../hooks/useTranslations';

const App = () => {
    const [locale, setLocale] = useState('en'); // Langue par défaut
    const { translations, loading, error } = useTranslations(locale);

    const handleChangeLanguage = (lang) => {
        setLocale(lang);
    };

    if (loading) return <p>Loading translations...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>{translations.welcome}</h1>
            <button onClick={() => handleChangeLanguage('en')}>English</button>
            <button onClick={() => handleChangeLanguage('fr')}>Français</button>
            <button onClick={() => handleChangeLanguage('ar')}>Arabe</button>
        </div>
    );
};

export default App;
