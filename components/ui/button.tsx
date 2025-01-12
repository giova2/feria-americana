import { Button, ButtonProps } from '@nextui-org/react'
import React from 'react'

export const PrimaryButton: React.FC<React.PropsWithChildren & ButtonProps> = ({ children, ...props }) => {
  return (
    <Button 
      type="submit" 
      color="primary" 
      variant="ghost" 
      className={`w-full font-semibold ${props.className ?? ''}`} 
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
