import React from 'react';
import "../assets/css/main.css"

const CustomConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div 
    sx={{
        "&>div": {
          background: "#0000009e",
          width: "400px",
          height: "85vh",
          
        },
      }}>
      <div className=" rotated">
        <p >{message}</p>
        <button onClick={onConfirm}>OK</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CustomConfirmDialog;
