// pages/index.js
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { styles } from "@/utils/constants";
import {
  convertToRaw,
  CompositeDecorator,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import { FaLink } from "react-icons/fa";
import { FaUnlink } from "react-icons/fa";

const Link = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link}>
      {props.children}
    </a>
  );
};

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

const LinkEditorExample = () => {
  const [editorState, setEditorState] = React.useState(() => {
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);
    return EditorState.createEmpty(decorator);
  });
  const [showURLInput, setShowURLInput] = React.useState(false);
  const [urlValue, setUrlValue] = React.useState("");

  const editorRef = React.useRef<HTMLInputElement | null>(null);

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const onChange = (newEditorState: any) => {
    setEditorState(newEditorState);
  };

  const promptForLink = (e: any) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffset = selection.getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = "";
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      setUrlValue(url);
      setShowURLInput(true);
      setTimeout(() => focusEditor(), 0);
    }
  };

  const confirmLink = (e: any) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
    setShowURLInput(false);
    setUrlValue("");
    setTimeout(() => focusEditor(), 0);
  };

  const onLinkInputKeyDown = (e: any) => {
    if (e.key === "Enter") {
      confirmLink(e);
    }
  };

  const removeLink = (e: any) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  const hasLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffset = selection.getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      return !!linkKey;
    }
    return false;
  };

  return (
    <div style={styles.root}>
      <div style={{ marginBottom: 10 }}>
        Select some text, then use the buttons to add or remove links on the
        selected text.
      </div>
      <div style={styles.buttons} className="flex gap-2">
        <button
          onMouseDown={promptForLink}
          className={`toolbar-button border hover:bg-gray-200 border-solid rounded-md p-2 ${
            hasLink() ? "active" : ""
          }`}
        >
          <FaLink />
        </button>
        <button
          onMouseDown={removeLink}
          className={`toolbar-button border hover:bg-gray-200 border-solid rounded-md p-2 ${
            hasLink() ? "active" : ""
          }`}
        >
          <FaUnlink />
        </button>
      </div>
      {showURLInput && (
        <div className="bg-gray-50 absolute top-5 w-[35%] left-[50%] -translate-x-[50%] p-6 rounded-lg shadow-lg  ">
          <div className="flex flex-col gap-5">
            <h2 className="text-lg font-bold">Add Link</h2>
            <input
              onChange={(e) => setUrlValue(e.target.value)}
              ref={(ref) => (editorRef.current = ref)}
              style={styles.urlInput}
              type="text"
              placeholder="Enter your link..."
              className="min-w-16 border border-solid rounded-md"
              value={urlValue}
              onKeyDown={onLinkInputKeyDown}
            />
            <div className="flex justify-end">
              <button
                className="py-2 px-6 font-bold rounded-md border duration-300 hover:bg-slate-100 border-solid border-black"
                onMouseDown={confirmLink}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        style={styles.editor}
        // onClick={focusEditor}
        // onKeyDown={onLinkInputKeyDown}
        role="textbox"
        tabIndex={0}
      >
        <Editor
          editorState={editorState}
          onChange={onChange}
          placeholder="Enter some text..."
        />
      </div>
    </div>
  );
};

const AppLink = () => {
  // useEffect(() => {
  //   ReactDOM.render(<LinkEditorExample />, document.getElementById("target"));
  // }, []);

  return <div id="target" />;
};

export default AppLink;
