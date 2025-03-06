import { create } from 'zustand';

// Define the Type for Zustand Store
type State = {
  isSuccessLoginedIn: boolean;
  firstName: string;
  lastName: string;
  email: string;
};

type Action = {
  setIsSuccessLoginedIn: (value: boolean) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setMail: (email: string) => void;
  reset: () => void;
};

const useProfileStore = create<State & Action>((set) => ({
  isSuccessLoginedIn: false,
  setIsSuccessLoginedIn: (value) => set({ isSuccessLoginedIn: value }),

  firstName: '',
  setFirstName: (firstName) => set({ firstName }),

  lastName: '',
  setLastName: (lastName) => set({ lastName }),

  email: '',
  setMail: (email) => set({ email }),

  reset: () =>
    set({
      isSuccessLoginedIn: false,
      firstName: '',
      lastName: '',
      email: '',
    }),
}));

export { useProfileStore };
