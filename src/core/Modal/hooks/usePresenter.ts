import { useCallback, useLayoutEffect, useState } from 'react';

interface UsePresenterProps {
  id: string;
  style?: string[];
  onClose?: React.MouseEventHandler<HTMLDivElement>;
}

const usePresenter = ({ id, style = [], onClose }: UsePresenterProps) => {
  const [presenter, setPresenter] = useState<Element | DocumentFragment | null>(null);

  const createPresenter = useCallback(() => {
    const element = createElement({ id, style });
    setPresenter(element);
  }, [id, style]);

  const removePresenter = useCallback(() => {
    const element = removeElement({ id });
    setPresenter(element);
  }, [id]);

  useLayoutEffect(() => {
    if (!presenter || !onClose) {
      return;
    }

    presenter.addEventListener('click', onClose as unknown as EventListenerOrEventListenerObject);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presenter]);

  return { presenter, createPresenter, removePresenter };
};

type CreateElementProps = Pick<UsePresenterProps, 'id' | 'style'>;

const createElement = ({ id, style = [] }: CreateElementProps) => {
  let presenter = document.getElementById(id);

  if (presenter) {
    return presenter;
  }

  presenter = document.createElement('div');
  presenter.setAttribute('id', id);
  presenter.classList.add(...PRESENTER_CLASS_LIST, ...style);
  document.body.appendChild(presenter);
  return presenter;
};

type removeElementProps = Pick<UsePresenterProps, 'id'>;

const removeElement = ({ id }: removeElementProps) => {
  const element = document.getElementById(id);

  if (!element) {
    return null;
  }

  document.body.removeChild(element);
  return null;
};

const PRESENTER_CLASS_LIST = [
  'w-full',
  'h-full',
  'fixed',
  'inset-y-0',
  'box-border',
  'opacity-0',
  'cursor-pointer',
  'z-10',
] as const;

export default usePresenter;
