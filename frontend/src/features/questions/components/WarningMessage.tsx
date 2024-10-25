interface WarningMessage {
    message: string;
}

const WarningMessage: React.FC<WarningMessage> = ({
    message
}) => {
    return (
        <p className="flex justify-center text-red-500 text-center">
            {message}
        </p>
    )
}

export default WarningMessage;