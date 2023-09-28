import { BUTTON_SIZES } from './constants';

export type ButtonSizes = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES];
