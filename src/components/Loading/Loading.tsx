import { Spinner } from "@nextui-org/spinner";


const Loading = () => {
    return (
        <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
          
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-default-500"></div>
      
        </div>
      );
    }
export default Loading;