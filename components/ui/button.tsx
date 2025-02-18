import { Button, ButtonProps } from '@heroui/react'
import clsx from 'clsx'
import React from 'react'

type CustomButtonProps = React.PropsWithChildren & ButtonProps & {
  addClassName?: string
}

export const PrimaryButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return (
    <Button 
      type="submit" 
      color="primary" 
      variant="ghost" 
      className={clsx(`w-full font-semibold`, props.addClassName ?? '')} 
      {...props}>
      {children}
    </Button> 
  )
}

export const SecondaryButton: React.FC<React.PropsWithChildren & ButtonProps> = ({ children, ...props }) => {
  return (
    <Button type="submit" color="secondary" variant="ghost" className="w-full font-semibold" {...props}>
      {children}
    </Button> 
  )
}
