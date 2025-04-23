import { create } from 'zustand';

type State = {
  firstName: string;
  lastName: string;
  email: string;
  isFetchingProfileData: boolean;
};

type Action = {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setMail: (email: string) => void;
  setIsFetchingProfileData: (isFetchingProfileData: boolean) => void;
  resetProfileStore: () => void;
};

const useProfileStore = create<State & Action>(set => ({
  firstName: '',
  setFirstName: (firstName: string) => set({ firstName }),

  lastName: '',
  setLastName: (lastName: string) => set({ lastName }),

  email: '',
  setMail: (email: string) => set({ email }),

  isFetchingProfileData: false,
  setIsFetchingProfileData: (value: boolean) => set({ isFetchingProfileData: value }),

  resetProfileStore: () =>
    set({
      firstName: '',
      lastName: '',
      email: '',
      isFetchingProfileData: false,
    }),
}));

export { useProfileStore };
