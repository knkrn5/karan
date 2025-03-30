import { useEffect } from 'react';

export default function Resume() {
  useEffect(() => {
    window.location.href = '/assets/pdfs/KaranResume.pdf';
  }, []);

  return (
    <div className="h-screen m-2 p-2 bg-gray-200 text-black dark:bg-slate-800 dark:text-white">
      Redirecting to Resume
    </div>
  );
}
