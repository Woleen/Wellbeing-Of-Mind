import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons"; // Import faPlus for the "Create New" button
import ArticleCard from "./ArticleCard";
import { useNavigate } from "react-router-dom";
import Pagination from "../CustomPagination";
import "./Articles.css";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = searchQuery
          ? `https://localhost:5226/api/articles/search?q=${searchQuery}&page=${currentPage}&pageSize=${pageSize}`
          : `https://localhost:5226/api/articles?page=${currentPage}&pageSize=${pageSize}`;

        const response = await fetch(url);
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    setLoading(true);
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleCreateNew = () => {
    navigate('/newarticle');
  };

  return (
    <div className="container mt-5">
      <h2>Article List</h2>
      <div className="row justify-content-center mb-3 mt-3">
        <div className="col-md-4 py-2">
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search Articles"
              onChange={(e) => {
                setTimeout(() => {
                  setSearchQuery(e.target.value);
                }, 1000);
              }}
            />
            <button className="search-icon" type="button" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loader" style={{ opacity: loading ? 1 : 0, transition: "opacity 0.5s" }}></div>
      )}
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
          <div className="d-flex justify-content-center py-4">
            <button className="btn btn-primary" onClick={handleCreateNew}>
              <FontAwesomeIcon icon={faPlus} /> Create New
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
