import { useState, useEffect } from 'react';

import { FaCircleCheck, FaCircleInfo, FaCircleXmark, FaCircleExclamation  } from "react-icons/fa6";

export interface StatusNotificationsProp {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

export default function StatusNotifications({ statusInfo }: { statusInfo: StatusNotificationsProp }) {
  const [status, setStatus] = useState<StatusNotificationsProp>({
/*     success: '',
    info: '',
    warning: '',
    error: '', */
  });

  useEffect(() => {
    setStatus(statusInfo); 
  }, [statusInfo]);

  return (
    <div className="space-y-4 p-4">
      {status.success && (
        <div className="flex items-center w-fit mx-auto bg-green-600 text-white px-4 py-2 rounded-lg">
          <FaCircleCheck className="mr-2 h-6 w-6" />
          <p>Success- {status.success}</p>
        </div>
      )}
      {status.info && (
        <div className="flex items-center w-fit mx-auto bg-blue-600 text-white px-4 py-2 rounded-lg">
          <FaCircleInfo className="mr-2 h-6 w-6" />
          <p> {status.info}</p>
        </div>
      )}
      {status.warning && (
        <div className="flex items-center w-fit mx-auto bg-yellow-600 text-white px-4 py-2 rounded-lg">
          <FaCircleExclamation className="mr-2 h-6 w-6" />
          <p>Warning- {status.warning}</p>
        </div>
      )}
      {status.error && (
        <div className="flex items-center w-fit mx-auto bg-red-600 text-white px-4 py-2 rounded-lg">
          < FaCircleXmark  className="mr-2 h-6 w-6" />
          <p>Failed - {status.error}</p>
        </div>
      )}
    </div>
  );
}
