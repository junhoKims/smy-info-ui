import { useLayoutEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import ModalUI from '@/core/Modal/components/ModalUI';
import usePresenter from '@/core/Modal/hooks/usePresenter';

interface ModalProps {
  open: boolean;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
}

const Modal = ({ open, onClose }: ModalProps) => {
  const [shows, setShows] = useState(open);
  const { presenter, createPresenter, removePresenter } = usePresenter({
    id: 'modal-presenter',
    style: PRESENTER_STYLES,
    onClose,
  });

  useLayoutEffect(() => {
    if (!open) {
      removePresenter();
      return;
    }

    createPresenter();
    setShows(true);
  }, [createPresenter, open, removePresenter]);

  if (!shows || !presenter) {
    return null;
  }

  return ReactDOM.createPortal(<ModalUI />, presenter);
};

const PRESENTER_STYLES = [
  'flex',
  'items-center',
  'justify-center',
  'bg-gray-500/50',
  'opacity-100',
  'px-11',
];

export default Modal;
