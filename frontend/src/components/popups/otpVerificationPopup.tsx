import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { verifyEmailOtp } from '../../utils/auth.utils';
import { ICnotificationMsg } from '../notifications/ICnotificationMsg';
import { useICnotificationMsgStore } from '../../stores/notificationMsg/ICnotificationMsgStore.js';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  header: string;
  email: string;
  enteredOTP: string;
};

const OtpVerificationPopupModel = ({
  isOpen,
  onClose,
  onAction,
  header,
  email,
  enteredOTP,
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const { setICnotificationMsg } = useICnotificationMsgStore();

  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  async function handleAction() {
    const response = await verifyEmailOtp(email, enteredOTP);
    console.log(response);
    if (response.success) {
      setICnotificationMsg({ success: response.message });
    }
  }

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-100 backdrop-blur-[2px]">
      <div
        className={`max-w-[400px] bg-white dark:bg-slate-900 shadow-2xl hover:shadow-xl dark:shadow-black px-6 py-2 m-1 rounded-2xl relative 
        ${!isVisible ? 'scale-95' : 'scale-100'} duration-300`}
      >
        <div className="grid grid-cols-[1fr_auto] gap-6">
          {/* header */}
          <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-extrabold font-serif text-black dark:text-white">
              {header}
            </h2>
          </div>
          <button
            title="Close"
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-1 text-black bg-gray-100 hover:bg-gray-200  dark:text-gray-300 dark:bg-gray-600 dark:hover:text-white dark:hover:bg-gray-700  rounded-xl duration-300 transition-transform cursor-pointer"
          >
            <IoMdClose />
          </button>
        </div>
        <hr className="my-1 border-gray-500 dark:border-gray-500" />

        <p className="text-gray-700 dark:text-gray-400">email@email.com</p>

        <label htmlFor="otp" className="flex flex-col p-2 my-2 text-gray-700 dark:text-gray-400">
          Enter OTP:
          <input
            name="otp"
            id="otp"
            type="otp"
            // value=
            // onChange={}
            placeholder="OTP"
            // disabled={}
            className={`w-full mt-2 px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 
              `}
          />
        </label>
        <ICnotificationMsg />
        {/* Footer */}
        <hr className="my-1 border-gray-500 dark:border-gray-500" />
        {/* buttons */}
        <div className="w-full flex justify-between items-center gap-2 mt-4">
          <button
            title="Cancel"
            type="button"
            className="w-full p-2 text-white bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 rounded-lg transition duration-200 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            title="Submit OTP"
            type="button"
            className="w-full p-2 text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition duration-200 cursor-pointer"
            onClick={() => {
              handleAction();
              onAction();
            }}
          >
            verify OTP
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('popup-modal-root') as HTMLElement
  );
};

export default OtpVerificationPopupModel;

{
  /* <OtpVerificationPopupModel
isOpen={isforgotPassword}
onClose={() => setisforgotPassword(false)}
header={'OTP Verification'}
onAction={() => {}}
email={loginFormFieldData.email}
enteredOTP=''
></OtpVerificationPopupModel> */
}
