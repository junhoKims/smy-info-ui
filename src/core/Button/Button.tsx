import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

export type ButtonProps =
  | (React.ComponentPropsWithoutRef<'button'> & {
      as: 'button';
    })
  | (React.ComponentPropsWithoutRef<'a'> & {
      as: 'a';
      href: string;
    });

/**
 * UI 버튼
 *
 * @example
 * // 기본 Button
 * <Button as="button">버튼</Button>
 *
 * // 앵커 Button
 * <Button as="a" href="/">버튼</Button>
 */
const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className = '', ...rest }, ref) => {
    if (rest.as === 'a') {
      if (rest.target) {
        return (
          <a
            ref={ref as React.ForwardedRef<HTMLAnchorElement>}
            className={`${BUTTON_STYLE} ${className || ''}`}
            {...rest}
          />
        );
      }

      return (
        <Link
          to={rest.href}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={`${BUTTON_STYLE} ${className || ''}`}
          {...rest}
        />
      );
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        type={rest.type || 'button'}
        className={`${BUTTON_STYLE} ${className || ''}`}
        {...rest}
      />
    );
  },
);

const BUTTON_STYLE = 'border-none bg-white p-0 cursor-pointer';

Button.displayName = 'Button';

export default Button;
