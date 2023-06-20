export const INPUT_SIZE: Record<string, string> = {
  small: 'w-11 h-6 after:h-5 after:w-5 after:left-[2px]',
  default:
    'w-16 h-8 after:h-7 after:w-7 after:left-[2px] peer-checked:after:left-[6px]',
  large:
    'w-20 h-10 after:h-9 after:w-9 after:left-[2px] peer-checked:after:left-[6px]',
};

export const LABEL_SIZE: Record<string, string> = {
  small: 'text-sm font-medium text-gray-900',
  default: 'text-base font-medium text-gray-900',
  large: 'text-base font-medium text-gray-900',
};

export const VARIANT: Record<string, string> = {
  primary: 'peer-checked:bg-primary',
  secondary: 'peer-checked:bg-secondary',
  danger: 'peer-checked:bg-danger',
  error: 'peer-checked:bg-error',
  warning: 'peer-checked:bg-warning',
  success: 'peer-checked:bg-success',
};
