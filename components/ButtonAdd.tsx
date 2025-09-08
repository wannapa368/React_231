import React from "react";

interface ButtonAddProps {
  onAdd: () => void;
}

const ButtonAdd: React.FC<ButtonAddProps> = ({ onAdd }) => {
  return (
    <button
      onClick={onAdd}>
      เพิ่มตัวเลข
    </button>
  );
};

export default ButtonAdd;