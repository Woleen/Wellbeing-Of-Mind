import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Articles.css";
import DOMPurify from 'dompurify';
import { useSpeechSynthesis } from 'react-speech-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

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
        <div className="container mt-4 blur-background">
          <div className="row">
            <div className="col-lg-8 p-4 rounded">
              <h2 className="text-white">{article.title}</h2>
              <button onClick={handleSpeak} className="btn btn-dark btn-sm">
                {speaking ? <FontAwesomeIcon icon={faPlay} beat /> : <FontAwesomeIcon icon={faPlay} />}
              </button>
              <div className="text-justify" style={{ textAlign: "justify" }}>
                <div className="text-white" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }} />
              </div>
              <p className="mt-3 text-right">
                Author: {article.author}
              </p>
            </div>
            <div className="col-lg-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Header 1</th>
                    <th>Header 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Row 1, Cell 1</td>
                    <td>Row 1, Cell 2</td>
                  </tr>
                  <tr>
                    <td>Row 2, Cell 1</td>
                    <td>Row 2, Cell 2</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
