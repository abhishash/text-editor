import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

const HeadingBox = ( {handleChange}:{handleChange:Function}) => {
    
  return (
    <div className="">
      <select
      onChange={(e)=>handleChange(e.target.value)}
        id="countries"
        className="bg-white border-r border-gray-300 text-gray-900 text-md focus:ring-blue-500 focus:border-blue-500 block w-[7rem] p-1.5 dark:focus:border-blue-500"
      >
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
        <option value="h4">H4</option>
        <option value="h5">H5</option>
        <option value="h6">H6</option>
      </select>
    </div>
  );
};
export default HeadingBox;
