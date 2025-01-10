import { MsgSeverityEnum } from '@/types/alert'
import { forwardRef } from 'react'
import { CircleX } from 'lucide-react';

type AlertProps = {
  msg: string
  severity?: MsgSeverityEnum
  onClose?: (event: React.SyntheticEvent) => void;
}

const BACKGROUNDS = {
  [MsgSeverityEnum.SUCCESS]: 'bg-green-300',
  [MsgSeverityEnum.INFO]: 'bg-blue-300',
  [MsgSeverityEnum.WARNING]: 'bg-yellow-300',
  [MsgSeverityEnum.ERROR]: 'bg-red-300',
}

const TEXT_COLORS = {
  [MsgSeverityEnum.SUCCESS]: 'text-green-600',
  [MsgSeverityEnum.INFO]: 'text-blue-600',
  [MsgSeverityEnum.WARNING]: 'text-yellow-600',
  [MsgSeverityEnum.ERROR]: 'text-red-600',
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(({ 
  msg,
  severity = MsgSeverityEnum.INFO, 
  onClose 
}, ref) => {
  return(
    <div className={`px-2 py-2 flex flex-col ${BACKGROUNDS[severity]}`} ref={ref}>
      <CircleX className="self-end" size={20}  onClick={onClose}/>
      <div className={`mx-4 mb-1 text-small font-bold ${TEXT_COLORS[severity]}`}>{ msg }</div>
      {/* <div className={`text-tiny ${TEXT_COLORS[severity]}`}>{ body }</div> */}
    </div>
  )
})

Alert.displayName = 'Alert';


export type { AlertProps }
export default Alert
