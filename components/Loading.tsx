// import {FallingLines} from 'react-loader-spinner';
import { LoaderCircle } from 'lucide-react';

const Loading = () =>  
  <div className="top-0 left-0 fixed w-full h-full flex flex-row justify-center items-center z-50 opacity-65 bg-white">
    <LoaderCircle className='animate-spin' size={40}/>
  </div>

export default Loading