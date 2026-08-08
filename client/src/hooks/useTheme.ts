import { useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';

export function useTheme() {
  const { settings } = useSettings();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);
}
