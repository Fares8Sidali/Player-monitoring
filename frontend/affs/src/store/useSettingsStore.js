import { create } from 'zustand';

export const useSettingsStore = create((set) => ({
  settings: {
    darkMode: false,
    notificationsEnabled: true,
    language: 'en',
  },

  updateSetting: (key, value) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [key]: value,
      },
    })),

  resetSettings: () =>
    set({
      settings: {
        darkMode: false,
        notificationsEnabled: true,
        language: 'en',
      },
    }),
}));
