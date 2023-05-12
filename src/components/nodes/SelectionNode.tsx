import React, { memo, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setDepartment } from "../../../helpers";
import { Handle, Position } from "reactflow";

function SelectionNode() {
  const [value, setValue] = useState("CS");

  const department = useSelector(
    (state: { department: string }) => state.department
  );
  const dispatch = useDispatch();

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newDepartment = event.target.value;
    dispatch(setDepartment(newDepartment));
  };

  return (
    <div className="flex flex-col w-full h-full p-10 transition duration-300 ease-in-out bg-white border border-black rounded-lg shadow-md hover:shadow-xl ">
      <div className="flex flex-row w-full text-lg">
        <span>
          Select your <span className="font-bold">department</span>
        </span>
      </div>
      <select
        className="p-4 mt-4 text-sm text-black transition duration-300 ease-in-out border border-black rounded-md outline-none appearance-none nodrag nopan hover:scale-105 hover:shadow-md shadow-stone-100 hover:border-stone-300"
        onChange={(e) => {
          setValue(e.target.value);
          handleDepartmentChange(e);
        }}
        value={value}
      >
        {[
          "AA",
          "AM",
          "AR",
          "AS",
          "AY",
          "BC",
          "BI",
          "CA",
          "CH",
          "CI",
          "CL",
          "CN",
          "CS",
          "EA",
          "EC",
          "ED",
          "EN",
          "ES",
          "FR",
          "GE",
          "GK",
          "GM",
          "GO",
          "GS",
          "HI",
          "IS",
          "IT",
          "JA",
          "JS",
          "LA",
          "LT",
          "MA",
          "ML",
          "MU",
          "PH",
          "PL",
          "PS",
          "RE",
          "RU",
          "SC",
          "SO",
          "SP",
          "ST",
          "TD",
          "WD",
          "WG",
        ].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(SelectionNode);
