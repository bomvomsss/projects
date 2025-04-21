'use client'

import React, { useRef } from 'react';
import '../styles/editor.css';

interface EditorProps {
  title: string;
}

function Editor({ title }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  function setStyle(style: 'bold' | 'italic' | 'underline' | 'strikeThrough') {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');

    switch (style) {
      case 'bold':
        span.style.fontWeight = 'bold';
        break;
      case 'italic':
        span.style.fontStyle = 'italic';
        break;
      case 'underline':
        span.style.textDecoration = 'underline';
        break;
      case 'strikeThrough':
        span.style.textDecoration = 'line-through';
        break;
    }

    span.appendChild(range.extractContents());
    range.insertNode(span);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    newRange.collapse(false);
    selection.addRange(newRange);

    focusEditor();
  }

  function focusEditor() {
    editorRef.current?.focus({ preventScroll: true });
  }

  return (
    <div>
      {title}
      <div className="container">
        <div className="editor-btn">
          <button onClick={() => setStyle('bold')}><b>B</b></button>
          <button onClick={() => setStyle('italic')}><i>I</i></button>
          <button onClick={() => setStyle('underline')}><u>U</u></button>
          <button onClick={() => setStyle('strikeThrough')}><s>S</s></button>
          <button id="btn-image">IMG</button>
        </div>
        <div
          id="editor"
          ref={editorRef}
          contentEditable={true}
        ></div>
      </div>
    </div>
  );
}

export default Editor;