import React, { FC, useRef, useState } from "react";
import {
  CompositeDecorator,
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import {
  FaItalic,
  FaUnderline,
  FaBold,
  FaStrikethrough,
  FaSubscript,
  FaSuperscript,
} from "react-icons/fa";
import TextStyleButton from "./TextStyleButton";
import HeadingEditor from "./HeadingEditor";
import LinkEditor from "./LinkEditor";
import { styles } from "@/utils/constants";
import ScriptButton from "./ScriptButton";


const findLinkEntities = (
  contentBlock: any,
  callback: any,
  contentState: any
) => {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};
const Link = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link}>
      {props.children}
    </a>
  );
};
const MyDraftEditor: FC = () => {
  const [editorState, setEditorState] = React.useState(() => {
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);
    return EditorState.createEmpty(decorator);
  });
  const [activeHeading, setActiveHeading] = useState("unstyled");
  const onChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    updateActiveHeading(newEditorState);
  };

  const handleKeyCommand = (command: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };
  //***For Heaing text */
  const updateActiveHeading = (editorState: any) => {
    const selection = editorState.getSelection();
    const block = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey());
    const blockType = block.getType();
    setActiveHeading(blockType);
  };
  /**SuperSciprt and Subsciprt text Funxtion handler */
  const customStyleMap = {
    SUPERSCRIPT: {
      verticalAlign: "super",
      fontSize: "smaller",
    },
    SUBSCRIPT: {
      verticalAlign: "sub",
      fontSize: "smaller",
    },
  };
  
 
  return (
    <div className="min-w-[40%]">
      <div className="flex gap-3 py-2">
     
        <HeadingEditor
          onChange={onChange}
          editorState={editorState}
          activeHeading={activeHeading}
        />
        <TextStyleButton
          editorState={editorState}
          onChange={onChange}
          style="BOLD"
          icon={<FaBold />}
        />
        <TextStyleButton
          editorState={editorState}
          onChange={onChange}
          style="ITALIC"
          icon={<FaItalic />}
        />
        <TextStyleButton
          editorState={editorState}
          onChange={onChange}
          style="UNDERLINE"
          icon={<FaUnderline />}
        />
        <TextStyleButton
          editorState={editorState}
          onChange={onChange}
          style="STRIKETHROUGH"
          icon={<FaStrikethrough />}
        />
        <LinkEditor
          editorState={editorState}
          onChange={onChange}
          setEditorState={setEditorState}
        />
        <ScriptButton
          editorState={editorState}
          onChange={onChange}
          icon={<FaSuperscript />}
          style="SUPERSCRIPT"
        />
        <ScriptButton
          editorState={editorState}
          onChange={onChange}
          icon={<FaSubscript />}
          style="SUBSCRIPT"
        />
      </div>
      <div
        tabIndex={0}
        role="textbox"
        className="border border-solid border-[#ccc] cursor-text min-h-24 p-2"
      >
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          customStyleMap={customStyleMap}
          placeholder="Enter some text..."
        />
      </div>
    </div>
  );
};

export default MyDraftEditor;
