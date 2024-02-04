import { EditorState, RichUtils } from "draft-js";
import { FC } from "react";
interface TextStyleButtonProps {
  editorState: EditorState;
  onChange: (newEditorState: EditorState) => void;
  style: string;
  icon: React.ReactNode;
}

const TextStyleButton: FC<TextStyleButtonProps> = ({
  editorState,
  onChange,
  style,
  icon,
}) => {
  const onToggle = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const isActive = () => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  };
  return (
    <button
      onClick={onToggle}
      className={`toolbar-button border border-solid rounded-md p-2 ${
        isActive() ? "active" : ""
      }`}
    >
      {icon}
    </button>
  );
};

export default TextStyleButton;
