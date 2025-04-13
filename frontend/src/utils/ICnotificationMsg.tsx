import { useState, useEffect } from 'react';

import { FaCircleCheck, FaCircleInfo, FaCircleXmark, FaCircleExclamation } from 'react-icons/fa6';

export interface ICnotificationMsgProp {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

export function ICnotificationMsg({
  ICnotificationStatusMsg,
}: {
  ICnotificationStatusMsg: ICnotificationMsgProp;
}) {
  const [ICnotificationMsg, setICnotificationMsg] = useState<ICnotificationMsgProp>({
    success: '',
    info: '',
    warning: '',
    error: '',
  });

  useEffect(() => {
    setICnotificationMsg(ICnotificationStatusMsg);
  }, [ICnotificationStatusMsg]);

  return (
    <div className="space-y-4 p-4">
      {ICnotificationMsg.success && (
        <div className="flex items-center w-fit mx-auto bg-green-600 text-white px-4 py-2 rounded-lg">
          <FaCircleCheck className="mr-2 h-6 w-6" />
          <p>Success- {ICnotificationMsg.success}</p>
        </div>
      )}
      {ICnotificationMsg.info && (
        <div className="flex items-center w-fit mx-auto bg-blue-600 text-white px-4 py-2 rounded-lg">
          <FaCircleInfo className="mr-2 h-6 w-6" />
          <p> {ICnotificationMsg.info}</p>
        </div>
      )}
      {ICnotificationMsg.warning && (
        <div className="flex items-center w-fit mx-auto bg-yellow-600 text-white px-4 py-2 rounded-lg">
          <FaCircleExclamation className="mr-2 h-6 w-6" />
          <p>Warning- {ICnotificationMsg.warning}</p>
        </div>
      )}
      {ICnotificationMsg.error && (
        <div className="flex items-center w-fit mx-auto bg-red-600 text-white px-4 py-2 rounded-lg">
          <FaCircleXmark className="mr-2 h-6 w-6" />
          <p>Failed - {ICnotificationMsg.error}</p>
        </div>
      )}
    </div>
  );
}
