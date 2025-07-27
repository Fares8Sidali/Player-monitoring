import Sidebar from './Sidebar';
import Header from './Header';
import { useSettingsStore } from '../store/useSettingsStore';


const SettingsPage = () => {
  const { settings, updateSetting, resetSettings } = useSettingsStore();

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm " />
      </div>
      <Sidebar />
      <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Settings' />
        <div className="p-4">
          <div className="mb-2">
            <label>
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={(e) => updateSetting('notificationsEnabled', e.target.checked)}
                className='cursor-pointer'
              />
              Enable Notifications
            </label>
          </div>

          <div className="mb-2">
            <label>
              Language:
              <select
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
                className='cursor-pointer'
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </label>
          </div>

          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
            onClick={resetSettings}
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;