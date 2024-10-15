import React, { useState } from "react";

export const MbtiBox = ({ data, selected, onSelect }) => {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(data.id)}
      >
        <img src={selected ? data.deep_purple : data.light_purple} alt="MBTI Icon" />
      </button>
    </li>
  );
};
