// pages/WritePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import EditorToolbar from "../components/EditorToolbar";
import WordCount from "../components/WordCount";
import "../styles/editor.css";

function WritePage({ addPost }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    coverUrl: "",
    tags: "",
    isPublic: true,
    allowComments: true,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false }),
      Placeholder.configure({ placeholder: "자유롭게 이야기를 작성해 주세요..." }),
    ],
    content: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = editor ? editor.getHTML() : "";
    const textContent = editor ? editor.getText() : "";

    if (!formData.title.trim() || !textContent.trim()) {
      return alert("제목과 작품 내용을 모두 입력해주세요.");
    }

    addPost({ ...formData, content });
    navigate("/");
  };

  return (
    <div className='write-page'>
      <form className='write-form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='제목을 입력하세요'
          value={formData.title}
          onChange={handleChange}
          required
          className='write-title'
        />
        <input
          type='text'
          name='coverUrl'
          placeholder='표지 이미지 주소(URL) 추가 — 선택 사항'
          value={formData.coverUrl}
          onChange={handleChange}
          className='write-cover-url'
        />

        <div className='editor-wrapper'>
          <EditorToolbar editor={editor} />
          <EditorContent editor={editor} className='editor-content' />
          <WordCount editor={editor} />
        </div>

        <div className='write-footer'>
          <input
            type='text'
            name='tags'
            placeholder='태그 입력 (예: 일상, 에세이, 판타지)'
            value={formData.tags}
            onChange={handleChange}
            className='write-tags'
          />
          <div className='write-options'>
            <label className='option-label'>
              <input type='checkbox' name='isPublic' checked={formData.isPublic} onChange={handleChange} />
              전체 공개
            </label>
            <label className='option-label'>
              <input type='checkbox' name='allowComments' checked={formData.allowComments} onChange={handleChange} />
              댓글 허용
            </label>
          </div>
          <div className='write-actions'>
            <button type='button' className='btn-secondary' onClick={() => navigate(-1)}>취소</button>
            <button type='submit' className='btn-black write-submit'>작품 발행하기</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default WritePage;
