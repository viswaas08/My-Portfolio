import React, { createContext, useContext, useState, useEffect } from 'react';

interface BrandCustomizerContextType {
  customBrandName: string;
  setCustomBrandName: (name: string) => void;
  resetCustomBrandName: () => void;
  getBrandName: (defaultName: string) => string;
}

const BRAND_NAME_KEY = 'viswaa_custom_brand_preview_v1';

const BrandCustomizerContext = createContext<BrandCustomizerContextType | undefined>(undefined);

export const BrandCustomizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customBrandName, setCustomBrandNameState] = useState<string>(() => {
    try {
      return localStorage.getItem(BRAND_NAME_KEY) || '';
    } catch {
      return '';
    }
  });

  const setCustomBrandName = (name: string) => {
    setCustomBrandNameState(name);
    try {
      if (name.trim()) {
        localStorage.setItem(BRAND_NAME_KEY, name.trim());
      } else {
        localStorage.removeItem(BRAND_NAME_KEY);
      }
      window.dispatchEvent(new CustomEvent('brand_name_changed', { detail: { name } }));
    } catch (e) {
      console.warn('Could not persist custom brand name:', e);
    }
  };

  const resetCustomBrandName = () => {
    setCustomBrandName('');
  };

  const getBrandName = (defaultName: string): string => {
    return customBrandName.trim() ? customBrandName.trim() : defaultName;
  };

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === BRAND_NAME_KEY) {
        setCustomBrandNameState(e.newValue || '');
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <BrandCustomizerContext.Provider
      value={{
        customBrandName,
        setCustomBrandName,
        resetCustomBrandName,
        getBrandName,
      }}
    >
      {children}
    </BrandCustomizerContext.Provider>
  );
};

export const useBrandCustomizer = (): BrandCustomizerContextType => {
  const context = useContext(BrandCustomizerContext);
  if (!context) {
    throw new Error('useBrandCustomizer must be used within a BrandCustomizerProvider');
  }
  return context;
};
