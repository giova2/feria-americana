import React from 'react'

type DescriptionProps = {
  className?: string
  onClick?: () => void 
}

const Description: React.FC<React.PropsWithChildren & DescriptionProps> = ({ children, className, onClick }) => {
  return(
    <h1 className={`text-lg ${className ?? ''}`} onClick={onClick}>
      {children}
    </h1>
  );
}

export { Description as default }