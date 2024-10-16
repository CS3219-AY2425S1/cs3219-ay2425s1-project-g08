import React from "react";

interface InputBoxLabelProps {
    labelString: string
}

const InputBoxLabel: React.FC<InputBoxLabelProps> = ({
  labelString
}) => {
    return (
        <div className="flex">
            <label className="font-semibold text-gray-600">{labelString}</label>
        </div>
    );
};

export default InputBoxLabel;