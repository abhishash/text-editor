import React from "react";
import ReactDOM from "react-dom";
import "draft-js/dist/Draft.css";
import dynamic from "next/dynamic";
import { TbLoader2 } from "react-icons/tb";
const MyDraftEditor = dynamic(() => import("@/components/MyEditor"), {
  ssr: false,
  loading: () => (
    <div className="">
      <TbLoader2 />
    </div>
  ),
});

function Editor() {
  return (
    <div className="w-[80%] mx-auto">
      <h1>Next.js Editor Using Draft.js</h1>
      <MyDraftEditor />
    </div>
  );
}

export default Editor;
