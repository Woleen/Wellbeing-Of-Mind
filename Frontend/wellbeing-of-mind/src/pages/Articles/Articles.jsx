import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../CustomPagination";
import Loader from "../../utils/Loader";
import SearchBar from "../../utils/SearchBar";
import ArticleCard from "./ArticleCard";
import "./Articles.css";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const url = searchQuery
          ? `https://localhost:5226/api/articles/search?q=${searchQuery}&page=${currentPage}&pageSize=${pageSize}`
          : `https://localhost:5226/api/articles?page=${currentPage}&pageSize=${pageSize}`;
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, pageSize, searchQuery]);

  const handleCardClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mb-3 mt-3">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      </div>
      {loading && <Loader loading={loading} />}
      {!loading && (
        <div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4 justify-content-center">
            {articles.map((article) => (
              <div
                key={article.id}
                className="col d-flex justify-content-center"
                onClick={() => handleCardClick(article.id)}
                style={{ cursor: "pointer" }}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center py-4">
            <Pagination currentPage={currentPage} handlePageChange={handlePageChange} articles={articles} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
