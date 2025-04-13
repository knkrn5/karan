import { useEffect } from 'react';

import { FaCircleCheck, FaCircleInfo, FaCircleXmark, FaCircleExclamation } from 'react-icons/fa6';
import { useICnotificationMsgStore } from '../stores/ICnotificationMsgStore';

export interface ICnotificationMsgProp {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

// IN Component Notification Message
export function ICnotificationMsg() {
  //ICnotificationStatusMsgStore
  const ICnotificationStatusMsg = useICnotificationMsgStore(state => state.ICnotificationStatusMsg);
  const { setICnotificationMsg } = useICnotificationMsgStore();

  useEffect(() => {
    return () => {
      setICnotificationMsg({});
    };
  }, [setICnotificationMsg]);

  return (
    <div className="space-y-4 p-4">
      {ICnotificationStatusMsg.success && (
        <div className="flex items-center w-fit mx-auto bg-green-600 text-white px-4 py-2 rounded-lg">
          <FaCircleCheck className="mr-2 h-6 w-6" />
          <p>Success- {ICnotificationStatusMsg.success}</p>
        </div>
      )}
      {ICnotificationStatusMsg.info && (
        <div className="flex items-center w-fit mx-auto bg-blue-600 text-white px-4 py-2 rounded-lg">
          <FaCircleInfo className="mr-2 h-6 w-6" />
          <p> {ICnotificationStatusMsg.info}</p>
        </div>
      )}
      {ICnotificationStatusMsg.warning && (
        <div className="flex items-center w-fit mx-auto bg-yellow-600 text-white px-4 py-2 rounded-lg">
          <FaCircleExclamation className="mr-2 h-6 w-6" />
          <p>Warning- {ICnotificationStatusMsg.warning}</p>
        </div>
      )}
      {ICnotificationStatusMsg.error && (
        <div className="flex items-center w-fit mx-auto bg-red-600 text-white px-4 py-2 rounded-lg">
          <FaCircleXmark className="mr-2 h-6 w-6" />
          <p>Failed - {ICnotificationStatusMsg.error}</p>
        </div>
      )}
    </div>
  );
}
