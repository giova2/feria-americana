import React from 'react'

type DescriptionProps = {
  className?: string
}

const Description: React.FC<React.PropsWithChildren & DescriptionProps> = ({ children, className }) => {
  return(
    <h1 className={`text-lg ${className ?? ''}`}>
      {children}
    </h1>
  );
}

export { Description as default }