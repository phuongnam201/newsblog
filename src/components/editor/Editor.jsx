import { EditorContent, useEditor } from "@tiptap/react";
import "highlight.js/styles/atom-one-dark.css";
import MenuBar from "./MenuBar";
import { extensions } from "../../constants/tiptapExtensions";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

const Editor = ({ onDataChange, content, editable, className, className2 }) => {
  const editor = useEditor({
    editable,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      extensions,
    ],
    editorProps: {
      attributes: {
        class:
          "mx-2 prose-sm sm:prose-base max-w-none my-2 focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf]",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onDataChange(json);
    },
    content: content,
  });

  return (
    <div className={`w-full relative ${className}`}>
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className={className2} />
    </div>
  );
};

export default Editor;

//!prose !dark:prose-invert
