// pages/PostEditorPage.jsx
// 작성(/write)과 수정(/edit/:id)을 하나의 컴포넌트로 처리
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const DRAFT_KEY = "muzit_draft";

function loadDraft() {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) ?? null; }
  catch { return null; }
}

function PostEditorPage({ posts, addPost, updatePost }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const post = isEdit ? posts.find((p) => p.id === parseInt(id)) : null;

  // 수정 모드에서 존재하지 않는 게시물
  if (isEdit && !post) {
    return (
      <div className='not-found'>
        <h2>게시글을 찾을 수 없습니다.</h2>
        <button onClick={() => navigate("/")} className='btn-black'>메인으로 돌아가기</button>
      </div>
    );
  }

  const draft = !isEdit ? loadDraft() : null;

  const [formData, setFormData] = useState({
    title:         post?.title         ?? draft?.title         ?? "",
    coverUrl:      post?.coverUrl      ?? draft?.coverUrl      ?? "",
    tags:          post?.tags          ?? draft?.tags          ?? "",
    isPublic:      post?.isPublic      ?? draft?.isPublic      ?? true,
    allowComments: post?.allowComments ?? draft?.allowComments ?? true,
    isAdult:       post?.isAdult       ?? draft?.isAdult       ?? false,
    isPaid:        post?.isPaid        ?? draft?.isPaid        ?? false,
  });
  const [draftSaved, setDraftSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [useSchedule, setUseSchedule] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false }),
      Placeholder.configure({ placeholder: "자유롭게 이야기를 작성해 주세요..." }),
    ],
    content: post?.content ?? draft?.content ?? "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const textContent = editor ? editor.getText() : "";
    if (!formData.title.trim() || !textContent.trim()) {
      return alert("제목과 작품 내용을 모두 입력해주세요.");
    }
    if (isEdit) {
      setShowDateModal(true);
    } else {
      const content = editor ? editor.getHTML() : "";
      if (useSchedule) {
        if (!scheduledAt) return alert("예약 날짜와 시간을 입력해주세요.");
        if (new Date(scheduledAt) <= new Date()) return alert("예약 시간은 현재보다 미래여야 합니다.");
        addPost({ ...formData, content, isScheduled: true, scheduledAt });
      } else {
        addPost({ ...formData, content });
      }
      localStorage.removeItem(DRAFT_KEY);
      navigate("/");
    }
  };

  const confirmUpdate = (keepDate) => {
    const content = editor ? editor.getHTML() : "";
    updatePost(post.id, {
      ...formData,
      content,
      date: keepDate ? post.date : new Date().toISOString(),
    });
    setShowDateModal(false);
    navigate(`/post/${post.id}`);
  };

  const handleSaveDraft = () => {
    const content = editor ? editor.getHTML() : "";
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...formData, content }));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const previewContent = editor ? editor.getHTML() : "";

  return (
    <div className='write-page'>

      {/* 미리보기 모달 */}
      {showPreview && (
        <div className='preview-overlay' onClick={() => setShowPreview(false)}>
          <div className='preview-modal' onClick={(e) => e.stopPropagation()}>
            <div className='preview-modal-header'>
              <span>미리보기</span>
              <button className='preview-close' onClick={() => setShowPreview(false)}>✕</button>
            </div>
            <div className='preview-modal-body'>
              {formData.coverUrl && <img src={formData.coverUrl} alt='표지' className='preview-cover' />}
              <h1 className='preview-title'>{formData.title || "제목 없음"}</h1>
              <div className='post-content-body' dangerouslySetInnerHTML={{ __html: previewContent || "<p>내용 없음</p>" }} />
              {formData.tags && (
                <div className='post-tags'>
                  {formData.tags.split(",").map((t) => t.trim()).filter(Boolean).map((t, i) => (
                    <span key={i} className='tag-badge'># {t}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 날짜 선택 모달 (수정 모드) */}
      {showDateModal && (
        <div className='preview-overlay' onClick={() => setShowDateModal(false)}>
          <div className='date-modal' onClick={(e) => e.stopPropagation()}>
            <h3 className='date-modal-title'>업로드 시간 설정</h3>
            <p className='date-modal-desc'>수정된 작품을 어떤 날짜로 발행할까요?</p>
            <div className='date-modal-actions'>
              <button className='btn-secondary' onClick={() => confirmUpdate(true)}>기존 업로드 시간 유지</button>
              <button className='btn-black' onClick={() => confirmUpdate(false)}>현재 시간으로 새로 발행</button>
            </div>
          </div>
        </div>
      )}

      <form className='write-form' onSubmit={handleSubmit}>
        <input
          type='text' name='title' required className='write-title'
          placeholder='제목을 입력하세요'
          value={formData.title} onChange={handleChange}
        />
        <input
          type='text' name='coverUrl' className='write-cover-url'
          placeholder='표지 이미지 주소(URL) 추가 — 선택 사항'
          value={formData.coverUrl} onChange={handleChange}
        />

        <div className='editor-wrapper'>
          <EditorToolbar editor={editor} />
          <EditorContent editor={editor} className='editor-content' />
          <WordCount editor={editor} />
        </div>

        <div className='write-footer'>
          <input
            type='text' name='tags' className='write-tags'
            placeholder='태그 입력 (쉼표로 구분합니다.)'
            value={formData.tags} onChange={handleChange}
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
            <label className='option-label'>
              <input type='checkbox' name='isAdult' checked={formData.isAdult} onChange={handleChange} />
              성인 작품
            </label>
            <label className='option-label'>
              <input type='checkbox' name='isPaid' checked={formData.isPaid} onChange={handleChange} />
              유료 결제
            </label>
          </div>

          {/* 업로드 예약 — 작성 모드에서만 */}
          {!isEdit && (
            <div className='write-schedule'>
              <label className='option-label'>
                <input
                  type='checkbox' checked={useSchedule}
                  onChange={(e) => { setUseSchedule(e.target.checked); if (!e.target.checked) setScheduledAt(""); }}
                />
                업로드 예약
              </label>
              {useSchedule && (
                <input
                  type='datetime-local' className='schedule-input'
                  value={scheduledAt}
                  min={new Date(Date.now() + 60000).toISOString().slice(0, 16)}
                  onChange={(e) => setScheduledAt(e.target.value)}
                />
              )}
            </div>
          )}

          <div className='write-actions'>
            <button type='button' className='btn-secondary' onClick={() => setShowPreview(true)}>
              미리보기
            </button>
            {!isEdit ? (
              <button type='button' className='btn-secondary' onClick={handleSaveDraft}>
                {draftSaved ? "저장됨 ✓" : "임시저장"}
              </button>
            ) : (
              <button type='button' className='btn-secondary' onClick={() => navigate(-1)}>
                취소
              </button>
            )}
            <button type='submit' className='btn-black write-submit'>
              {isEdit ? "재발행하기" : useSchedule ? "예약 발행" : "작품 발행하기"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostEditorPage;
