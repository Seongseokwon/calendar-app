import { ReactNode } from "react";

const OPEN_MODAL = "modal/OPEN_MODAL" as const;
const CLOSE_MODAL = "modal/CLOSE_MODAL" as const;

export const openModal = (title: string, children: ReactNode) => ({
  type: OPEN_MODAL,
  title,
  children,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

type ModalState = {
  isOpen: boolean;
  title?: string;
  children: ReactNode | null;
};
const initialState: ModalState = {
  isOpen: false,
  title: "",
  children: null,
};

type ModalAction = ReturnType<typeof openModal> | ReturnType<typeof closeModal>;

export default function modal(
  state: ModalState = initialState,
  action: ModalAction
): ModalState {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        isOpen: true,
        title: action.title,
        children: action.children,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isOpen: false,
        title: "",
        children: null,
      };
    }
    default:
      return state;
  }
}
