import React, { useEffect, useState } from "react";
import StickyHeadTable from '../../user_utils/favoriteArticlesTable';
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
              <div className="text-justify" style={{ textAlign: "justify" }}>
                <div className="text-white" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }} />
              </div>
              <p className="mt-3 text-right">
                Author: {article.author}
              </p>
            </div>
            <div className="col-lg-4">
              <button onClick={handleSpeak} className="btn btn-dark btn-lg mt-4" style={{ width: '8vw', height: '6vh' }}>
                {speaking ? <FontAwesomeIcon icon={faPlay} beat /> : <FontAwesomeIcon icon={faPlay} />}
              </button>
              < StickyHeadTable className='mt-4'/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
