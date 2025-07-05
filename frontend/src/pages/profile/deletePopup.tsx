import { TiUserDelete } from 'react-icons/ti';
import { useMainPopupStore } from '../../stores/popup/mainPopupStore';
import PopupModel from '../../components/popups/mainPopup';

interface DeletePopupProps {
  onDelete: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationPopup({ onDelete, onCancel }: DeletePopupProps) {
  //main popup store
  const popupMsg = useMainPopupStore(state => state.mainPopupMsg);
  const { setMainPopupMsg } = useMainPopupStore();

  return (
    <PopupModel
      header="Confirm Deletion"
      footer="karan.email"
      onClose={() => {
        onCancel();
        setMainPopupMsg('');
      }}
    >
      <div className="relative  w-full max-w-md max-h-full">
        <div className="relative bg-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
          <div className="p-4 text-center">
            <TiUserDelete className="mx-auto mb-4 text-gray-600 w-12 h-12 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">{popupMsg}</h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800  outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center cursor-pointer"
              onClick={() => {
                onDelete();
                setMainPopupMsg('');
              }}
            >
              Delete
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium rounded-lg  text-gray-900 outline-none bg-gray-300 hover:bg-gray-400  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-900 duration-300 cursor-pointer"
              onClick={() => {
                onCancel();
                setMainPopupMsg('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </PopupModel>
  );
}
