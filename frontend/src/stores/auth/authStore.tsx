import { create } from 'zustand';

interface StatusInfoProps {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

type State = {
  isSuccessLoginedIn: boolean | null;
  authStatusNotificationMsg: StatusInfoProps;
};

type Action = {
  setIsSuccessLoginedIn: (value: boolean) => void;
  setAuthStatusNotificationMsg: (status: StatusInfoProps) => void;
  resetAuthStore: () => void;
};

const useAuthStore = create<State & Action>(set => ({
  isSuccessLoginedIn: null,
  setIsSuccessLoginedIn: (value: boolean) => set({ isSuccessLoginedIn: value }),

  authStatusNotificationMsg: {},
  setAuthStatusNotificationMsg: (message: StatusInfoProps) =>
    set({ authStatusNotificationMsg: message }),

  resetAuthStore: () =>
    set({
      isSuccessLoginedIn: false,
    }),
}));

export { useAuthStore };
