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
  firstName: string;
  lastName: string;
  email: string;
};

type Action = {
  setIsSuccessLoginedIn: (value: boolean) => void;
  setStatusInfo: (status: StatusInfoProps) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setMail: (email: string) => void;
  reset: () => void;
};

const useProfileStore = create<State & Action>((set) => ({
  isSuccessLoginedIn: false,
  setIsSuccessLoginedIn: (value: boolean ) => set({ isSuccessLoginedIn: value }),

  statusInfo: {},
  setStatusInfo: (message: StatusInfoProps) => set({ statusInfo: message }),

  firstName: '',
  setFirstName: (firstName: string) => set({ firstName }),

  lastName: '',
  setLastName: (lastName: string) => set({ lastName }),

  email: '',
  setMail: (email: string) => set({ email }),

  reset: () =>
    set({
      isSuccessLoginedIn: false,
      firstName: '',
      lastName: '',
      email: '',
    }),
}));

export { useProfileStore };
