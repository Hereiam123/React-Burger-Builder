import React from "react";

const BuildControl = (props) => {
  return (
    <div>
      <div>{props.label}</div>
      <button>Minus</button>
      <button>Plus</button>
    </div>
  );
};

export default BuildControl;
