import { create } from 'zustand';

interface StatusInfoProps {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

// Define the Type for Zustand Store
type State = {
  isSuccessLoginedIn: boolean;
  statusInfo: StatusInfoProps;
};

type Action = {
  setIsSuccessLoginedIn: (value: boolean) => void;
  setStatusInfo: (status: StatusInfoProps) => void;
  resetAuthStore: () => void;
};

const useAuthStore = create<State & Action>(set => ({
  isSuccessLoginedIn: false,
  setIsSuccessLoginedIn: (value: boolean) => set({ isSuccessLoginedIn: value }),

  statusInfo: {},
  setStatusInfo: (message: StatusInfoProps) => set({ statusInfo: message }),

  resetAuthStore: () =>
    set({
      isSuccessLoginedIn: false,
    }),
}));

export { useAuthStore };
