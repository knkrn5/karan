import { create } from 'zustand';

type State = {
  isSuccessLoginedIn: boolean | null;
};

type Action = {
  setIsSuccessLoginedIn: (value: boolean) => void;
  resetAuthStore: () => void;
};

const useAuthStore = create<State & Action>(set => ({
  isSuccessLoginedIn: null,
  setIsSuccessLoginedIn: (value: boolean) => set({ isSuccessLoginedIn: value }),

  resetAuthStore: () =>
    set({
      isSuccessLoginedIn: false,
    }),
}));

export { useAuthStore };
