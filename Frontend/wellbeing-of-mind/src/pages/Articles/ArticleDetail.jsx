import React, { useEffect, useState } from "react";
import StickyHeadTable from '../../user_specific/FavoriteArticlesTable';
import AddToFavoritesButton from "../../user_specific/AddToFavorites";
import ScrollToTopButton from "../../utils/ToTopButton";
import TextToSpeechButton from "../../utils/TextToSpeechButton";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Articles.css";
import DOMPurify from 'dompurify';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://localhost:5226/api/articles/${articleId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.nameid);
    }
  }, [articleId]);

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
              <div style={{ textAlign: "justify" }}>
                <div className="text-white" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }} />
              </div>
              <p className="mt-3 text-right">
                Author: {article.author}
              </p>
            </div>
            <div className="col-lg-4">
              <div className="flex-column">
                <div className="mb-3">
                  <TextToSpeechButton content={article.content} />
                </div>
                <div className="mb-3">
                  {userId && <AddToFavoritesButton userId={userId} articleId={articleId} articleTitle={article.title} />}
                </div>
                <div className="mb-4">
                  {userId &&<StickyHeadTable />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
                <ScrollToTopButton />
    </div>
  );
};

export default ArticleDetail;
