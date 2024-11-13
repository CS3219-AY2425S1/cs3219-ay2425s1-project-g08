import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface TimerProps {
    showTimer: boolean;
    setShowTimer: React.Dispatch<React.SetStateAction<boolean>>;
    cancelMatchRequest: () => Promise<void>;
}

const Timer: React.FC<TimerProps> = ({
    showTimer,
    cancelMatchRequest,
    setShowTimer,
}) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center text-gray-600 mb-4">
                Finding you a suitable partner
            </div>
            <CountdownCircleTimer
                isPlaying
                duration={30}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[30, 20, 10, 0]}
                onComplete={() => {
                    if (showTimer) {
                        cancelMatchRequest();
                    }
                    setShowTimer(false);
                    return { shouldRepeat: false };
                }}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    );
};

export default Timer;
