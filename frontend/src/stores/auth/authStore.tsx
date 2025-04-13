import { create } from 'zustand';
import { ICnotificationMsgProp } from '../../utils/ICnotificationMsg';

type State = {
  isSuccessLoginedIn: boolean | null;
  authStatusNotificationMsg: ICnotificationMsgProp;
};

type Action = {
  setIsSuccessLoginedIn: (value: boolean) => void;
  setAuthStatusNotificationMsg: (message: ICnotificationMsgProp) => void;
  resetAuthStore: () => void;
};

const useAuthStore = create<State & Action>(set => ({
  isSuccessLoginedIn: null,
  setIsSuccessLoginedIn: (value: boolean) => set({ isSuccessLoginedIn: value }),

  authStatusNotificationMsg: {},
  setAuthStatusNotificationMsg: (message: ICnotificationMsgProp) =>
    set({ authStatusNotificationMsg: message }),

  resetAuthStore: () =>
    set({
      isSuccessLoginedIn: false,
    }),
}));

export { useAuthStore };
