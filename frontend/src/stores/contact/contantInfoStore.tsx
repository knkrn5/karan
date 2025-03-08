import { create } from 'zustand';

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
  isSubmitted?: boolean;
  contactMsgId: string;
}

interface Action {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setMessage: (message: string) => void;
  setStatusInfo: (status: StatusInfoProps) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setContactInfo: (info: Partial<State>) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  setContactMsgId: (contactMsgId: string) => void;
  contactMsgReset: () => void;
}

const useContactInfoStore = create<State & Action>((set) => ({
  name: '',
  email: '',
  message: '',
  statusInfo: {},
  isSuccess: false,
  isSubmitted: false,
  contactMsgId: '',


  setName: (name: string) => set({ name }),
  setEmail: (email: string) => set({ email }),
  setMessage: (message: string) => set({ message }),
  setIsSubmitted: (isSubmitted: boolean) => set({ isSubmitted }),

  setIsSuccess: (isSuccess: boolean) => set({ isSuccess }),
  setStatusInfo: (status: StatusInfoProps) => set({ statusInfo: status }),
  setContactInfo: (info: Partial<State>) => set((state) => ({ ...state, ...info })),
  setContactMsgId: (contactMsgId: string) => set({ contactMsgId }),

  contactMsgReset: () => set({ name: '', email: '', message: '', isSuccess: false, statusInfo: {} }),
}));

export { useContactInfoStore };
