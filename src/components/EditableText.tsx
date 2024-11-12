import { ChangeEvent, useCallback, useState } from "react";
import { Input } from "./ui/input";

interface EditableTextProps {
  text: string;
  onTextChange: (newText: string) => void;
  className?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  text,
  onTextChange,
  className,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableText, setEditableText] = useState<string>(text);

  const handleTextClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditableText(e.target.value);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsEditing(false);
    onTextChange(editableText);
  }, [editableText, onTextChange]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.currentTarget.blur();
      }
    },
    []
  );

  return (
    <>
      {isEditing || editableText === "" ? (
        <Input
          className={className}
          type="text"
          value={editableText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <span className={className} onClick={handleTextClick}>
          {text}
        </span>
      )}
    </>
  );
};
export default EditableText;
