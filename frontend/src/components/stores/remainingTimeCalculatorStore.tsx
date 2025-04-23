import { create } from 'zustand';

type State = {
  remainingSeconds: number;
  formattedRemainingTime: string;
  clearRemainingTimeInterval: () => void;
};

type Action = {
  setRemainingSeconds: (value: number) => void;
  setFormattedRemainingTime: (value: string) => void;
  setclearRemainingTimeInterval: (intervalID: () => void) => void;
  resetRemainingTimeCalculatorStore: () => void;
};

const useRemainingTimeCalculatorStore = create<State & Action>(set => ({
  remainingSeconds: 0,
  setRemainingSeconds: (value: number) => set({ remainingSeconds: value }),
  formattedRemainingTime: '00:00',
  setFormattedRemainingTime: (value: string) => set({ formattedRemainingTime: value }),
  clearRemainingTimeInterval: () => {},
  setclearRemainingTimeInterval: (intervalID: () => void) =>
    set({ clearRemainingTimeInterval: intervalID }),

  //reseting store to default values
  resetRemainingTimeCalculatorStore: () => {
    set({
      remainingSeconds: 0,
      formattedRemainingTime: '00:00',
    });
  },
}));

export { useRemainingTimeCalculatorStore };
