import "./styles.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ColorPicker from "./ColorPicker";
import {
 Bold,
 Italic,
 List,
 ListOrdered,
 Redo,
 Strikethrough,
 Undo,
} from "lucide-react";
import { useState } from "react";

export const MenuBar = () => {
 const { editor } = useCurrentEditor();

 if (!editor) {
  return null;
 }

 return (
  <div className="control-group border-b bg-white ">
   <div className="button-group flex gap-4 items-center flex-row-reverse px-12">
    <ColorPicker editor={editor} />

    <button
     onClick={() => editor.chain().focus().toggleBold().run()}
     //  disabled={!editor.can().chain().focus().toggleBold().run()}
     className={editor.isActive("bold") ? "is-active" : ""}
    >
     <Bold />
    </button>
    <button
     onClick={() => editor.chain().focus().toggleItalic().run()}
     disabled={!editor.can().chain().focus().toggleItalic().run()}
     className={editor.isActive("italic") ? "bg-blue-600" : ""}
    >
     <Italic />
    </button>
    <button
     onClick={() => editor.chain().focus().toggleStrike().run()}
     disabled={!editor.can().chain().focus().toggleStrike().run()}
     className={editor.isActive("strike") ? "is-active" : ""}
    >
     <Strikethrough />
    </button>

    <button
     onClick={() => editor.chain().focus().undo().run()}
     disabled={!editor.can().chain().focus().undo().run()}
    >
     <Undo />
    </button>
    <button
     onClick={() => editor.chain().focus().redo().run()}
     disabled={!editor.can().chain().focus().redo().run()}
    >
     <Redo />
    </button>

    <div className="relative inline-block ">
     <select
      onChange={(e) => {
       const level = Number(e.target.value);
       editor.chain().focus().toggleHeading({ level }).run();
      }}
      className="block w-full py-2 pl-3 pr-10 text-sm  text-gray-900 bg-white  shadow-sm "
     >
      <option
       value="1"
       className={
        editor.isActive("heading", { level: 1 })
         ? "bg-indigo-100 text-indigo-900"
         : ""
       }
      >
       H1
      </option>
      <option
       value="2"
       className={
        editor.isActive("heading", { level: 2 })
         ? "bg-indigo-100 text-indigo-900"
         : ""
       }
      >
       H2
      </option>
      <option
       value="3"
       className={
        editor.isActive("heading", { level: 3 })
         ? "bg-indigo-100 text-indigo-900"
         : ""
       }
      >
       H3
      </option>
      <option
       value="4"
       className={
        editor.isActive("heading", { level: 4 })
         ? "bg-indigo-100 text-indigo-900"
         : ""
       }
      >
       H4
      </option>
      <option
       value="5"
       className={
        editor.isActive("heading", { level: 5 })
         ? "bg-indigo-100 text-indigo-900"
         : ""
       }
      >
       H5
      </option>
      <option
       value="6"
       className={
        editor.isActive("heading", { level: 6 })
         ? "bg-indigo-100 text-indigo-900"
         : ""
       }
      >
       H6
      </option>
     </select>
    </div>

    {/* <button
     onClick={() => editor.chain().focus().toggleBulletList().run()}
     className={editor.isActive("bulletList") ? "is-active" : ""}
    >
     <List />
    </button>
    <button
     onClick={() => editor.chain().focus().toggleOrderedList().run()}
     className={editor.isActive("orderedList") ? "is-active" : ""}
    >
     <ListOrdered />
    </button> */}
   </div>
  </div>
 );
};

const extensions = [
 Color.configure({ types: [TextStyle.name, ListItem.name] }),
 TextStyle.configure({ types: [ListItem.name] }),
 StarterKit.configure({
  bulletList: {
   keepMarks: true,
   keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
  },
  orderedList: {
   keepMarks: true,
   keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
  },
 }),
];

export default function TextEditor() {
 const [content, setContent] = useState("test");
 return (
  <EditorProvider
   slotBefore={<MenuBar />}
   extensions={extensions}
   content={"content"}
   //  slotAfter={<NewQuestion content={content} setContent={setContent} />}
  ></EditorProvider>
 );
}
