// components/EditorToolbar.jsx
import { useState } from "react";

const ToolbarButton = ({ onClick, isActive, title, children }) => (
  <button
    type='button'
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    title={title}
    className={`toolbar-btn ${isActive ? "is-active" : ""}`}
  >
    {children}
  </button>
);

const Divider = () => <div className='toolbar-divider' />;

function EditorToolbar({ editor }) {
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);

  if (!editor) return null;

  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
    }
    setLinkUrl("");
    setShowLinkInput(false);
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
    setImageUrl("");
    setShowImageInput(false);
  };

  return (
    <div className='editor-toolbar'>
      <div className='toolbar-row'>
        {/* 텍스트 스타일 */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} title='굵게 (Ctrl+B)'>
          <b>B</b>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} title='기울임 (Ctrl+I)'>
          <i>I</i>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} title='밑줄 (Ctrl+U)'>
          <u>U</u>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")} title='취소선'>
          <s>S</s>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive("code")} title='인라인 코드'>
          {"</>"}
        </ToolbarButton>

        <Divider />

        {/* 제목 */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })} title='제목 1'>H1</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })} title='제목 2'>H2</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive("heading", { level: 3 })} title='제목 3'>H3</ToolbarButton>

        <Divider />

        {/* 목록 */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} title='순서 없는 목록'>≡</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} title='순서 있는 목록'>1.</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} title='인용구'>❝</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("codeBlock")} title='코드 블록'>{"{ }"}</ToolbarButton>

        <Divider />

        {/* 정렬 */}
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} isActive={editor.isActive({ textAlign: "left" })} title='왼쪽 정렬'>◀</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} isActive={editor.isActive({ textAlign: "center" })} title='가운데 정렬'>◆</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} isActive={editor.isActive({ textAlign: "right" })} title='오른쪽 정렬'>▶</ToolbarButton>

        <Divider />

        {/* 링크 & 이미지 */}
        <ToolbarButton onClick={() => setShowLinkInput((v) => !v)} isActive={editor.isActive("link")} title='링크 삽입'>🔗</ToolbarButton>
        <ToolbarButton onClick={() => setShowImageInput((v) => !v)} title='이미지 삽입'>🖼</ToolbarButton>

        <Divider />

        {/* 구분선 & 되돌리기 */}
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title='구분선'>—</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title='실행취소 (Ctrl+Z)'>↩</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title='다시실행 (Ctrl+Y)'>↪</ToolbarButton>
      </div>

      {showLinkInput && (
        <div className='toolbar-input-row'>
          <input type='url' placeholder='링크 URL 입력' value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setLink()} autoFocus />
          <button type='button' onClick={setLink}>확인</button>
          <button type='button' onClick={() => setShowLinkInput(false)}>취소</button>
        </div>
      )}

      {showImageInput && (
        <div className='toolbar-input-row'>
          <input type='url' placeholder='이미지 URL 입력' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addImage()} autoFocus />
          <button type='button' onClick={addImage}>삽입</button>
          <button type='button' onClick={() => setShowImageInput(false)}>취소</button>
        </div>
      )}
    </div>
  );
}

export default EditorToolbar;
