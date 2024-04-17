import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../modules/modal";
import { RootState } from "../../modules";
import { MdOutlineClose } from "react-icons/md";

interface ModalProps {}

const Modal = ({}: ModalProps) => {
  const dispatch = useDispatch();
  const { title, children } = useSelector((state: RootState) => state.modal);
  return createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        <header className="modal__header">
          <h2 className="modal__header__title">{title}</h2>

          <button
            className="close-btn"
            type="button"
            onClick={() => dispatch(closeModal())}
          >
            <MdOutlineClose />
          </button>
        </header>
        <main className="modal__content">{children}</main>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
