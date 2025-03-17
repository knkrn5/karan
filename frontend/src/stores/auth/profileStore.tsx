import { create } from 'zustand';


type State = {
  firstName: string;
  lastName: string;
  email: string;
};

type Action = {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setMail: (email: string) => void;
  resetProfileStore: () => void;
};

const useProfileStore = create<State & Action>(set => ({

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
