// components/WordCount.jsx
function WordCount({ editor }) {
  if (!editor) return null;
  const text = editor.getText();
  const charCount = text.length;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return (
    <div className='word-count'>
      {charCount}자 · {wordCount}단어
    </div>
  );
}

export default WordCount;
