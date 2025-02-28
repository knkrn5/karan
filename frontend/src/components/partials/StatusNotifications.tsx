import { useState, useEffect } from 'react';
import { CircleCheck, Info, OctagonAlert, CircleX } from 'lucide-react';

interface StatusProp {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

export default function StatusNotifications({ statusInfo }: { statusInfo: StatusProp }) {
  const [status, setStatus] = useState<StatusProp>({});

  useEffect(() => {
    setStatus(statusInfo); 
  }, [statusInfo]);

  return (
    <div className="space-y-4 p-4">
      {status.success && (
        <div className="flex items-center w-fit mx-auto bg-green-600 text-white px-4 py-2 rounded-lg">
          <CircleCheck className="mr-2" />
          <span>Success- {status.success}</span>
        </div>
      )}
      {status.info && (
        <div className="flex items-center w-fit mx-auto bg-blue-600 text-white px-4 py-2 rounded-lg">
          <Info className="mr-2" />
          <span> {status.info}</span>
        </div>
      )}
      {status.warning && (
        <div className="flex items-center w-fit mx-auto bg-yellow-600 text-white px-4 py-2 rounded-lg">
          <OctagonAlert className="mr-2" />
          <span>Warning- {status.warning}</span>
        </div>
      )}
      {status.error && (
        <div className="flex items-center w-fit mx-auto bg-red-600 text-white px-4 py-2 rounded-lg">
          <CircleX className="mr-2" />
          <span>Failed - {status.error}</span>
        </div>
      )}
    </div>
  );
}
