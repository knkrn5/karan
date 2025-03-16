import { create } from 'zustand';
// import { StatusNotificationsProp } from '../../utils/StatusNotifications';


type State = {
  // statusInfoProfile: StatusNotificationsProp;
  firstName: string;
  lastName: string;
  email: string;
};

type Action = {
  // setStatusInfoProfile: (status: StatusNotificationsProp) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setMail: (email: string) => void;
  resetProfileStore: () => void;
};

const useProfileStore = create<State & Action>(set => ({
/*   statusInfoProfile: {},
  setStatusInfoProfile: (message: StatusNotificationsProp) => set({ statusInfoProfile: message }), */

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
