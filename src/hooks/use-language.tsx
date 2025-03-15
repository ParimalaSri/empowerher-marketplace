
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'es' | 'fr' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get stored language or default to browser language
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    const supported: Language[] = ['en', 'hi', 'es', 'fr', 'de'];
    return supported.includes(browserLang as Language) 
      ? browserLang as Language 
      : 'en';
  };

  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('preferredLanguage');
    return (stored as Language) || getBrowserLanguage();
  });

  // Save language preference
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
