import React from 'react'

type TitleProps = {
  className?: string
  onClick?: () => void
}

const Title: React.FC<React.PropsWithChildren & TitleProps> = ({ children, className, onClick }) => {
  return(
    <h1 className={`text-xl font-semibold ${className ?? ''}`} onClick={onClick}>
      {children}
    </h1>
  );
}

export { Title as default }