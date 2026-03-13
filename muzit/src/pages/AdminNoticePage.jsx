// pages/AdminNoticePage.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "../components/EditorToolbar";

function AdminNoticePage({ announcements, addAnnouncement, updateAnnouncement }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const existing = isEdit
    ? announcements.find((a) => a.id === Number(id))
    : null;

  const [title, setTitle] = useState(existing?.title ?? "");

  const editor = useEditor({
    extensions: [StarterKit],
    content: existing?.content ?? "",
  });

  const handleSave = () => {
    const t = title.trim();
    if (!t) return alert("제목을 입력해주세요.");
    const content = editor?.getHTML() ?? "";
    if (isEdit) {
      updateAnnouncement(Number(id), { title: t, content });
    } else {
      addAnnouncement({ title: t, content });
    }
    navigate("/admin");
  };

  return (
    <div className='write-page'>
      <h2 className='page-title'>{isEdit ? "공지사항 수정" : "공지사항 작성"}</h2>

      <div className='write-form'>
        <input
          className='write-title'
          placeholder='공지사항 제목을 입력하세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className='editor-wrapper'>
          {editor && <EditorToolbar editor={editor} />}
          <EditorContent editor={editor} className='editor-content' />
        </div>

        <div className='write-footer'>
          <div className='write-actions'>
            <button className='btn-secondary' onClick={() => navigate("/admin")}>
              취소
            </button>
            <button className='btn-black write-submit' onClick={handleSave}>
              {isEdit ? "수정 완료" : "공지 등록"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNoticePage;
