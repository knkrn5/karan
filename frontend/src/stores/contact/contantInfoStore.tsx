import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface StatusInfoProps {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

interface State {
  name: string;
  email: string;
  message: string;
  statusInfo: StatusInfoProps;
  isSuccess: boolean;
  contactMsgId?: string;
}

interface Action {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setMessage: (message: string) => void;
  setStatusInfo: (status: StatusInfoProps) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setContactInfo: (info: Partial<State>) => void;
  setContactMsgId: (id: string) => void;
}

const useContactInfoStore = create<State & Action>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      message: '',
      statusInfo: {},
      isSuccess: false,
      contactMsgId: '',

      setName: (name: string) => set({ name }),
      setEmail: (email: string) => set({ email }),
      setMessage: (message: string) => set({ message }),
      setContactMsgId: (id: string) => set({ contactMsgId: id }),

      setIsSuccess: (isSuccess: boolean) => set({ isSuccess }),
      setStatusInfo: (status: StatusInfoProps) => set({ statusInfo: status }),
      setContactInfo: (info: Partial<State>) => set((state) => ({ ...state, ...info })),
    }),
    {
      name: 'contactInfoLs',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useContactInfoStore };
