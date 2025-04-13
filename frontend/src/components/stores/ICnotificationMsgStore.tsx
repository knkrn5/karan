import { create } from 'zustand';
import { ICnotificationMsgProp } from '../../components/notifications/ICnotificationMsg';

type State = {
  ICnotificationStatusMsg: ICnotificationMsgProp;
};

type Action = {
  setICnotificationMsg: (message: ICnotificationMsgProp) => void;
};

const useICnotificationMsgStore = create<State & Action>(set => ({
  ICnotificationStatusMsg: {},
  setICnotificationMsg: (message: ICnotificationMsgProp) =>
    set({ ICnotificationStatusMsg: message }),
}));

export { useICnotificationMsgStore };
