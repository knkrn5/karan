import { create } from 'zustand';

interface TRnotificationPopupProp {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

type State = {
  TRpopupNotificationMsg: TRnotificationPopupProp;
};

type Action = {
  setTRpopupNotificationMsg: (value: TRnotificationPopupProp) => void;
  resetNotificationPopupStore: () => void;
};

const useTRpopupNotificationStore = create<State & Action>(set => ({
  TRpopupNotificationMsg: {},
  setTRpopupNotificationMsg: (value: TRnotificationPopupProp) => set({ TRpopupNotificationMsg: value }),

  resetNotificationPopupStore: () => set({ TRpopupNotificationMsg: {} }),
}));

export { useTRpopupNotificationStore };
