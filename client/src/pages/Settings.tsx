import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { useSettings } from '../hooks/useSettings';
import type { Settings as SettingsType } from '../types/settings';
import '../styles/Settings.scss';

function Settings() {
  const { settings, updateSettings, resetSettings } = useSettings();
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    updateSettings({ defaultPriority: event.target.value as SettingsType['defaultPriority'] });
  }

  function handleTicketsPerPageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    updateSettings({ ticketsPerPage: Number(event.target.value) });
  }

  return (
    
        <div className="settings-page">
          <h1>Settings</h1>
          <div className="settings-card">
            <h2>Theme</h2>
            <div className="theme-buttons">
              <button
                className={settings.theme === 'light' ? 'theme-button active' : 'theme-button'}
                onClick={() => updateSettings({ theme: 'light' })}
              >
                Light
              </button>
              <button
                className={settings.theme === 'dark' ? 'theme-button active' : 'theme-button'}
                onClick={() => updateSettings({ theme: 'dark' })}
              >
                Dark
              </button>
            </div>
            <h2>Default Ticket Priority</h2>
            <select value={settings.defaultPriority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

            <h2>Tickets Per Page</h2>
            <select value={settings.ticketsPerPage} onChange={handleTicketsPerPageChange}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <button className="reset-button" onClick={resetSettings}>
              Reset to Default
            </button>
          </div>
        </div>
     
  );
}

export default Settings;
