import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Articles.css";
import DOMPurify from 'dompurify';
import { useSpeechSynthesis } from 'react-speech-kit';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const { speak, speaking, cancel } = useSpeechSynthesis();

  useEffect(() => {
    fetch(`https://localhost:5226/api/articles/${articleId}`)
      .then((response) => response.json())
      .then((data) => setArticle(data))
      .catch((error) => console.error("Error fetching article:", error))
      .finally(() => setLoading(false));
  }, [articleId]);

const handleSpeak = () => {
  speaking ? cancel() : article.content ? speak({ text: article.content }) : console.error("Article content is empty");
};

  return (
    <div>
    {loading && (
      <div className="loader" style={{ opacity: loading ? 1 : 0, transition: "opacity 0.5s" }}></div>
    )}
    {!loading && (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <h2>{article.title}</h2>
          <button onClick={handleSpeak}>
              {speaking ? 'Pause' : 'Read Aloud'}
            </button>
          <div className="content" style={{ textAlign: "justify" }}>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }} />
          </div>
          <p className="mt-3" style={{ textAlign: "right" }}>
            Author: {article.author}
          </p>
        </div>
      </div>
    </div>)}
    </div>
  );
};

export default ArticleDetail;
