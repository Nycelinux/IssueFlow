import { useState, useEffect } from 'react';
import type { Settings } from '../types/settings';

const defaultSettings: Settings = {
  theme: 'dark',
  defaultPriority: 'Low',
  ticketsPerPage: 10,
};
export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem('settings');
    if (!savedSettings) {
      return defaultSettings;
    }
    return JSON.parse(savedSettings);
  });

  function updateSettings(newSettings: Partial<Settings>) {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('settings', JSON.stringify(updatedSettings));
    document.documentElement.setAttribute('data-theme', updatedSettings.theme);
  }

  function resetSettings() {
    setSettings(defaultSettings);
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
  }

  return { settings, setSettings, updateSettings, resetSettings };
}
