import * as React from 'react';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size: 'large' | 'medium' | 'small';
}

/**
 * UI 버튼
 *
 * @example
 * <Button>버튼</Button>
 */
const Button = (props: ButtonProps) => {
  return <button {...props} />;
};

export default Button;
