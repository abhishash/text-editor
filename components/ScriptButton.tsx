import { EditorState, RichUtils } from "draft-js";
import { FC } from "react";
interface SuperScriptStyleButtonProps {
  editorState: EditorState;
  onChange: (newEditorState: EditorState) => void;
  style: string;
  icon: React.ReactNode;
}
const ScriptButton: FC<SuperScriptStyleButtonProps> = ({
  editorState,
  onChange,
  icon,
  style,
}) => {
  const onToggleSuperscript = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, style));
  };
  const isActive = () => {
    const currentStyle = editorState?.getCurrentInlineStyle();
    return currentStyle?.has(style);
  };
  return (
    <button
      onClick={onToggleSuperscript}
      className={`toolbar-button border border-solid rounded-md p-2 ${
        isActive() ? "active" : ""
      }`}
    >
      {icon}
    </button>
  );
};

export default ScriptButton;
