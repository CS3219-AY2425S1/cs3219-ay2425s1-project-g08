import editicon from "../images/editicon.png";
interface EditIconProps {
    openModal: () => void;
}
export const EditIcon: React.FC<EditIconProps> = ({ openModal }) => {
    return (
        <div className=" flex items-center justify-center">
                <button
                    onClick={() => openModal()}
                    className="bg-gray-500 rounded-lg p-4 text-2xl hover:bg-gray-300 h-auto w-auto"
                >
                <img src={editicon} alt="Edit" className="w-5 h-5"/>
                </button>
        </div>
        
    );
}