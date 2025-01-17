import { LoaderCircle } from "lucide-react";

const Loader = ({ className }: { className?: string }) => (
  <div className={`flex justify-center items-center ${className ?? ''}`}>
    <LoaderCircle className='animate-spin' size={40}/>
  </div>
);

export default Loader