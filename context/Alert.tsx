import { createContext, ReactNode, useContext, useEffect, useState, type JSX } from 'react';
import { MsgSeverityEnum } from '@/types/alert'

import Alert from '@/components/Alert'

type Options = {
  severity?: MsgSeverityEnum
  autoHideDuration?: number
}

const defaultOptions: Options = {
  severity: MsgSeverityEnum.INFO,
  autoHideDuration: 3000, // ms
}

type ValuesState = Options & {
  msg: ReactNode
}

type ISetAlertMsg = (msg: ReactNode, options?: Options) => void

interface IAlertContextState {
  setAlertMsg: ISetAlertMsg
}

export const AlertContext = createContext<IAlertContextState>({
  setAlertMsg: (_) => { },
})

export const useAlertContext = () => useContext(AlertContext)

export const AlertProvider = (props: any): JSX.Element => {
  const [values, setValues] = useState<ValuesState>({ msg: '', severity: MsgSeverityEnum.INFO })
  const [open, setOpen] = useState(false)

  const { msg, severity, autoHideDuration } = values

  const setAlertMsg: ISetAlertMsg = (msg, options = {}) => {
    setValues({
      msg,
      ...defaultOptions,
      ...options,
    })
    setOpen(true)
  }

  const handleClose = () => {
    setValues({ 
      msg: '', 
      severity: MsgSeverityEnum.INFO
    })
    setOpen(false)
  }

  useEffect(() => {
    let timeoutID: ReturnType<typeof setTimeout>
    if(open){
      timeoutID = setTimeout(() => {
        setOpen(false)
      }, autoHideDuration);
    }
  
    return () => {
      clearTimeout(timeoutID)
    }
  }, [open])
  

  return (
    <AlertContext.Provider
      value={{
        setAlertMsg,
      }}
    >
      {open &&
        <div
          id="alertaPP"
          className='w-full max-w-xs top-2 right-2 fixed z-50'
        >
          <Alert onClose={handleClose} severity={severity} msg={msg as string}/>
        </div>
      }
        {props?.children}
    </AlertContext.Provider>
  )
}
