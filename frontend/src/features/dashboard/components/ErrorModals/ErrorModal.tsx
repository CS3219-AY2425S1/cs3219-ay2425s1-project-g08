
interface ErrorModalProps {
    onClose: () => void;
    error: string | undefined;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
    onClose, error
}) => {

    return (
        <div 
        id = "errorModal"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 text-black"
        >
                <div className="bg-off-white rounded-lg p-4 w-1/5 h-1/2 fade-in modal-context z-50">
                    <div className='mb-10 justify-center flex' >
                        <h1><b>Error updating</b></h1>
                    </div>
                    <div className='mb-10 justify-center flex' >
                        {error}
                    </div>
                    <div className='mb-10 justify-center flex' >
                    <button
                            onClick={onClose}
                            className="p-8 block text-center rounded-lg px-4 py-1.5 bg-red-500  text-white text-lg hover:bg-red-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
                    
        </div>

    );
  }


export default ErrorModal;
