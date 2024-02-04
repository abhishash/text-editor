import React, { FC, useEffect, useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import ReactDOM from "react-dom";
import "draft-js/dist/Draft.css";
interface TextStyleButtonProps {
  editorState: EditorState;
  onChange: (newEditorState: EditorState) => void;
  activeHeading: string;
}
const HeadingEditor: FC<TextStyleButtonProps> = ({
  editorState,
  onChange,
  activeHeading,
}) => {
  const toggleHeading = (headingType: any) => {
    const newEditorState = RichUtils.toggleBlockType(editorState, headingType);
    onChange(newEditorState);
  };
  return (
    <div>
      <select
        value={activeHeading || "unstyled"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[10rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => toggleHeading(e.target.value)}
      >
        <option value="header-one">Heading 1</option>
        <option value="header-two">Heading 2</option>
        <option value="header-three">heading 3</option>
        <option value="header-four">Heading 4</option>
        <option value="header-five">Heading 5</option>
        <option value="header-six">Heading 6</option>
        <option value="unstyled">Normal Text</option>
      </select>
    </div>
  );
};
export default HeadingEditor;
