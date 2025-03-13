import { create } from 'zustand';

interface StatusInfoProps {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

type State = {
  statusInfo: StatusInfoProps;
  firstName: string;
  lastName: string;
  email: string;
};

type Action = {
  setStatusInfo: (status: StatusInfoProps) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setMail: (email: string) => void;
  resetProfileStore: () => void;
};

const useProfileStore = create<State & Action>(set => ({
  statusInfo: {},
  setStatusInfo: (message: StatusInfoProps) => set({ statusInfo: message }),

  firstName: '',
  setFirstName: (firstName: string) => set({ firstName }),

  lastName: '',
  setLastName: (lastName: string) => set({ lastName }),

  email: '',
  setMail: (email: string) => set({ email }),

  resetProfileStore: () =>
    set({
      firstName: '',
      lastName: '',
      email: '',
    }),
}));

export { useProfileStore };
