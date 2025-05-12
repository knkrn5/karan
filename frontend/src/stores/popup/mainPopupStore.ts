import { create } from 'zustand';


type State = {
    mainPopupMsg: string;
};

type Action = {
    setMainPopupMsg: (value: string) => void;
};

const useMainPopupStore = create<State & Action>(set => ({
    mainPopupMsg: '',
    setMainPopupMsg: (value: string) => set({ mainPopupMsg: value }),

}));

export { useMainPopupStore };
