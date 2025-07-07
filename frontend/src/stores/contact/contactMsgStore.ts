import { create } from 'zustand';

interface State {
  name: string;
  email: string;
  message: string;
  isSuccess: boolean;
  isSubmitted?: boolean;
  contactMsgId: string;
  seeContactMsgFromDb: boolean;
}

interface Action {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setMessage: (message: string) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setContactMsgData: (info: Partial<State>) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  setContactMsgId: (contactMsgId: string) => void;
  contactMsgReset: () => void;
  setSeeContactMsgFromDb: (seeContactMsgFromDb: boolean) => void;
}

const useContactMsgStore = create<State & Action>(set => ({
  name: '',
  email: '',
  message: '',
  isSuccess: false,
  isSubmitted: false,
  contactMsgId: '',
  seeContactMsgFromDb: false,

  setName: (name: string) => set({ name }),
  setEmail: (email: string) => set({ email }),
  setMessage: (message: string) => set({ message }),
  setIsSubmitted: (isSubmitted: boolean) => set({ isSubmitted }),

  setIsSuccess: (isSuccess: boolean) => set({ isSuccess }),
  setContactMsgData: (info: Partial<State>) => set(state => ({ ...state, ...info })),
  setContactMsgId: (contactMsgId: string) => set({ contactMsgId }),
  setSeeContactMsgFromDb: (seeContactMsgFromDb: boolean) => set({ seeContactMsgFromDb }),

  contactMsgReset: () => set({ name: '', email: '', message: '', isSuccess: false }),
}));

export { useContactMsgStore };
