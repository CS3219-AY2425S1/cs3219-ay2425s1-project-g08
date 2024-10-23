import React from "react";

interface StandardBigButtonProps {
  onClick?: () => void; // Function to handle click event
  label: string; // Text label for the button
  color: "black" | "yellow" | "green"; // Define allowed colors
  className?: string; // Optional additional classes for styling
}

const StandardBigButton: React.FC<StandardBigButtonProps> = ({
  onClick,
  label,
  color,
  className,
}) => {
  // Define button styles based on the selected color
  const colorClasses = {
    black: "bg-black text-white hover:bg-gray-700",
    yellow: "bg-yellow text-black hover:bg-yellow-600",
    green: "bg-green text-off-white hover:bg-emerald-700",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-[25px] p-3 text-xl ${colorClasses[color]} ${className}`}
    >
      {label}
    </button>
  );
};

export default StandardBigButton;
