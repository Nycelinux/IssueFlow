import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSettings } from './useSettings';

describe('useSettind', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('uses default settings when nothingg is stored', () => {
    const { result } = renderHook(() => useSettings());
    expect(result.current.settings).toEqual({
      theme: 'dark',
      defaultPriority: 'Low',
      ticketsPerPage: 10,
    });
  });

  it('loads Settings from localStorage', () => {
    const savedSettings = { theme: 'light', defaultPriority: 'Critical', ticketsPerPage: 20 };
    localStorage.setItem('settings', JSON.stringify(savedSettings));
    const { result } = renderHook(() => useSettings());
    expect(result.current.settings).toEqual(savedSettings);
  });

  it('updates settings', () => {
    const { result } = renderHook(() => useSettings());
    act(() => {
      result.current.updateSettings({ theme: 'light' });
    });
    expect(result.current.settings.theme).toBe('light');
  });

  it('saves updatedsettings to lacalStorage', () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.updateSettings({ ticketsPerPage: 20 });
    });
    const saved = JSON.parse(localStorage.getItem('settings')!);
    expect(saved.ticketsPerPage).toBe(20);
  });

  it('updates document theme', () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.updateSettings({ theme: 'light' });
    });
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('reset settings to default', () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.updateSettings({ theme: 'light', ticketsPerPage: 50 });
    });

    act(() => {
      result.current.resetSettings();
    });

    expect(result.current.settings).toEqual({
      theme: 'dark',
      defaultPriority: 'Low',
      ticketsPerPage: 10,
    });
  });
});
