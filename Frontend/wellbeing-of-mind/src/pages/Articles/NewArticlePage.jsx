import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleEditor from './ArticleEditor';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [editorHtml, setEditorHtml] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const articleData = {
      title: title,
      content: editorHtml,
      type: 'psychology',
    };

    setIsLoading(true);
    setSubmissionError('');

    try {
      const response = await fetch('https://localhost:5226/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        console.log('Article created successfully!');
        setTitle('');
        setEditorHtml('');
        navigate('/articles');
      } else {
        throw new Error(`Failed to create article: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setSubmissionError('Failed to submit article. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="card-title py-3">Write your article</h2>
          {submissionError && <div className="alert alert-danger">{submissionError}</div>}
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <ArticleEditor value={editorHtml} onChange={handleEditorChange} /> {/* Pass editorHtml instead of content */}
              <button type="submit" className="btn btn-dark mt-3" disabled={isLoading} style={{ width: '30%' }}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
