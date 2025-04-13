import { create } from 'zustand';

interface TRnotificationPopupProp {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

type State = {
  TRnotificationMsg: TRnotificationPopupProp;
};

type Action = {
  setTRnotificationMsg: (value: TRnotificationPopupProp) => void;
  resetNotificationPopupStore: () => void;
};

const useNotificationPopupStore = create<State & Action>(set => ({
  TRnotificationMsg: {},
  setTRnotificationMsg: (value: TRnotificationPopupProp) => set({ TRnotificationMsg: value }),

  resetNotificationPopupStore: () => set({ TRnotificationMsg: {} }),
}));

export { useNotificationPopupStore };
