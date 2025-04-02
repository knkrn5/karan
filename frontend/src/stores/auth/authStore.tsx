import { create } from 'zustand';

interface StatusInfoProps {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

type State = {
  isSuccessLoginedIn: boolean | null;
  statusInfoAuth: StatusInfoProps;
};

type Action = {
  setIsSuccessLoginedIn: (value: boolean) => void;
  setStatusInfoAuth: (status: StatusInfoProps) => void;
  resetAuthStore: () => void;
};

const useAuthStore = create<State & Action>(set => ({
  isSuccessLoginedIn: null,
  setIsSuccessLoginedIn: (value: boolean) => set({ isSuccessLoginedIn: value }),

  statusInfoAuth: {},
  setStatusInfoAuth: (message: StatusInfoProps) => set({ statusInfoAuth: message }),

  resetAuthStore: () =>
    set({
      isSuccessLoginedIn: false,
    }),
}));

export { useAuthStore };
