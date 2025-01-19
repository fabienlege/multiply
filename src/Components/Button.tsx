import { FC, HTMLAttributes, PropsWithChildren } from 'react';

export interface ButtonProps extends PropsWithChildren{
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?:boolean
  style?: HTMLAttributes<HTMLButtonElement>['style'];
}

export const Button:FC<ButtonProps> = ({children, onClick, fullWidth, style, disabled}) => {
  const finalStyle: HTMLAttributes<HTMLButtonElement>['style'] = {
    backgroundColor: '#01579B',
    color: '#fff',
    borderRadius: 0,
    height: '6rem',
    ...style
  }

  fullWidth && (finalStyle.width = '100%')

  disabled && (finalStyle.backgroundColor = '#ccc')

  return <button style={finalStyle} onClick={onClick} disabled={disabled}>{children}</button>
}