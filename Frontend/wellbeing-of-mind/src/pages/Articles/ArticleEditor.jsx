import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ArticleEditor = ({ onChange }) => {
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = (html) => {
    setEditorHtml(html);
    onChange(html);
  };

  return (
    <ReactQuill
      theme="snow"
      value={editorHtml}
      onChange={handleChange}
      style = {{ backgroundColor: 'white'  ,height: '56vh'}}
    />
  );
};

export default ArticleEditor;