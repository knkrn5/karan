import { create } from 'zustand';
import { ICnotificationMsgProp } from '../../utils/ICnotificationMsg';

type State = {
  firstName: string;
  lastName: string;
  email: string;
  profileStatusNotificationMsg: ICnotificationMsgProp;
  isFetchingProfileData: boolean;
};

type Action = {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setMail: (email: string) => void;
  setIsFetchingProfileData: (isFetchingProfileData: boolean) => void;
  setProfileStatusNotificationMsg: (message: ICnotificationMsgProp) => void;
  resetProfileStore: () => void;
};

const useProfileStore = create<State & Action>(set => ({
  firstName: '',
  setFirstName: (firstName: string) => set({ firstName }),

  lastName: '',
  setLastName: (lastName: string) => set({ lastName }),

  email: '',
  setMail: (email: string) => set({ email }),

  profileStatusNotificationMsg: {},
  setProfileStatusNotificationMsg: (message: ICnotificationMsgProp) =>
    set({ profileStatusNotificationMsg: message }),

  isFetchingProfileData: false,
  setIsFetchingProfileData: (value: boolean) => set({ isFetchingProfileData: value }),

  resetProfileStore: () =>
    set({
      firstName: '',
      lastName: '',
      email: '',
      profileStatusNotificationMsg: {},
      isFetchingProfileData: false,
    }),
}));

export { useProfileStore };
