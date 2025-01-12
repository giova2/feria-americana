import React from 'react'

type TitleProps = {
  className?: string
}

const Title: React.FC<React.PropsWithChildren & TitleProps> = ({ children, className }) => {
  return(
    <h1 className={`text-xl font-semibold ${className ?? ''}`}>
      {children}
    </h1>
  );
}

export { Title as default }