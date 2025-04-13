import { create } from 'zustand';
import { ICnotificationMsgProp } from '../../utils/ICnotificationMsg';

interface State {
  name: string;
  email: string;
  message: string;
  contactMsgStatusNotification: ICnotificationMsgProp;
  isSuccess: boolean;
  isSubmitted?: boolean;
  contactMsgId: string;
}

interface Action {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setMessage: (message: string) => void;
  setContactMsgStatusNotification: (status: ICnotificationMsgProp) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setContactMsgData: (info: Partial<State>) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  setContactMsgId: (contactMsgId: string) => void;
  contactMsgReset: () => void;
}

const useContactInfoStore = create<State & Action>(set => ({
  name: '',
  email: '',
  message: '',
  contactMsgStatusNotification: {},
  isSuccess: false,
  isSubmitted: false,
  contactMsgId: '',

  setName: (name: string) => set({ name }),
  setEmail: (email: string) => set({ email }),
  setMessage: (message: string) => set({ message }),
  setIsSubmitted: (isSubmitted: boolean) => set({ isSubmitted }),

  setIsSuccess: (isSuccess: boolean) => set({ isSuccess }),
  setContactMsgStatusNotification: (message: ICnotificationMsgProp) =>
    set({ contactMsgStatusNotification: message }),
  setContactMsgData: (info: Partial<State>) => set(state => ({ ...state, ...info })),
  setContactMsgId: (contactMsgId: string) => set({ contactMsgId }),

  contactMsgReset: () =>
    set({ name: '', email: '', message: '', isSuccess: false, contactMsgStatusNotification: {} }),
}));

export { useContactInfoStore };
