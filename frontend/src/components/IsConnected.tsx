import React from "react";

interface IsConnectedProps {
  isConnected: boolean;
}

const IsConnected: React.FC<IsConnectedProps> = ({ isConnected }) => {
  return (
    <>
      {location.pathname !== "/" && (
        <div
          className={`p-4 text-center text-4xl font-bold ${
            isConnected ? "text-[#23AF4B]" : "text-[#CFA088]"
          }`}
        >
          {isConnected ? "Connected" : "Disconnected"}
        </div>
      )}
    </>
  );
};

export default IsConnected;
