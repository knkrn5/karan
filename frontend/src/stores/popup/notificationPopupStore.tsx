import { create } from 'zustand';

interface notificationMsgProp {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

type State = {
  notificationMsg: notificationMsgProp;
};

type Action = {
  setNotificationMsg: (value: notificationMsgProp) => void;
  resetNotificationPopupStore: () => void;
};

const useNotificationPopupStore = create<State & Action>(set => ({
  notificationMsg: {},
  setNotificationMsg: (value: notificationMsgProp) => set({ notificationMsg: value }),

  resetNotificationPopupStore: () => set({ notificationMsg: {} }),
}));

export { useNotificationPopupStore };
